require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;

// Ganti polling: true menjadi false jika ingin pakai webhook
const bot = new TelegramBot(token, { polling: true });

require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;

  const opts = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Api Web Project', callback_data: 'apiproject' }],
        [{ text: 'Saluran WhatsApp', url: 'https://whatsapp.com/channel/0029Vb6P2e1E50UZYaX4wI0W' }]
      ]
    }
  };

  bot.sendMessage(chatId, `👋 Halo *${firstName}*! Selamat datang di Vercel Team Bot.`, {
    parse_mode: 'Markdown',
    ...opts
  });
});

// Handle button press (callback)
bot.on('callback_query', (callbackQuery) => {
  const data = callbackQuery.data;
  const msg = callbackQuery.message;

  if (data === 'apiproject') {
    bot.sendMessage(msg.chat.id, `📋 Ini adalah menu utama.`);
  }

  // Kamu bisa tambah case callback lainnya di sini
});
