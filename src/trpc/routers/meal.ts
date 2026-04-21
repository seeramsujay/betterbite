import { z } from "zod";
import { publicProcedure } from "../procedures";
import { router } from "../trpc";
import { db } from "../../lib/firebase/admin";

export const mealRouter = router({
  getLogs: publicProcedure.query(async () => {
    const testUid = "demo_user_001"; // Consistent with api/analyze
    const snapshot = await db
      .collection("users")
      .doc(testUid)
      .collection("meal_logs")
      .orderBy("timestamp", "desc")
      .limit(10)
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }),

  getBiometrics: publicProcedure.query(async () => {
    const testUid = "demo_user_001";
    const snapshot = await db
      .collection("users")
      .doc(testUid)
      .collection("biometrics")
      .orderBy("timestamp", "desc")
      .limit(1)
      .get();

    return snapshot.docs[0]?.data() || null;
  }),
});
