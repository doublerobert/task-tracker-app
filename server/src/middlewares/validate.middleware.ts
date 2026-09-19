import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { z } from "zod";
import { formatZodErrors } from "../utils/format-zod-errors.js";

export interface RequestValidationSchema<
  TBody extends z.ZodType = z.ZodType,
  TQuery extends z.ZodType = z.ZodType,
  TParams extends z.ZodType = z.ZodType,
> {
  body?: TBody;
  query?: TQuery;
  params?: TParams;
}

type Location = "body" | "query" | "params";

type ValidationResult = {
  location: Location;
  result: Awaited<ReturnType<z.ZodType["safeParseAsync"]>>;
};

export function validate<
  TBody extends z.ZodType = z.ZodType,
  TQuery extends z.ZodType = z.ZodType,
  TParams extends z.ZodType = z.ZodType,
>(
  schemas: RequestValidationSchema<TBody, TQuery, TParams>,
): RequestHandler<z.infer<TParams>, unknown, z.infer<TBody>, z.infer<TQuery>> {
  return async (req, _res, next) => {
    const validations: Promise<ValidationResult>[] = [];

    if (schemas.body) {
      validations.push(
        schemas.body.safeParseAsync(req.body).then((result) => ({
          location: "body" as const,
          result,
        })),
      );
    }

    if (schemas.query) {
      validations.push(
        schemas.query.safeParseAsync(req.query).then((result) => ({
          location: "query" as const,
          result,
        })),
      );
    }

    if (schemas.params) {
      validations.push(
        schemas.params.safeParseAsync(req.params).then((result) => ({
          location: "params" as const,
          result,
        })),
      );
    }

    if (validations.length === 0) {
      return next();
    }

    const results = await Promise.all(validations);
    const issues: Array<{
      location: Location;
      details: ReturnType<typeof formatZodErrors>;
    }> = [];

    for (const { location, result } of results) {
      if (!result.success) {
        issues.push({
          location,
          details: formatZodErrors(result.error),
        });
      } else {
        if (location === "body") {
          req.body = result.data;
        } else if (location === "query") {
          req.query = result.data as typeof req.query;
        } else if (location === "params") {
          req.params = result.data as typeof req.params;
        }
      }
    }

    if (issues.length > 0) {
      return next(
        createHttpError(400, "Validation error", {
          issues,
        }),
      );
    }

    next();
  };
}
