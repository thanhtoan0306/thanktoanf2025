package main

import (
	"log"
	"os"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)

func main() {
	token := os.Getenv("BOT_TOKEN")
	if token == "" {
		log.Fatal("Missing BOT_TOKEN in environment")
	}

	bot, err := tgbotapi.NewBotAPI(token)
	if err != nil {
		log.Fatal(err)
	}

	u := tgbotapi.NewUpdate(0)
	u.Timeout = 30

	updates := bot.GetUpdatesChan(u)
	log.Printf("Bot started as @%s", bot.Self.UserName)

	for update := range updates {
		if update.Message == nil {
			continue
		}

		text := update.Message.Text
		reply := ""

		switch text {
		case "/start":
			reply = "Hello! (polling go bot)"
		case "/ping":
			reply = "pong"
		default:
			if text != "" {
				reply = "You said: " + text
			} else {
				reply = "Send me a text message."
			}
		}

		msg := tgbotapi.NewMessage(update.Message.Chat.ID, reply)
		if _, err := bot.Send(msg); err != nil {
			log.Printf("send error: %v", err)
		}
	}
}
