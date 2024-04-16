import TelegramBot from "node-telegram-bot-api";
import { PrismaClient } from '@prisma/client';
import { config } from "dotenv";

config();

const prisma = new PrismaClient();
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

let emailFoiSolicitado = false;
let idPrimeiraMensagem: number | undefined;

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const horaAtual = new Date().getHours();

  if (!emailFoiSolicitado) {
    if (horaAtual >= 9 && horaAtual < 18) {
      bot.sendMessage(chatId, 'Olá! Aqui está o link: https://faesa.br');
    } else {
      bot.sendMessage(chatId, 'Desculpe, estamos fora do horário comercial, que é das 09:00 às 18:00. Por favor, forneça seu e-mail para que possamos entrar em contato.');
      emailFoiSolicitado = true;
      idPrimeiraMensagem = msg.message_id;
    }
  }
});

bot.on('text', async (msg) => {
  const chatId = msg.chat.id;
  const horaAtual = new Date().getHours();
  const email = msg.text;

  if (emailFoiSolicitado && msg.message_id !== idPrimeiraMensagem && horaAtual < 9 && horaAtual > 18) {
    const verificandoEmail = /\S+@\S+\.\S+/;
    if (typeof email === 'string' && verificandoEmail.test(email)) {
      try {
        await prisma.email.create({
          data: {
            email: email
          }
        });
        bot.sendMessage(chatId, 'Obrigado! Seu e-mail foi registrado para contato futuro.');
        emailFoiSolicitado = false;
        idPrimeiraMensagem = undefined;
      } catch (error) {
        console.error("Erro ao armazenar o e-mail:", error);
        bot.sendMessage(chatId, 'Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.');
      }
    } else {
      bot.sendMessage(chatId, 'O texto fornecido não parece ser um endereço de e-mail válido. Por favor, forneça um endereço de e-mail válido.');
    }
  }
});
