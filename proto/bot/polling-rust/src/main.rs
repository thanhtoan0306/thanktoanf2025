use teloxide::{prelude::*, utils::command::BotCommands};

#[derive(BotCommands, Clone)]
#[command(rename_rule = "lowercase", description = "Commands:")]
enum Command {
    #[command(description = "start the bot")]
    Start,
    #[command(description = "health check")]
    Ping,
    #[command(description = "display this text")]
    Help,
}

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();
    pretty_env_logger::init();
    log::info!("Starting Rust polling bot...");

    let bot = Bot::from_env().auto_send();

    teloxide::repl(bot, |bot: AutoSend<Bot>, msg: Message| async move {
        if let Some(text) = msg.text() {
            if let Ok(cmd) = Command::parse(text, "telegram_bot_polling_rust") {
                match cmd {
                    Command::Start => {
                        bot.send_message(msg.chat.id, "Hello! (polling rust bot)").await?;
                        return respond(());
                    }
                    Command::Ping => {
                        bot.send_message(msg.chat.id, "pong").await?;
                        return respond(());
                    }
                    Command::Help => {
                        bot.send_message(msg.chat.id, Command::descriptions().to_string())
                            .await?;
                        return respond(());
                    }
                }
            }

            bot.send_message(msg.chat.id, format!("You said: {text}"))
                .await?;
        }

        respond(())
    })
    .await;
}

