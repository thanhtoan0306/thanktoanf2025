## Polling bot (Go)

### Setup

```bash
cp .env.example .env
```

### Run

```bash
cd proto/bot/polling-go
export BOT_TOKEN="$(cat .env | sed -n 's/^BOT_TOKEN=//p')" # hoặc tự export thủ công
go mod tidy
go run .
```

### Commands

- `/start`
- `/ping`

