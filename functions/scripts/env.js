"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenvx_1 = require("@dotenvx/dotenvx");
const env_core_1 = require("@t3-oss/env-core");
const zod_1 = require("zod");
(0, dotenvx_1.config)({ path: ".env.vault", quiet: true });
exports.env = (0, env_core_1.createEnv)({
    server: {
        SEED_ADMIN_EMAIL: zod_1.z.email(),
        SEED_ADMIN_PASSWORD: zod_1.z.string().min(6),
        SEED_ADMIN_NAME: zod_1.z.string().min(5),
    },
    runtimeEnv: process.env,
});
//# sourceMappingURL=env.js.map