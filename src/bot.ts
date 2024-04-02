import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";

config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  if(match){
    const resp = match[1];
    bot.sendMessage(chatId, resp);
  }
});

bot.on('photo', async (msg) => {
  const chatId = msg.chat.id;
  if (!msg.photo || msg.photo.length === 0) {
    console.error("Nenhuma foto encontrada na mensagem.");
    return;
  }
  
  const photoId = msg.photo[msg.photo.length - 1].file_id;
  
  try {
    const photo = await bot.downloadFile(photoId, "./src/imgs");
    bot.sendPhoto(chatId, photo, { caption: "Foto enviada" });
  } catch (error) {
    console.error("Erro ao baixar ou enviar a foto:", error);
  }
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'msg recebida com sucesso');
});