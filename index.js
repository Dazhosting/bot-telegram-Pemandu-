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
  const chatId = msg.chat.id;

  if (data === 'apiproject') {
    const opts = {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Ai Generator Puisi', callback_data: 'project_1' }],
        ]
      }
    };

    return bot.sendMessage(chatId, `📂 *List Project Vercel Team*\nPilih project untuk ambil API-nya:`, {
      parse_mode: 'Markdown',
      ...opts
    });
  }

  // Callback dari tombol dalam apiproject
  if (data === 'project_1') {
    return bot.sendMessage(chatId, `
✅ Ini URL API Untuk mengambil Data Api Generator Puisi` + "```JavaScript\n" + `
      const data = {
      topic: formData.get('topic'),
      type: formData.get('type'),
      lang: formData.get('lang'),
      length: formData.get('length'),
    };

    try {
      const response = await fetch('/api/generate-poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      ` + "```", {
      parse_mode: 'Markdown'
    });
  }

  if (data === 'project_b') {
    return bot.sendMessage(chatId, `✅ Ini API untuk *Project B*:\n\`https://vercel-api.example.com/project-b\``, {
      parse_mode: 'Markdown'
    });
  }

  // fallback
  bot.sendMessage(chatId, '⚠️ Perintah tidak dikenali.');
});
