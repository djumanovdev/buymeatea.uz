from telegram import ForceReply, Update, Bot
from telegram.ext import CommandHandler, CallbackContext, MessageHandler, filters, Dispatcher

bot = Bot('8290898864:AAGxlT42mnd7CjLn4C7HZ8H38O-PQ1D9ZYs')
dispatcher = Dispatcher(bot, None, workers=0)


def start(update: Update, context: CallbackContext) -> None:
    """Send a message when the command /start is issued."""
    user = update.effective_user
    update.message.reply_html(
        rf"Hi {user.mention_html()}!",
        reply_markup=ForceReply(selective=True),
    )


def help_command(update: Update, context: CallbackContext) -> None:
    """Send a message when the command /help is issued."""
    update.message.reply_text("Help!")


def echo(update: Update, context: CallbackContext) -> None:
    """Echo the user message."""
    update.message.reply_text(update.message.text)


def handle_update(update: dict) -> None:
    """Start the bot."""

    # on different commands - answer in Telegram
    dispatcher.add_handler(CommandHandler("start", start))
    dispatcher.add_handler(CommandHandler("help", help_command))

    # on non command i.e message - echo the message on Telegram
    dispatcher.add_handler(MessageHandler(filters.Filters.text & ~filters.Filters.command, echo))

    update = Update.de_json(update, bot)
    dispatcher.process_update(update)
