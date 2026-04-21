/** @description Central Zod validation schemas for BetterBite engine */
import { z } from "zod";

export const BiometricContextSchema = z.object({
  sleepHours: z.number().min(0).max(24),
  currentHeartRate: z.number().min(30).max(250),
  dailySteps: z.number().min(0),
});

export const MealLogSchema = z.object({
  id: z.number().optional(),
  imageUrl: z.string().url().optional(),
  identifiedMeal: z.string(),
  predictedOutcome: z.string(),
  suggestedSwap: z.string().optional(),
  counterfactualOutcome: z.string().optional(),
  biometricContextId: z.number().optional(),
  createdAt: z.date().optional(),
});

export const CounterfactualRequestSchema = z.object({
  image: z.string().base64(),
  mimeType: z.string(),
  biometrics: BiometricContextSchema,
});
