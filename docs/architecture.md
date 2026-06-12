# Architecture Overview

## System Architecture

The application uses a frontend-only architecture with Firebase as the backend platform.
This maintains a clean separation between UI and data access while keeping the MVP simple.

- `React + Vite` for the frontend application
- `React Router` for client-side route handling
- `Firebase Auth` for user authentication and role management
- `Cloud Firestore` for application data and real-time chat
- `Firebase Storage` for seller product images and store media
- `Vercel` for frontend deployment

## Architecture Layers

1. Presentation Layer
   - `pages/` contains top-level route pages
   - `components/` contains reusable UI components
   - `styles/` contains global styles and Tailwind configuration

2. State & Routing Layer
   - `context/` contains authentication and role context
   - `app/` contains route layout, protected routes, and route definitions

3. Feature Layer
   - `features/` contains the domain feature modules for Buyer, Seller, Admin, Product, Store, and Chat
   - Each feature owns its own pages, components, hooks, and services where needed

4. Data Access Layer
   - `firebase/` contains Firebase initialization and helper adapters
   - `services/` contains business-facing service classes that encapsulate Firestore and Storage operations

5. Shared Utilities
   - `constants/` contains route names, role definitions, collection names, and static values
   - `utils/` contains helpers for formatting, validation, and error handling

## Feature-Based Folder Structure

- `src/app/`
  - `routes.jsx`
  - `AppRouter.jsx`
  - `route-protection.jsx`

- `src/features/buyer/`
  - `pages/`
  - `components/`
  - `services/`
  - `hooks/`

- `src/features/seller/`
  - `pages/`
  - `components/`
  - `services/`
  - `hooks/`

- `src/features/admin/`
  - `pages/`
  - `components/`
  - `services/`
  - `hooks/`

- `src/features/product/`
- `src/features/chat/`
- `src/features/store/`

## Routing Architecture

### Public Pages
- `/` — Landing Page
- `/login` — Login
- `/register` — Register
- `/unauthorized` — Unauthorized access page
- `*` — 404 Not Found

### Buyer Pages
- `/home` — Buyer home feed
- `/products` — Product listing
- `/products/:productId` — Product details
- `/seller/:sellerId` — Seller store profile
- `/chat/:conversationId` — Chat with seller
- `/profile` — Buyer profile

### Seller Pages
- `/seller/dashboard` — Seller dashboard
- `/seller/products` — Product management
- `/seller/products/add` — Add product
- `/seller/products/:productId/edit` — Edit product
- `/seller/settings` — Store settings
- `/seller/chats` — Chat inbox

### Admin Pages
- `/admin/dashboard` — Admin dashboard
- `/admin/sellers` — Seller approvals
- `/admin/products` — Product moderation
- `/admin/users` — User management

## Authentication Flow

### User Roles
- `buyer`
- `seller`
- `admin`
- `pending_seller`
- `suspended`

### Signup Flow
1. User registers with email and password.
2. `users` document is created in Firestore with default `role: buyer`.
3. Seller signup path includes additional seller registration data.
4. Seller users are assigned `role: pending_seller` until admin approval.

### Login Flow
1. User signs in via Firebase Auth.
2. Frontend retrieves the user document from Firestore.
3. Role, profile completeness, and approval status are loaded.
4. The app establishes session context and enforces route protection.

### Protected Routes
- Buyer routes require authenticated users with role `buyer` or `admin`.
- Seller routes require authenticated users with role `seller`.
- Admin routes require authenticated users with role `admin`.
- Unauthorized users are redirected to `/unauthorized`.

### Session Management
- Persistent login via Firebase Auth state.
- Role state loaded on login and refreshed on page load.
- Logout clears auth state and redirects to `/login`.
