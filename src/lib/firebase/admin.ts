/** @description Secure Firebase Admin initialization and Firestore provider */
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    let credential;

    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        credential = admin.credential.cert(serviceAccount);
      } catch (err) {
        console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY as JSON:", err);
      }
    }

    if (!credential && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      const credentialsStr = process.env.GOOGLE_APPLICATION_CREDENTIALS.trim();
      if (credentialsStr.startsWith("{") && credentialsStr.endsWith("}")) {
        try {
          const serviceAccount = JSON.parse(credentialsStr);
          credential = admin.credential.cert(serviceAccount);
        } catch (err) {
          console.error("Failed to parse GOOGLE_APPLICATION_CREDENTIALS as JSON string:", err);
        }
      }
    }

    if (!credential) {
      credential = admin.credential.applicationDefault();
    }

    admin.initializeApp({
      credential,
    });
  } catch (error) {
    console.error("Firebase admin initialization error", error);
  }
}

export const db = admin.firestore();
