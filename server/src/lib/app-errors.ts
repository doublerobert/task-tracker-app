import createError from "http-errors";

export const { Unauthorized, BadRequest, NotFound, Forbidden } = createError;

interface AppErrorOptions {
  status: number;
  message: string;
  details?: Array<{ field: string; messages: string[] }> | Record<string, unknown>;
}

export class AppError extends Error {
  status: number;
  details?: unknown;

  constructor({ status, message, details }: AppErrorOptions) {
    super(message);
    this.name = "AppError";

    const httpError = createError(status, message, { details });

    this.status = httpError.statusCode;
    this.details = details;

    // Fix prototype chain for custom errors in TS
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
