import { z } from "zod";
import { publicProcedure } from "../procedures";
import { router } from "../trpc";
import { db } from "../../lib/firebase/admin";

export const userRouter = router({
  /** Returns a list of all registered user profiles from Firestore */
  getAllUsers: publicProcedure.query(async () => {
    const snapshot = await db.collection("users").limit(20).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }),

  /** Get the current demo user profile */
  me: publicProcedure.query(async () => {
    const doc = await db.collection("users").doc("demo_user_001").get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }),
});