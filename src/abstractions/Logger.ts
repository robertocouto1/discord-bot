import pino, {
	type LoggerOptions,
	type Logger as PinoLogger,
	type TransportTargetOptions,
	type Level,
} from "pino";

type DefaultPinoLevels = Level;

enum AdditionalLoggerLevels {
	critical = "critical",
}

type CustomLoggerLevels =
	| DefaultPinoLevels
	| keyof typeof AdditionalLoggerLevels;

const customLoggerLevels: Record<CustomLoggerLevels, number> = {
	trace: 10,
	debug: 20,
	info: 30,
	warn: 40,
	error: 50,
	fatal: 60,
	critical: 70,
};

export default class Logger {
	private loggerInstance: PinoLogger<CustomLoggerLevels>;
	private loggerConfig: LoggerOptions<CustomLoggerLevels>;

	private constructor() {
		this.loggerConfig = {};
		this.setupLogLevels();
		this.setupLogTransports();

		this.loggerInstance = pino<CustomLoggerLevels>(this.loggerConfig);
	}

	public static createLogger(): PinoLogger<CustomLoggerLevels> {
		const logger = new Logger();
		return logger.loggerInstance;
	}

	private setupLogLevels(): void {
		this.loggerConfig.customLevels = customLoggerLevels;
		this.loggerConfig.useOnlyCustomLevels = true;
	}

	private setupLogTransports(): void {
		const loggerPrettyTarget: TransportTargetOptions = {
			target: "pino-pretty",
			options: {
				destination: 1,
				customLevels: customLoggerLevels,
				useOnlyCustomProps: true,
				colorize: true,
			},
		};

		this.loggerConfig.transport = {
			targets: [loggerPrettyTarget],
		};
	}
}
