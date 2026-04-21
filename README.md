# 🥗 BetterBite: Precision Metabolic Nutrition Engine

BetterBite is a premium, production-ready AI nutrition engine that identifies meals from photos and predicts metabolic outcomes using biometric context (Sleep, Heart Rate, Steps). It utilizes Gemini 1.5 Pro to suggest bio-optimized counterfactual swaps and generate real-time recipes.

![AESTHETICS](https://img.shields.io/badge/Aesthetics-Premium-blueviolet)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Gemini 1.5 Pro](https://img.shields.io/badge/Gemini-1.5_Pro-blue)
![Firebase](https://img.shields.io/badge/Firebase-Admin-orange)

## ✨ Core Features

- **Multimodal AI Analysis**: Upload meal photos for nutrient identification via Gemini 1.5 Pro.
- **Biometric Context Injection**: Analysis is calibrated against sleep quality and heart rate variability.
- **Counterfactual Swaps**: Real-time suggestions to optimize glucose response.
- **Autonomous Pantry**: AI-generated 3-step recipes and grocery lists for any suggested swap.
- **Premium UI**: Cyber-Organic design system with Glassmorphism and Editorial typography.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **State**: Zustand
- **Styling**: Tailwind CSS + Custom Design Tokens
- **AI**: Google Generative AI (Gemini 1.5 Pro)
- **Database**: Firebase Firestore (via Firebase Admin SDK)
- **Deployment**: Google Cloud Run (Containerized)

## 🚀 Getting Started

### 1. Environment Setup
Create a `.env` file in the root:
```env
GOOGLE_API_KEY="your_gemini_api_key"
# Firebase service account will be picked up via GOOGLE_APPLICATION_CREDENTIALS 
# or applicationDefault() in Cloud Run.
```

### 2. Install & Build
```bash
pnpm install
pnpm build
```

### 3. Run Locally
```bash
pnpm dev
```

## 🏗 Deployment

The project is containerized and ready for Google Cloud Run.
```bash
gcloud builds submit --tag gcr.io/your-project/betterbite
gcloud run deploy betterbite --image gcr.io/your-project/betterbite --platform managed
```

## 📜 Documentation & Roadmap
- [Roadmap](roadmap.md): Trace the architectural evolution.
- [Future Steps](Future_Steps.md): Scaling and integration guides.

---
*Created by Antigravity for the BetterBite Digital Larder.*