# BetterBite: Architectural Review & Nutrition Intelligence Roadmap (future.md)

---

## 1. Architectural Code Review & Current State Analysis

BetterBite is a personalized nutrition intelligence platform engineered on **Next.js (App Router)**, **tRPC**, **Firebase / Google Cloud Firestore**, and **Gemini Multimodal Vision**. By ingesting meal photos along with user biometric contexts (allergies, metabolic goals, glycemic sensitivities), BetterBite extracts detailed macronutrient profiles and serves contextual dietary guidance.

### Architectural Strengths
- **Type-Safe Full-Stack Endpoints:** Leverages tRPC for seamless end-to-end type safety between client components and backend inference procedures.
- **Structured Multimodal Parsing:** Grounds Gemini Vision in strict JSON schemas for predictable calorie, fat, protein, and carbohydrate estimations.
- **Multi-Cloud Deployment Flexibility:** Pre-configured Dockerfile and `cloudbuild.yaml` for Google Cloud Run alongside optimized Vercel static asset caching.

### Identified Bottlenecks & Code Smells
1. **Volumetric Estimation Uncertainty:** Estimating portion sizes and density from a single 2D image introduces $\pm 25\%$ error margins on complex, layered meals (e.g. casseroles, curries).
2. **Cold-Start Latency on Serverless Vision Calls:** Processing high-resolution images via Cloud Run serverless functions can exceed 2.5 seconds on un-optimized mobile networks.
3. **Absence of Real-Time Biometric Feedback:** Recommendations rely on static survey inputs rather than dynamic physiological feedback from wearables.

---

## 2. Strategic Engineering Roadmap

```mermaid
flowchart TD
    subgraph Phase 1: High-Fidelity 3D Portion Reconstruction
        P1A[Stereo / LiDAR Depth Map Ingestion] --> P1B[Volumetric Food Density Classifier]
        P1B --> P1C[Caloric Error Margin Shrinkage < 8%]
    end

    subgraph Phase 2: Continuous Glucose & Wearable Biometrics
        P2A[Dexcom / Libre CGM Bluetooth BLE Stream] --> P2B[Predictive Postprandial Glucose Spikes]
        P2B --> P2C[Personalized Insulin Sensitivity Adjuster]
    end

    subgraph Phase 3: Client-Side Edge Vision & Offline TFLite
        P3A[On-Device TFLite / WebGPU Segmentation] --> P3B[Sub-200ms Ingredient Bounding Boxes]
        P3B --> P3C[Zero-Data Private Local Dietary Diary]
    end

    subgraph Phase 4: Autonomous Smart Pantry & Grocery Fulfillment
        P4A[Pantry Ingredient Barcode Scanner] --> P4B[Instacart / Amazon Fresh Cart Auto-Sync]
        P4B --> P4C[Zero-Waste Recipe Synthesis Engine]
    end

    Phase 1 --> Phase 2
    Phase 2 --> Phase 3
    Phase 3 --> Phase 4
```

---

## 3. Detailed Milestone Execution Plan

### Milestone 1: 3D Volumetric Depth & Caloric Precision
- [ ] **LiDAR / Depth Sensor Integration:** Utilize iOS TrueDepth and Android ARCore depth APIs to calculate real physical volume ($cm^3$) of food items on plates.
- [ ] **Food Density Knowledge Graph:** Map identified ingredients to empirical density tables (e.g., cooked basmati rice vs raw grains) to compute precise gram weights.
- [ ] **Multi-Angle Guided Capture:** Guide users to snap two perspective angles if depth sensors are unavailable.

### Milestone 2: Continuous Glucose Monitor (CGM) Real-Time Telemetry
- [ ] **Wearable HealthKit / Health Connect Sync:** Ingest continuous glucose curves, sleep latency, and heart-rate variability (HRV) from Apple Health and Android Health Connect.
- [ ] **Postprandial Glycemic Predictions:** Predict blood sugar spikes 90 minutes post-meal and alert the user to take a 10-minute walk to blunt glycemic excursions.

### Milestone 3: On-Device Edge Vision & WebGPU Acceleration
- [ ] **Local Mobile Food Segmentation:** Deploy lightweight MobileNetV4 / YOLO-Food on device for real-time bounding box detection at 30 FPS.
- [ ] **Client-Side Image Pre-Processing:** Crop and compress meal photos in WebAssembly before transmission to reduce network payloads by 85%.

### Milestone 4: Smart Pantry & Autonomous Delivery Bridge
- [ ] **Pantry Expiration Radar:** Track pantry staples via barcode scanning and suggest recipes prioritizing ingredients near expiration.
- [ ] **Automated Meal Prep Grocery Carts:** Convert a week's optimized meal plan into a one-click checkout cart on Instacart or local grocery fulfillment APIs.
