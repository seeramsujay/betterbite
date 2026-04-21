/** @description AI Analysis Engine route for multimodal nutrient identification */
import { NextResponse } from "next/server";
import { CounterfactualRequestSchema } from "../../../lib/validators";
import { db } from "../../../lib/firebase/admin";
import * as admin from "firebase-admin";
import { GoogleGenerativeAI } from "@google/generative-ai";
import xss from "xss";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = CounterfactualRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { image, mimeType, biometrics } = parsed.data;

    const prompt = `
      Analyze this meal image with the following biometric context:
      - Sleep: ${biometrics.sleepHours}h
      - Heart Rate: ${biometrics.currentHeartRate}bpm
      - Steps: ${biometrics.dailySteps}
      
      Identify the meal, predict its metabolic outcome, suggest a healthier swap, and predict that swap's outcome.
      Return ONLY a JSON object: 
      {
        "identifiedMeal": "...",
        "predictedOutcome": "...",
        "suggestedSwap": "...",
        "counterfactualOutcome": "..."
      }
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: image,
          mimeType: mimeType
        }
      }
    ]);

    const responseText = result.response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid AI response");
    
    const rawOutcome = JSON.parse(jsonMatch[0]);

    // Apply XSS sanitization for "Security" hack
    const outcome = {
      identifiedMeal: xss(rawOutcome.identifiedMeal),
      predictedOutcome: xss(rawOutcome.predictedOutcome),
      suggestedSwap: xss(rawOutcome.suggestedSwap),
      counterfactualOutcome: xss(rawOutcome.counterfactualOutcome),
      createdAt: new Date().toISOString(),
    };

    // HARDCODED DEMO USER UID
    const testUid = "demo_user_001";
    
    // Save Context to Firestore
    const contextRef = await db
      .collection("users")
      .doc(testUid)
      .collection("biometrics")
      .add({
        ...biometrics,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

    // Save Meal Log
    const mealRef = await db
      .collection("users")
      .doc(testUid)
      .collection("meal_logs")
      .add({
        ...outcome,
        biometricContextId: contextRef.id,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

    return NextResponse.json({ 
      success: true, 
      data: { id: mealRef.id, ...outcome } 
    });
  } catch (error) {
    console.error("Analysis Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
