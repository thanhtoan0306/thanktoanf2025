import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters

load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN")
PUBLIC_BASE_URL = os.getenv("PUBLIC_BASE_URL", "").rstrip("/")
WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET")

if not BOT_TOKEN:
    raise RuntimeError("Missing BOT_TOKEN")
if not WEBHOOK_SECRET:
    raise RuntimeError("Missing WEBHOOK_SECRET")

app = FastAPI()
tg_app = Application.builder().token(BOT_TOKEN).build()


async def start_cmd(update: Update, context):
    if update.message:
        await update.message.reply_text("Hello! (webhook bot)")


async def ping_cmd(update: Update, context):
    if update.message:
        await update.message.reply_text("pong")


async def echo_text(update: Update, context):
    if update.message and update.message.text is not None:
        await update.message.reply_text(f"You said: {update.message.text}")


tg_app.add_handler(CommandHandler("start", start_cmd))
tg_app.add_handler(CommandHandler("ping", ping_cmd))
tg_app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo_text))


@app.on_event("startup")
async def _startup():
    await tg_app.initialize()


@app.on_event("shutdown")
async def _shutdown():
    await tg_app.shutdown()


@app.get("/health")
async def health():
    return {"ok": True}


@app.post(f"/webhook/{WEBHOOK_SECRET}")
async def webhook(request: Request):
    data = await request.json()
    update = Update.de_json(data, tg_app.bot)
    await tg_app.process_update(update)
    return {"ok": True}


@app.post("/set-webhook")
async def set_webhook():
    if not PUBLIC_BASE_URL.startswith("https://"):
        raise HTTPException(status_code=400, detail="PUBLIC_BASE_URL must be https:// when using Telegram webhook")
    url = f"{PUBLIC_BASE_URL}/webhook/{WEBHOOK_SECRET}"
    ok = await tg_app.bot.set_webhook(url=url, drop_pending_updates=True)
    return {"ok": bool(ok), "url": url}

