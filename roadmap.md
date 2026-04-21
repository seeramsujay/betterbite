# 🗺️ Antigravity: Contextual Counterfactual Nutrition Engine Roadmap

## 🛡️ Phase 1: The "Google Cloud Data Core" Foundation
*Goal: Secure monolithic foundation powered entirely by Google services.*

* [x] **Strict Tech Stack**:
    * Clean Next.js 14 App Router setup. (Strictness confirmed)
* [x] **Security Schema**:
    * Define `src/lib/validators.ts` using `zod` for all payloads (Meal, Context, User).
    * Implement `xss` sanitization in all routes.
* [x] **Database & Firebase Admin**:
    * Initialize `firebase-admin` for secure backend interactions.
    * Structure Firestore: `users/{uid}/biometrics` and `users/{uid}/meal_logs`.
* [x] **JSDoc layer**: All backend core engine components documented.

## 🧠 Phase 2: Multimodal Intelligence (Gemini Core)
*Goal: Gemini 1.5 Pro integration with biometric context-injected prompting.*

* [x] **Gemini Pipeline**:
    * Create `src/app/api/analyze/route.ts`.
    * Implement Gemini 1.5 Pro multimodal vision call.
* [x] **Context Injection**:
    * Prompt Chaining: Merge image data + biometrics into counterfactual prompt.
* [x] **Predictive Output**:
    * Parse Gemini JSON into Zod-verified Firestore documents.

## 🎨 Phase 3: The "Cyber-Organic" UI/UX
*Goal: Premium, accessible dashboard.* (Frontend WIP)

* [x] **Accessible Components**:
    * Build `Dashboard` using semantic HTML5 and Radix primitives.
    * Apply "Cyber-Organic" aesthetics (vibrant greens, glassmorphism, organic blurs).
* [ ] **State & Performance**:
    * Integrate `Zustand` for biometric and meal state tracking.
    * Implement `next/dynamic` for heavy AI modals.
* [ ] **Aria-Live Loading**: Visual and audible "Gemini Thinking" states.

## 🤖 Phase 4: Autonomous Pantry Sync (Agentic Feature)
*Goal: Moving from advisor to actionable agent.*

* [x] **Pantry Scripting**:
    * Create `/api/recipe` route for counterfactual swap generation.
    * Generate 3-step recipe + JSON grocery list via Gemini.
* [x] **Recipe Sync UI**: (Frontend task)
    * Interactive modal showing swap benefits + ingredients. (Nourish Feed implemented)

## ☁️ Phase 5: Google Cloud Run Deployment
*Goal: Hackathon-ready, auto-scaling, serverless deployment.*

* [x] **Containerization**:
    * Multi-stage `Dockerfile`.
* [x] **Google Cloud Run Readiness**:
    * End-to-end testing (Vitest setup + passing tests).
* [ ] **Cloud Run Deployment**: Final Deploy pass.