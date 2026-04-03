import 'dotenv/config';
import { Telegraf } from 'telegraf';

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error('Missing BOT_TOKEN in environment');
  process.exit(1);
}

const bot = new Telegraf(token);

bot.start((ctx) => ctx.reply('Hello! (polling bot)'));
bot.command('ping', (ctx) => ctx.reply('pong'));
bot.on('text', async (ctx) => {
  const text = ctx.message?.text ?? '';
  await ctx.reply(`You said: ${text}`);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

