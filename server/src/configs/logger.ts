import pino from "pino";
import { env } from "./env";

const isTest = env.NODE_ENV === "test";
const isDev = env.NODE_ENV === "development";

export const logger = pino({
  level: isTest ? "warn" : isDev ? "debug" : "info",
  base: {
    service: "task-tracker-server",
    env: env.NODE_ENV,
  },
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "password",
      "*.password",
      "token",
      "*.token",
    ],
    censor: "[REDACTED]",
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  ...(isDev && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss.l",
        ignore: "pid,hostname,service,env",
        singleLine: false,
        errorLikeObjectKeys: ["err", "error"],
        customColors: "info:cyan,warn:yellow,error:red,fatal:red",
        hideObject: false,
      },
    },
  }),
});

export default logger;
