## Polling bot (Rust)

### Setup

```bash
cp .env.example .env
export BOT_TOKEN="$(cat .env | sed -n 's/^BOT_TOKEN=//p')" # hoặc tự export thủ công
```

### Run

```bash
cd proto/bot/polling-rust
cargo run
```

### Commands

- `/start`
- `/ping`
- `/help`

