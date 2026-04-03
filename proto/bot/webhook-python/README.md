## Webhook bot (Python + FastAPI + python-telegram-bot)

### Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

### Run local

```bash
uvicorn app:app --reload --port 8000
```

### Deploy + set webhook

- Deploy app để có `PUBLIC_BASE_URL` dạng `https://...`
- Cập nhật `.env` (trên platform deploy)
- Gọi endpoint để đăng ký webhook:

```bash
curl -X POST "$PUBLIC_BASE_URL/set-webhook"
```

### Endpoints

- `GET /health`
- `POST /webhook/{WEBHOOK_SECRET}`
- `POST /set-webhook`

