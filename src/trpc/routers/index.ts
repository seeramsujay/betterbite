import { router } from "../trpc";
import { userRouter } from "./user";
import { mealRouter } from "./meal";

export const appRouter = router({
  user: userRouter,
  meal: mealRouter,
});

export type AppRouter = typeof appRouter;