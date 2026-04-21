/** @description Secure Firebase Admin initialization and Firestore provider */
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      // Optionally fallback to cert if local dev with a service account key
      // credential: admin.credential.cert(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "")
    });
  } catch (error) {
    console.error("Firebase admin initialization error", error);
  }
}

export const db = admin.firestore();
