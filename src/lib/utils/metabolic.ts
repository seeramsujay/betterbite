export interface Biometrics {
  sleepHours: number;
  currentHeartRate: number;
  dailySteps: number;
}

export interface MetabolicReadiness {
  score: number;
  status: "OPTIMAL" | "STABLE" | "CRITICAL";
  description: string;
}

/**
 * Calculates a dynamic metabolic readiness score and description based on biometrics.
 * - sleepHours: 40% weight (optimal at 8 hours)
 * - currentHeartRate: 30% weight (optimal at 60 bpm, degrades up to 100 bpm)
 * - dailySteps: 30% weight (optimal at 8000 steps)
 */
export function calculateMetabolicReadiness(biometrics: Biometrics): MetabolicReadiness {
  const sleepScore = Math.max(0, Math.min(100, (biometrics.sleepHours / 8) * 100));
  const hrScore = Math.max(0, Math.min(100, ((100 - biometrics.currentHeartRate) / 40) * 100));
  const stepsScore = Math.max(0, Math.min(100, (biometrics.dailySteps / 8000) * 100));
  
  const score = Math.round((sleepScore * 0.4) + (hrScore * 0.3) + (stepsScore * 0.3));

  let status: "OPTIMAL" | "STABLE" | "CRITICAL" = "OPTIMAL";
  let description = "Your glucose sensitivity is peaking. Ideal window for a high-carb lunch.";
  
  if (score < 55) {
    status = "CRITICAL";
    description = "Metabolic readiness is low due to poor sleep or high heart rate. Stick to low-glycemic foods.";
  } else if (score < 75) {
    status = "STABLE";
    description = "Good glucose tolerance today. Ideal for standard balanced meals.";
  }

  return { score, status, description };
}
