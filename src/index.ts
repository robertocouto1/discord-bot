// Importa as dependências necessárias
import { Client, GatewayIntentBits, VoiceChannel } from "discord.js";
import type { Message } from "discord.js";
import { SystemError } from "./errors/SystemError";

class Bot {
	public name: string;
	public age: number;
	public birthday: Date;
	public token: string;
	public client: Client;

	constructor(
		name: string,
		age: number,
		birthday: Date,
		token: string | undefined,
	) {
		this.name = name;
		this.age = age;
		this.birthday = birthday;
		this.client = new Client({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.MessageContent,
			],
		});
		if (!token) {
			throw new SystemError("BOT TOKEN ERROR", "Token do bot inválido", true);
		}
		this.token = token;
	}

	start() {
		this.client.once("ready", () => {
			console.log(`Bot ${this.name} está online!`);
		});

		// Listener para comandos
		this.client.on("messageCreate", (message: Message) => {
			// Ignora mensagens de bots
			if (message.author.bot) return;

			// Responde se for mencionado: @Jonis
			if (
				this.client.user &&
				message.mentions.has(this.client.user) &&
				!message.author.bot
			) {
				message.reply(`Olá, ${message.author}! Me Chamou? Como posso ajudar?`);
			}

			// Verifica se a mensagem começa com o prefixo "!"
			const prefix = "j!";
			if (!message.content.startsWith(prefix)) return;

			// Extrai o comando e os argumentos
			const args = message.content.slice(prefix.length).trim().split(/ +/);
			const command = args.shift()?.toLowerCase();

			// Comandos disponíveis
			switch (command) {
				case "ping":
					message.reply("Pong!");
					break;
				case "play": {
					// Verifica se o usuário forneceu um link
					const link = args[0];
					if (link?.startsWith("https://")) {
						message.reply(`m!play ${link}`);
					} else {
						message.reply(
							"Por favor, forneça um link válido. Exemplo: `j!play https://youtube.com`",
						);
					}
					break;
				}
				case "repo":
					message.reply(
						"link para o repositório: https://github.com/robertocouto1/discord-bot",
					);
					break;
				case "help":
					message.reply(
						"Comandos disponíveis: `j!ping`, `j!play`, `j!repo`, `j!help`.",
					);
					break;
				default:
					message.reply(
						"Comando não reconhecido. Use `j!help` para ver os comandos disponíveis.",
					);
					break;
			}
		});

		this.client.login(this.token);
	}
}

// Start
const botToken = process.env.TOKEN;

if (!botToken) {
	throw new SystemError(
		"NO TOKEN",
		"O token do bot não foi fornecido. Defina BOT_TOKEN no arquivo .env ou forneça como argumento.",
		true,
	);
}

const bot = new Bot("Jonis", 0.03, new Date("2025-06-02"), botToken);
bot.start();
