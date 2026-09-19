import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "node:crypto";
import logger from "../configs/logger";
import { STATUS_TEXT } from "../utils/status-text";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const reqId = req.headers["x-request-id"]?.toString() ?? randomUUID();
  res.setHeader("x-request-id", reqId);

  const child = logger.child({ reqId });
  (req as any).log = child;

  const start = Date.now();

  res.on("finish", () => {
    const durationMs = Date.now() - start;
    const status = res.statusCode;
    const statusText = STATUS_TEXT[status] ?? "";
    const msg = `${req.method} ${req.originalUrl}`;
    const fields = {
      Status: `${status} ${statusText}`.trim(),
      Duration: `${durationMs} ms`,
      IP: req.ip ?? "-",
      Client: req.headers["user-agent"] ?? "-",
    };
    if (status >= 500) child.error(fields, msg);
    else if (status >= 400) child.warn(fields, msg);
    else child.info(fields, msg);
  });

  next();
};
