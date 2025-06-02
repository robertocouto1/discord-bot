const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js');

class Bot {
    constructor(name, age, birthday, token) {
        this.name = name;
        this.age = age;
        this.birthday = birthday;
        this.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
        // Carrega o token de um arquivo .env se não for fornecido no construtor
        require('dotenv').config();
        this.token = token;
        if (!this.token) {
            this.token = process.env.BOT_TOKEN;
        }

        // Configura o bot para responder a mensagens
    
        this.client.on('messageCreate', msg => {
            if (msg.mentions.has(this.client.user) && !msg.author.bot) {
                msg.reply("Jonis é um bot, nasceu em 02/06/2022. Ele é um bot de exemplo que pode buscar dados de uma API e enviá-los no canal.");
            }
        });
    }

    async fetchAndSend(channelId, apiUrl) {
        try {
            const response = await axios.get(apiUrl);
            const data = response.data;
            const channel = await this.client.channels.fetch(channelId);
            await channel.send(`Informação da API: ${JSON.stringify(data)}`);
        } catch (error) {
            console.error('Erro ao buscar ou enviar dados:', error);
        }
    }

    start() {
        this.client.once('ready', () => {
            console.log(`Bot ${this.name} está online!`);
        });
        this.client.login(this.token);
    }
}

// Exemplo de uso:
// Certifique-se de definir o token do bot aqui ou no arquivo .env como BOT_TOKEN=seu_token_aqui
const botToken = process.env.BOT_TOKEN; // ou substitua por uma string de token válida

if (!botToken) {
    throw new Error('O token do bot não foi fornecido. Defina BOT_TOKEN no arquivo .env ou forneça como argumento.');
}

const bot = new Bot('Jonis', 0.03, '2025-06-02', botToken);
bot.start();

// Exemplo de comando para testar a busca na API:
bot.client.on('messageCreate', msg => {
    if (msg.content === '!api') {
        bot.fetchAndSend(msg.channel.id, 'https://api.exemplo.com/dados');
    }
});