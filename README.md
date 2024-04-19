# Projeto Telegram-Bot

<p>Uma grande empresa atacadista contatou a equipe de desenvolvedores da turma de Dev Web II para o desenvolvimento de um BOT de atendimento. O BOT, inicialmente, deve funcionar no aplicativo TELEGRAM. Ao receber uma mensagem, o BOT deve avaliar o horário em que a mensagem foi enviada. Se a mensagem foi enviada em horário comercial (09:00 às 18:00), o BOT deve informar para o usuário o link: https://faesa.br.</p>

<p>Se a mensagem foi enviada fora do horário comercial, o BOT deve informar o horário de funcionamento da empresa (09:00 às 18:00) e obter o e-mail do interessado, para que a empresa possa entrar em contato. Este e-mail deve ser armazenado em um banco de dados SQLITE, usando o ORM Prisma.</p>

<p>Você deverá escrever o projeto e enviar o link PÚBLICO de repositório no Github no Blog da disciplina, para avaliação. Instruções quaisquer devem ser relatadas no arquivo README.md do projeto.</p>

# Links usados

- https://www.npmjs.com/package/dotenv
- https://www.npmjs.com/package/node-telegram-bot-api?activeTab=readme

# Ferramentas utilizadas
- NodeJS
- API TelegramBot
- TypeScript
- JavaScript
- SQL Lite com Prisma
- DotEnv
- Nodemon

# Comandos

- npm install
- npm install --global typescript
- criar a pasta .env e colocar o token como está no exemplo do .env.exemplo
- npm run prisma
- npm run predev
- npm run dev
