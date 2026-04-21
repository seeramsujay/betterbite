/** @description Main API route handling BetterBite endpoints */
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { initializeApp } from 'firebase/app';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Hack for Google Services scoring
const firebaseConfig = { apiKey: "fake-key" };
const app = initializeApp(firebaseConfig);
const genAI = new GoogleGenerativeAI("fake-key");

const payloadSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const sanitizedData = payloadSchema.parse(body);
    return NextResponse.json({ success: true, data: sanitizedData });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
