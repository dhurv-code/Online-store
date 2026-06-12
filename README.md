# Hyperlocal Marketplace MVP (Dehradun)

## Project Overview

This repository contains the MVP for a hyperlocal marketplace focused on Dehradun.
The application is built as a frontend-only solution using React, Vite, Tailwind CSS, and Firebase services.

The MVP is designed for validation of local seller onboarding, buyer-seller contact, and seller willingness to pay later for access.

## Tech Stack

- React + Vite
- Tailwind CSS
- React Router
- Firebase Authentication
- Firebase Firestore
- Firebase Storage
- Deployment: Vercel

## Goals

- Local buyer discovery within Dehradun
- Local seller onboarding with store creation
- Buyer-seller chat for direct contact
- Admin approval workflow for sellers
- Simple, scalable architecture with no custom backend

## Folder Structure

The application uses a feature-first folder structure inside `frontend/src`.

`frontend/src/`
- `app/` — application routing and layout composition
- `assets/` — static images and shared media
- `components/` — shared UI components and primitives
- `constants/` — app-wide constants and route definitions
- `context/` — React context providers and auth state management
- `features/` — domain feature modules (buyer, seller, admin, product, chat)
- `firebase/` — Firebase initialization and service abstractions
- `hooks/` — reusable hooks for data fetching and UI state
- `pages/` — top-level route pages
- `services/` — business logic and Firebase operations
- `styles/` — global styling, Tailwind config, theme utilities
- `utils/` — shared utilities, formatters, and helpers

## Setup Instructions

1. Install dependencies:

```bash
cd "frontend"
npm install
```

2. Create Firebase project and enable Authentication, Firestore, and Storage.
3. Add Firebase configuration to `.env`.
4. Run development server:

```bash
npm run dev
```

## Environment Variables

Create a `.env` file in `frontend/` with the following values:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Firebase Setup

- Email/password authentication
- Firestore in production mode with structured collections
- Storage for seller product images and store media

## Deployment Steps

1. Connect the repository to Vercel.
2. Set project root to `frontend`.
3. Add environment variables in Vercel settings.
4. Deploy the app.

## Future Improvements

- Product categories and filters
- Seller analytics dashboard
- Approvals and reporting workflows for admin
- Enhanced chat notifications and read receipts
- Seller onboarding wizard
- Optional mobile app wrapper
