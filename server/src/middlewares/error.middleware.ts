import type { Request, Response, NextFunction } from "express";
import { HttpError, isHttpError } from "http-errors";
import { failure, type ApiError } from "../utils/api-response";
import { STATUS_TEXT } from "../utils/status-text";
import logger from "../configs/logger";

const isCorsError = (err: Error): boolean =>
  err.message.startsWith("Origin ") &&
  err.message.endsWith("not allowed by CORS");

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const log = (req as any).log ?? logger;

  const msg = `${req.method} ${req.originalUrl}`;

  if (isCorsError(err)) {
    log.warn(
      {
        Status: `${409} ${STATUS_TEXT[409]}`,
        Message: err.message,
      },
      msg,
    );
    return res.status(403).json(
      failure({
        message: "Origin not allowed by CORS",
      }),
    );
  }

  if (isHttpError(err)) {
    const httpErr = err as HttpError;
    const apiError: ApiError = {
      message: httpErr.message,
      details: httpErr.details,
    };
    log.warn(
      {
        Status: `${httpErr.status} ${httpErr.name}`,
        Message: httpErr.message,
      },
      msg,
    );
    return res.status(httpErr.status).json(failure(apiError));
  }

  log.error(
    {
      Status: `${500} ${STATUS_TEXT[500]}`,
      Message: err.message,
      Stack: err.stack,
      Cause: (err as any).cause,
    },
    msg,
  );
  return res.status(500).json(
    failure({
      message: "Internal Server Error",
    }),
  );
};
