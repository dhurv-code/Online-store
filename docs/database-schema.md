# Database Schema

This document defines Firestore collections, document structure, and relationships for the hyperlocal marketplace.

## Collections

### `users`
Stores every registered user, including buyers, sellers, and admins.

Document structure:

- `id` (string) — Firestore document ID
- `displayName` (string)
- `email` (string)
- `role` (string) — `buyer`, `seller`, `admin`, `pending_seller`, `suspended`
- `city` (string) — default `Dehradun`
- `photoUrl` (string)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)
- `sellerProfileId` (string, optional)

Indexes:
- `role`
- `city`

### `sellers`
Stores seller application data, approval status and store relationship.

Document structure:

- `id` (string)
- `userId` (string)
- `storeId` (string)
- `businessName` (string)
- `phoneNumber` (string)
- `address` (string)
- `storeDescription` (string)
- `status` (string) — `pending`, `approved`, `rejected`, `suspended`
- `approvedAt` (timestamp, optional)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

Indexes:
- `userId`
- `status`

### `stores`
Stores seller storefront details for public listing and buyer discovery.

Document structure:

- `id` (string)
- `sellerId` (string)
- `name` (string)
- `slug` (string)
- `coverImage` (string)
- `logoUrl` (string)
- `description` (string)
- `location` (map)
  - `city` (string)
  - `area` (string)
- `contactInfo` (map)
  - `phone` (string)
  - `email` (string)
- `approved` (boolean)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

Indexes:
- `sellerId`
- `approved`
- `location.city`

### `products`
Stores product listings by seller.

Document structure:

- `id` (string)
- `sellerId` (string)
- `storeId` (string)
- `name` (string)
- `description` (string)
- `category` (string)
- `price` (number)
- `currency` (string)
- `images` (array of strings)
- `available` (boolean)
- `approved` (boolean)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

Indexes:
- `storeId`
- `sellerId`
- `approved`
- `category`
- `name`

### `conversations`
Stores chat threads between buyers and sellers.

Document structure:

- `id` (string)
- `buyerId` (string)
- `sellerId` (string)
- `productId` (string)
- `storeId` (string)
- `lastMessage` (string)
- `lastMessageAt` (timestamp)
- `participants` (array of strings)
- `status` (string) — `active`, `closed`
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

Indexes:
- `buyerId`
- `sellerId`
- `productId`
- `participants`

### `messages`
Stores individual chat messages in a subcollection for each conversation.

Document structure:

- `id` (string)
- `conversationId` (string)
- `senderId` (string)
- `senderRole` (string) — `buyer`, `seller`, `admin`
- `message` (string)
- `createdAt` (timestamp)
- `readAt` (timestamp, optional)

Indexes:
- `conversationId`
- `senderId`
- `createdAt`

## Relationships

- `users` → `sellers` via `userId`
- `sellers` → `stores` via `storeId`
- `stores` → `products` via `storeId`
- `conversations` link `buyerId`, `sellerId`, and `productId`
- `messages` are nested under `conversations/{conversationId}/messages`

## One Conversation Rule

There is a single `conversations` document per unique buyer-product-seller combination.
The app will query for existing conversations before creating a new one.
