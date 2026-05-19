import { describe, it, expect } from "vitest";
import { calculateMetabolicReadiness } from "../src/lib/utils/metabolic";
import { BiometricContextSchema, CounterfactualRequestSchema } from "../src/lib/validators";

describe("Metabolic Readiness Calculator", () => {
  it("calculates OPTIMAL status for high-performing biometrics", () => {
    const biometrics = {
      sleepHours: 8.0,
      currentHeartRate: 60,
      dailySteps: 8000,
    };
    const result = calculateMetabolicReadiness(biometrics);
    expect(result.score).toBe(100);
    expect(result.status).toBe("OPTIMAL");
    expect(result.description).toContain("glucose sensitivity is peaking");
  });

  it("calculates CRITICAL status for poor biometrics (low sleep, high heart rate, low steps)", () => {
    const biometrics = {
      sleepHours: 4.0,
      currentHeartRate: 110,
      dailySteps: 1000,
    };
    const result = calculateMetabolicReadiness(biometrics);
    // sleepScore = 50 * 0.4 = 20
    // hrScore = ((100 - 110) = -10, clamped to 0) * 0.3 = 0
    // stepsScore = (1000 / 8000) * 100 = 12.5 * 0.3 = 3.75
    // score = 20 + 3.75 = 24
    expect(result.score).toBeLessThan(55);
    expect(result.status).toBe("CRITICAL");
    expect(result.description).toContain("Metabolic readiness is low");
  });

  it("calculates STABLE status for average biometrics", () => {
    const biometrics = {
      sleepHours: 6.5,
      currentHeartRate: 75,
      dailySteps: 5000,
    };
    const result = calculateMetabolicReadiness(biometrics);
    expect(result.score).toBeGreaterThanOrEqual(55);
    expect(result.score).toBeLessThan(75);
    expect(result.status).toBe("STABLE");
    expect(result.description).toContain("Good glucose tolerance today");
  });
});

describe("Zod Schema Validators", () => {
  describe("BiometricContextSchema", () => {
    it("successfully validates correct inputs", () => {
      const valid = {
        sleepHours: 7.5,
        currentHeartRate: 72,
        dailySteps: 5400,
      };
      const result = BiometricContextSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("fails validation for out-of-bounds sleepHours", () => {
      const invalid = {
        sleepHours: 25.0, // max 24
        currentHeartRate: 72,
        dailySteps: 5400,
      };
      const result = BiometricContextSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it("fails validation for negative dailySteps", () => {
      const invalid = {
        sleepHours: 7.5,
        currentHeartRate: 72,
        dailySteps: -10, // min 0
      };
      const result = BiometricContextSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it("fails validation for out-of-bounds heart rate", () => {
      const invalidHigh = {
        sleepHours: 7.5,
        currentHeartRate: 260, // max 250
        dailySteps: 5000,
      };
      const resultHigh = BiometricContextSchema.safeParse(invalidHigh);
      expect(resultHigh.success).toBe(false);

      const invalidLow = {
        sleepHours: 7.5,
        currentHeartRate: 25, // min 30
        dailySteps: 5000,
      };
      const resultLow = BiometricContextSchema.safeParse(invalidLow);
      expect(resultLow.success).toBe(false);
    });
  });

  describe("CounterfactualRequestSchema", () => {
    it("successfully validates valid payloads", () => {
      const valid = {
        image: "SGVsbG8gV29ybGQ=", // "Hello World" in base64
        mimeType: "image/jpeg",
        biometrics: {
          sleepHours: 8.0,
          currentHeartRate: 65,
          dailySteps: 10000,
        },
      };
      const result = CounterfactualRequestSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("fails validation for invalid base64 image string", () => {
      const invalid = {
        image: "not-a-base64-string!",
        mimeType: "image/png",
        biometrics: {
          sleepHours: 8.0,
          currentHeartRate: 65,
          dailySteps: 10000,
        },
      };
      const result = CounterfactualRequestSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });
});
