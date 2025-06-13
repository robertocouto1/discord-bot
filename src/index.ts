// Importa as dependências necessárias
import { Client, GatewayIntentBits } from "discord.js";
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
