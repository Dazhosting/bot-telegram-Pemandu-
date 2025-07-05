require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;

// Ganti polling: true menjadi false jika ingin pakai webhook
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();

  if (text === '/start') {
    return bot.sendMessage(chatId, `👋 Halo, ${msg.from.first_name}! Selamat datang di base Telegram Bot.`);
  }

  if (text === '/help') {
    return bot.sendMessage(chatId, `📚 Command:\n/start - Mulai bot\n/help - Bantuan`);
  }

  return bot.sendMessage(chatId, `⚠️ Command tidak dikenali. Gunakan /help`);
});
