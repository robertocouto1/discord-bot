import Logger from "@abstractions/Logger";
import { SystemError } from "./errors/SystemError";

const logger = Logger.createLogger();

logger.warn("warn");
logger.error("error");
logger.critical(process.env.DISCORD_BOT_TOKEN);
logger.fatal("fatal");

throw new SystemError("Name Test", "Description Test", true);
