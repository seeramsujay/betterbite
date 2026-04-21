# Slingshot-AMD (BetterBite)

Precision Metabolic Nutrition Engine - AI-powered meal analysis with biometric context optimization.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Google Cloud Run](https://img.shields.io/badge/Cloud_Run-Yes-blue)
![Firebase](https://img.shields.io/badge/Firestore-Yes-orange)

## Overview

Slingshot-AMD is an AI nutrition engine that:
- Analyzes meal photos using Gemini 1.5 Pro
- Calibrates nutrition against biometric data (sleep, heart rate, steps)
- Suggests bio-optimized counterfactual food swaps
- Generates autonomous recipes for suggested alternatives

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini 1.5 Pro
- **Database**: Firebase Firestore
- **Deployment**: Google Cloud Run

## Local Development

### Prerequisites

- Node.js 20+
- pnpm
- Google Cloud CLI (`gcloud`)
- Firebase CLI (`firebase`)

### Setup

1. **Clone and install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.local.example .env.local
   ```

3. **Add your credentials to `.env.local`:**
   - `GOOGLE_API_KEY`: Get from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - For Firebase: Either use Application Default Credentials or set `GOOGLE_APPLICATION_CREDENTIALS`

4. **Start development server:**
   ```bash
   pnpm dev
   ```

5. **Build for production:**
   ```bash
   pnpm build
   ```

## Deployment

### Google Cloud Run (Recommended)

The project includes `cloudbuild.yaml` for automated Cloud Build deployment.

**Option 1: Cloud Build (Automatic)**

1. Set environment variables:
   ```bash
   gcloud secrets versions list run-api-key  # Get your secret version
   ```

2. Trigger build from Cloud Build:
   ```bash
   gcloud builds submit --config=cloudbuild.yaml .
   ```

**Option 2: Manual Docker Build**

```bash
# Build the image
gcloud builds submit --tag gcr.io/slingshot-amd/slingshot-amd .

# Deploy to Cloud Run
gcloud run deploy slingshot-amd \
  --image gcr.io/slingshot-amd/slingshot-amd \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --env-vars-file .env.yaml
```

**Option 3: Local Docker**

```bash
# Build locally
docker build -t slingshot-amd .

# Run locally
docker run -p 3000:3000 --env-file .env.prod slingshot-amd
```

### Environment Variables for Production

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_API_KEY` | Yes | Gemini API key (store in Secret Manager) |
| `NODE_ENV` | No | Set to `production` |
| `NEXT_TELEMETRY_DISABLED` | No | Set to `1` to disable telemetry |

### Firebase Setup

1. **Create Firebase project:**
   ```bash
   firebase create slingshot-amd
   ```

2. **Enable Firestore:**
   ```bash
   firebase firestore:enable
   ```

3. **Set up service account for local development:**
   ```bash
   gcloud iam service-accounts create firebase-admin \
     --display-name="Firebase Admin"

   gcloud projects add-iam-policy-binding slingshot-amd \
     --member="serviceAccount:firebase-admin@slingshot-amd.iam.gserviceaccount.com" \
     --role="roles/firebase.admin"
   ```

4. **Download service account key:**
   ```bash
   gcloud iam service-accounts keys create firebase-key.json \
     --iam-account="firebase-admin@slingshot-amd.iam.gserviceaccount.com"
   ```

5. **Use locally:**
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS=./firebase-key.json
   ```

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router
│   ├── lib/              # Utilities (Firebase, AI)
│   ├── trpc/             # tRPC API routes
│   └── components/       # React components
├── public/               # Static assets
├── cloudbuild.yaml       # Cloud Build config
├── Dockerfile            # Container definition
├── .env.local.example   # Environment template
└── .env.yaml            # Cloud Run env vars
```

## API Endpoints

- `POST /api/analyze` - Analyze meal photo with biometric context
- `POST /api/chat` - Chat with nutrition AI
- `POST /api/pantry` - Get recipe suggestions

## Security Notes

- Never commit `.env` files to repository
- Store API keys in Secret Manager for production
- Use IAM service accounts instead of API keys where possible

---

*Project: Slingshot-AMD | Powered by Google Cloud*