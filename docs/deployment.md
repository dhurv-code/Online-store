# Deployment

This document describes deployment steps for the frontend and Firebase integration.

## Vercel Deployment

1. Create a Vercel account and log in.
2. Import the repository.
3. Set the project root to `frontend`.
4. Configure build settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
5. Add environment variables in Vercel:

```env
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

6. Deploy the site.

## Firebase Setup

1. Create a Firebase project in the Firebase console.
2. Enable Authentication with Email/Password.
3. Create a Firestore database in production mode.
4. Enable Firebase Storage.
5. Copy Firebase config values into Vercel and local `.env`.

## Runtime Configuration

- Use Firestore security rules to protect collections.
- Use Storage rules to restrict seller media uploads.
- Use Firebase Auth state to control route access.

## Local Development

1. Run `npm install` inside `frontend`.
2. Start the app:

```bash
npm run dev
```

3. Point the app to Firebase via `.env`.

## Continuous Deployment

- Every push to `main` should trigger Vercel deploy.
- Use Vercel environment variables for both preview and production.
- Keep Firebase config values out of source control.
