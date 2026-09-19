"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
const admin_key_json_1 = __importDefault(require("../../.secrets/admin-key.json"));
const env_1 = require("./env");
(0, app_1.initializeApp)({
    credential: (0, app_1.cert)(admin_key_json_1.default),
});
async function bootstrapAdmin() {
    const userRecord = await (0, auth_1.getAuth)().createUser({
        email: env_1.env.SEED_ADMIN_EMAIL,
        password: env_1.env.SEED_ADMIN_PASSWORD,
        displayName: env_1.env.SEED_ADMIN_NAME,
    });
    await (0, auth_1.getAuth)().setCustomUserClaims(userRecord.uid, { admin: true });
    console.log("Bootstrapped admin:", userRecord.uid);
}
bootstrapAdmin();
//# sourceMappingURL=bootstrap-admin.js.map