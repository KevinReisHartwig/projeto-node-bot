"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const token = process.env.TOKEN;
if (!token) {
    console.error("A variável de ambiente TOKEN não está definida.");
    process.exit(1);
}
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    if (match) {
        const resp = match[1];
        bot.sendMessage(chatId, resp);
    }
});
bot.on('photo', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = msg.chat.id;
    if (!msg.photo || msg.photo.length === 0) {
        console.error("Nenhuma foto encontrada na mensagem.");
        return;
    }
    const photoId = msg.photo[msg.photo.length - 1].file_id;
    try {
        const photo = yield bot.downloadFile(photoId, "./src/imgs");
        bot.sendPhoto(chatId, photo, { caption: "Foto enviada" });
    }
    catch (error) {
        console.error("Erro ao baixar ou enviar a foto:", error);
    }
}));
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'msg recebida com sucesso');
});
