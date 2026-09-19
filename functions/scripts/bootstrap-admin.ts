import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "../../.secrets/admin-key.json";
import { env } from "./env";

initializeApp({
  credential: cert(serviceAccount as any),
});

async function bootstrapAdmin() {
  const userRecord = await getAuth().createUser({
    email: env.SEED_ADMIN_EMAIL,
    password: env.SEED_ADMIN_PASSWORD,
    displayName: env.SEED_ADMIN_NAME,
  });

  await getAuth().setCustomUserClaims(userRecord.uid, { admin: true });

  console.log("Bootstrapped admin:", userRecord.uid);
}

bootstrapAdmin();
