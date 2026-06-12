/**
 * Route constants
 *
 * Responsibilities:
 * - Centralize all route paths
 * - Avoid hard-coded strings in components
 */

export const ROUTES = {
  landing: '/',
  login: '/login',
  register: '/register',
  unauthorized: '/unauthorized',
  notFound: '*',

  home: '/home',
  products: '/products',
  productDetails: '/products/:productId',
  sellerProfile: '/seller/:sellerId',
  chat: '/chat',
  chatDetail: '/chat/:conversationId',
  profile: '/profile',

  sellerDashboard: '/seller/dashboard',
  sellerProducts: '/seller/products',
  addProduct: '/seller/products/add',
  editProduct: '/seller/products/:productId/edit',
  storeSettings: '/seller/settings',
  sellerChats: '/seller/chats',

  adminDashboard: '/admin/dashboard',
  sellerApprovals: '/admin/sellers',
  productModeration: '/admin/products',
  userManagement: '/admin/users',
}
