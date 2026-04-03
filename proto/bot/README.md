## proto/bot

Thư mục này có **2 bot Telegram mẫu** theo 2 hướng đơn giản:

- **Polling (Node.js + Telegraf)**: chạy local, không cần domain/https.
- **Polling (Go)**: chạy local, tối giản.
- **Polling (Rust / Teloxide)**: chạy local, tối giản.
- **Webhook (Python + FastAPI)**: có HTTP endpoint để deploy (Render/Fly/VPS).

### 1) Bot A — Polling (Node.js)

Vào thư mục:

```bash
cd proto/bot/polling-node
```

Tạo env:

```bash
cp .env.example .env
```

Sửa `.env` và điền token:

- `BOT_TOKEN`: lấy từ @BotFather

Chạy:

```bash
npm install
npm run dev
```

### 2) Bot B — Webhook (Python)

Vào thư mục:

```bash
cd proto/bot/webhook-python
```

Tạo venv + cài deps:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Tạo env:

```bash
cp .env.example .env
```

Chạy local:

```bash
uvicorn app:app --reload --port 8000
```

Lưu ý: webhook cần URL public (https). Khi deploy xong, gọi endpoint:

- `POST /set-webhook`

để app tự đăng ký webhook với Telegram.

### 3) Bot C — Polling (Go)

```bash
cd proto/bot/polling-go
cp .env.example .env
# export BOT_TOKEN=...
go mod tidy
go run .
```

### 4) Bot D — Polling (Rust)

```bash
cd proto/bot/polling-rust
cp .env.example .env
# export BOT_TOKEN=...
cargo run
```

