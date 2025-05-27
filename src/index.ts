import Logger from "@abstractions/Logger";

const logger = Logger.createLogger();

logger.test(process.env.NODE_ENV);
