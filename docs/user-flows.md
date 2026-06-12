# User Flows

This document maps the buyer, seller, and admin journeys for the Hyperlocal Marketplace MVP.

## Buyer Flow

1. Landing page
2. Register or login
3. Browse products
4. Search products by name and category
5. View product details
6. View seller store profile
7. Contact seller via "Contact Seller"
8. Open or continue a chat
9. View buyer profile
10. Logout

### Buyer chat flow

- Buyer clicks `Contact Seller` from product details.
- Frontend checks for an existing conversation for buyer-product-seller.
- If none exists, create a new `conversation` document.
- Buyer sends messages into `conversations/{conversationId}/messages`.
- Real-time updates display incoming seller replies.

## Seller Flow

1. Login as seller
2. Create or edit seller profile
3. Create store information
4. Add products with images
5. Edit or delete existing products
6. View chat inbox
7. Reply to buyer messages
8. Update store settings
9. Logout

### Seller approval flow

- Seller signs up or upgrades to seller role.
- Seller profile enters `pending` approval state.
- Admin reviews the request.
- When approved, seller products and store become public.
- If rejected or suspended, seller access is restricted.

## Admin Flow

1. Login as admin
2. View dashboard statistics
3. Review pending sellers
4. Approve or reject seller applications
5. View and moderate product listings
6. Search and manage users
7. Suspend sellers when needed
8. Logout

## Route Protection and Redirects

- Unauthenticated users are redirected to `/login` when trying to access protected pages.
- Authenticated users without the correct role are redirected to `/unauthorized`.
- Approved seller state is required before product listing management is visible.
- Admin routes are only available to users with the `admin` role.
