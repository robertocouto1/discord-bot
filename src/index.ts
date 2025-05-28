import Logger from "@abstractions/Logger";
import { SystemError } from "./errors/SystemError";

const logger = Logger.createLogger();

logger.warn("warn");
logger.error("error");
logger.critical("caio");
logger.fatal("fatal");

throw new SystemError("Name Test", "Description Test", true);
