/** @description Recipe Adaptation Engine: Counterfactually adapts recipes to metabolic contexts */
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import xss from "xss";
import { db } from "../../../lib/firebase/admin";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const AdaptRequestSchema = z.object({
  recipePrompt: z.string().min(1),
  biometrics: z.object({
    sleepHours: z.number().min(0).max(24),
    currentHeartRate: z.number().min(30).max(250),
    dailySteps: z.number().min(0),
  }).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = AdaptRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { recipePrompt, biometrics: reqBiometrics } = parsed.data;

    // Resolve biometrics: request payload -> Firestore -> defaults
    let biometrics = reqBiometrics;

    if (!biometrics) {
      try {
        const testUid = "demo_user_001";
        const snapshot = await db
          .collection("users")
          .doc(testUid)
          .collection("biometrics")
          .orderBy("timestamp", "desc")
          .limit(1)
          .get();

        if (!snapshot.empty) {
          const docData = snapshot.docs[0].data();
          biometrics = {
            sleepHours: docData.sleepHours ?? 7.4,
            currentHeartRate: docData.currentHeartRate ?? 62,
            dailySteps: docData.dailySteps ?? 4218,
          };
        }
      } catch (dbErr) {
        console.error("Failed to fetch biometrics from DB, using defaults:", dbErr);
      }
    }

    if (!biometrics) {
      biometrics = {
        sleepHours: 7.4,
        currentHeartRate: 62,
        dailySteps: 4218,
      };
    }

    const prompt = `
      Adapt the following recipe or craving prompt: "${recipePrompt}"
      
      Integrate the user's current metabolic context:
      - Sleep: ${biometrics.sleepHours} hours
      - Heart Rate: ${biometrics.currentHeartRate} bpm
      - Daily Steps: ${biometrics.dailySteps}
      
      Perform a counterfactual metabolic adaptation:
      1. Swap high-glycemic or inflammatory ingredients for healthier alternatives (e.g. swapping white rice with cauliflower, refined flour with almond/coconut flour, sugar with dark cacao or monk fruit).
      2. Tailor the swap to the biometrics (e.g. if sleep is low, prioritize ingredients that optimize insulin sensitivity and reduce cortisol).
      
      Return ONLY a JSON object:
      {
        "originalName": "string (the name of the original meal)",
        "adaptedName": "string (the name of the modified healthier swap)",
        "swapDescription": "string (1-2 sentences explaining why this swap benefits their metabolic state today)",
        "metabolicGain": "string (e.g. '+35% Glucose Stability' or '+20% Metabolic Readiness')",
        "steps": ["step 1 (string)", "step 2 (string)", "step 3 (string)"],
        "groceryList": ["item 1 (string)", "item 2 (string)", ...]
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid AI response");

    const rawData = JSON.parse(jsonMatch[0]);

    // Apply XSS sanitization on output values
    const data = {
      originalName: xss(rawData.originalName || recipePrompt),
      adaptedName: xss(rawData.adaptedName || `Healthy ${recipePrompt}`),
      swapDescription: xss(rawData.swapDescription || ""),
      metabolicGain: xss(rawData.metabolicGain || "+25% stability"),
      steps: (rawData.steps || []).map((step: string) => xss(step)),
      groceryList: (rawData.groceryList || []).map((item: string) => xss(item)),
    };

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Adaptation Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
