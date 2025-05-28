export enum ErrorCodes {
	ERR_SYS = "ERR_SYS",
	ERR_INV = "ERR_INV",
}

export default abstract class BaseError extends Error {
	public readonly code: ErrorCodes;
	public readonly name: string;
	public readonly description: string;
	public readonly details: BaseError[];
	public readonly isOperational: boolean;

	constructor(
		code: keyof typeof ErrorCodes,
		name: string,
		description: string,
		isOperational: boolean,
	) {
		super(description);
		this.code = ErrorCodes[code];
		this.name = name;
		this.description = description;
		this.isOperational = isOperational;
		this.details = [];

		Object.setPrototypeOf(this, new.target.prototype);
		Error.captureStackTrace(this);
	}

	public addDetails(details: BaseError[]) {
		this.details.push(...details);
	}
}
