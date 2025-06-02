export enum NodeEnvOptions {
	PRODUCTION = 0,
	DEVELOPMENT = 1,
	TEST = 2,
}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			[key: string]: string | undefined;
			NODE_ENV: keyof typeof NodeEnvOptions;
			DISCORD_BOT_TOKEN: string;
		}
	}
}
