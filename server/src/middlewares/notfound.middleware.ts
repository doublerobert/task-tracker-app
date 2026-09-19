import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

export const notFoundHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  next(createHttpError(404, "Endpoint not found"));
};
