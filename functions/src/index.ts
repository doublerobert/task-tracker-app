import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getAuth } from "firebase-admin/auth";
import { initializeApp } from "firebase-admin/app";

initializeApp();

export const createUser = onCall(async (request) => {
  // only an existing admin can call this
  if (request.auth?.token.admin !== true) {
    throw new HttpsError("permission-denied", "Only admins can create users");
  }

  const { email, password, displayName, role } = request.data;

  const userRecord = await getAuth().createUser({
    email,
    password,
    displayName,
  });

  // set custom claim if role is admin
  if (role === "admin") {
    await getAuth().setCustomUserClaims(userRecord.uid, { admin: true });
  }

  return { uid: userRecord.uid };
});
