import pino, {
	type LoggerOptions,
	type Logger as PinoLogger,
	type TransportTargetOptions,
} from "pino";

enum LoggerLevelsOptions {
	fatal = 0,
	error = 1,
	warn = 2,
	info = 3,
	debug = 4,
	trace = 5,
	test = 6,
}

type LoggerLevels = keyof typeof LoggerLevelsOptions;

export default class Logger {
	private loggerInstance: PinoLogger<LoggerLevels>;
	private loggerConfig: LoggerOptions<LoggerLevels>;

	private constructor() {
		this.loggerConfig = {};
		this.setupLogTransports();

		this.loggerInstance = pino<LoggerLevels>(this.loggerConfig);
	}

	public static createLogger(): PinoLogger<LoggerLevels> {
		const logger = new Logger();
		return logger.loggerInstance;
	}

	private setupLogTransports(): void {
		const loggerPrettyTarget: TransportTargetOptions = {
			target: "pino-pretty",
			options: {
				destination: 1,
			},
		};

		this.loggerConfig.transport = {
			targets: [loggerPrettyTarget],
		};
	}
}
