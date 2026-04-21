/** @description Autonomous Pantry Sync: Generates 3-step recipes and grocery lists via Gemini */
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import xss from "xss";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const RecipeRequestSchema = z.object({
  swapItem: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RecipeRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { swapItem } = parsed.data;

    const prompt = `
      Generate a healthy 3-step recipe for "${swapItem}".
      Also provide a concise JSON grocery list.
      Return ONLY a JSON object:
      {
        "recipeName": "...",
        "steps": ["step 1", "step 2", "step 3"],
        "groceryList": ["item 1", "item 2", ...]
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid AI response");
    
    const rawData = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      success: true,
      data: {
        recipeName: xss(rawData.recipeName),
        steps: rawData.steps.map((s: string) => xss(s)),
        groceryList: rawData.groceryList.map((i: string) => xss(i))
      }
    });
  } catch (error) {
    console.error("Recipe Generation Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
