import app from "./app";
import { env } from "./configs/env";
import { logger } from "./configs/logger";
import { database } from "./configs/drizzle";

const port = env.PORT;

const start = async () => {
  try {
    // await prisma.$queryRaw`SELECT 1`;
    await database.execute("select 1");
    logger.info("database connected");
  } catch (err) {
    logger.fatal({ err }, "database connection failed");
    process.exit(1);
  }

  const server = app.listen(port, () => {
    logger.info({ port }, `server listening on http://localhost:${port}`);
  });

  const shutdown = async (signal: string) => {
    logger.info({ signal }, "shutting down");
    server.close(async (err) => {
      if (err) {
        logger.error({ err }, "server close error");
        process.exit(1);
      }
      // await prisma.$disconnect();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
};

start();
