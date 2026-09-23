import express from "express";
import { logger } from "./configs/logger";
import { requestLogger } from "./middlewares/request-logger.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import { notFoundHandler } from "./middlewares/notfound.middleware";
import { corsMiddleware } from "./configs/cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";

const app = express();

app.set("trust proxy", 1);

app.use(cookieParser());
app.use(corsMiddleware);
app.use(express.json());
app.use(requestLogger);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: "ok",
      service: "task-tracker-server",
    },
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

logger.info("app initialized");
export default app;
