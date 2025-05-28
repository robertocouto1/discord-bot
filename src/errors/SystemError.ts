import BaseError from "@abstractions/BaseError";

export class SystemError extends BaseError {
	constructor(name: string, description: string, isOperational: boolean) {
		super("ERR_SYS", name, description, isOperational);
	}
}
