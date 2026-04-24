# Deploying AgricSmart Protocol to Render

Follow these steps to deploy your Vite + React application to Render seamlessly.

## 1. Prerequisites
- A GitHub account with the repository pushed.
- A Firebase project (for Firestore and Auth).

## 2. Render Configuration

1. **Log in to Render** and click **"New" > "Web Service"**.
2. **Connect your GitHub repository** (`agricsmart-protocol`).
3. **Configure the Service**:
   - **Name**: `agricsmart-protocol`
   - **Environment**: `Static Site` (Render will detect Vite)
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

## 3. Environment Variables

In the Render dashboard, go to the **"Environment"** tab and add the following keys from your `.env` file:

| Key | Value |
|-----|-------|
| `VITE_FIREBASE_API_KEY` | Your Firebase API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | your-project.firebaseapp.com |
| `VITE_FIREBASE_PROJECT_ID` | your-project-id |
| `VITE_GEMINI_API_KEY` | Your Google AI (Gemini) API Key |

## 4. Firebase Configuration

Ensure your Firebase project has **Firestore** enabled and the rules allow access from your Render domain.

### Firestore Rules (Recommended for Prototype)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Update for production
    }
  }
}
```

## 5. Avoiding Build Errors

- **TypeScript**: If you get TS errors during build, ensure `npm run lint` passes locally.
- **Node Version**: Render defaults to Node 20+. If you need a specific version, add a `engines` field to `package.json`.

## 6. GitHub Push (Automated)

Run these commands to push your changes:
```bash
git add .
git commit -m "feat: add Sentinel Parametric Insurance with Gemini AI"
git push origin main
```

Your site will automatically redeploy on Render after every push!
