import TelegramBot from "node-telegram-bot-api";
import { PrismaClient } from '@prisma/client';
import { config } from "dotenv";

config();

const prisma = new PrismaClient();
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  if(match){
    const resp = match[1];
    bot.sendMessage(chatId, resp);
  }
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const currentTime = new Date().getHours();

  if (currentTime >= 9 && currentTime < 18) {
    bot.sendMessage(chatId, 'Olá! Aqui está o link: https://faesa.br');
  } else {
    bot.sendMessage(chatId, 'Desculpe, estamos fora do horário comercial, O horário comercial é das 09:00 às 18:00. Por favor, forneça seu e-mail para que possamos entrar em contato.');
  }
});

bot.on('text', async (msg) => {
  const chatId = msg.chat.id;
  const currentTime = new Date().getHours();
  const email = msg.text;

  if (currentTime < 9 || currentTime >= 18) {
    if (typeof email === 'string') {
      try {
        await prisma.email.create({
          data: {
            email: email
          }
        });
        bot.sendMessage(chatId, 'Obrigado! Seu e-mail foi registrado para contato futuro.');
      } catch (error) {
        console.error("Erro ao armazenar o e-mail:", error);
        bot.sendMessage(chatId, 'Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.');
      }
    } else {
      console.error("E-mail recebido é undefined ou não é uma string.");
      bot.sendMessage(chatId, 'Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.');
    }
  }
});
