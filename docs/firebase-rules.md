# Firebase Security Rules

This document defines the security model for Firestore and Storage.
It is intended for Phase 7 implementation of production-ready rules.

## Security Principles

- Only authenticated users can read or write application data.
- Buyers may read public listings and their own chat data.
- Sellers may manage their own store, products, and conversations.
- Admins may manage users, sellers, and products.
- Seller product visibility is conditional on admin approval.
- No user may modify another user's private profile data.

## Example Rules Guidelines

### Firestore

- `users` collection:
  - `read` and `write` for authenticated users on their own document.
  - Admins may read all users.

- `sellers` collection:
  - Sellers may create and update their own seller application.
  - Admins may update approval status and suspend sellers.
  - Public reads only for approved sellers.

- `stores` collection:
  - Sellers may create/update their own store entry.
  - Only approved stores are readable by buyers.

- `products` collection:
  - Sellers may create/update/delete their own products.
  - Only `approved: true` products are visible to buyers.
  - Admins may remove or moderate products.

- `conversations` collection:
  - Buyers and assigned seller participants may read/write their own conversations.
  - Prevent creation of duplicate conversations through frontend enforcement.

- `messages` subcollection:
  - Message senders may create messages for conversations they belong to.
  - Read access limited to conversation participants.

### Storage

- Sellers may upload product and store media only to their own storage path.
- Public read access for approved product/store images.

## Rule Implementation Notes

The actual Firestore security rules should use role-based access using custom claims or user document lookups.

Example role checks:
- `isAdmin` — user role is `admin`
- `isSeller` — user role is `seller`
- `isOwner(userId)` — `request.auth.uid == resource.data.userId`

## Deployment

- Store security rules in `frontend/firestore.rules` or in the Firebase console.
- Test rules against buyer, seller, and admin personas.
