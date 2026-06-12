import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { ROUTES } from '../constants/routes'
import LandingPage from '../features/public/pages/LandingPage'
import LoginPage from '../features/public/pages/LoginPage'
import RegisterPage from '../features/public/pages/RegisterPage'
import UnauthorizedPage from '../features/public/pages/UnauthorizedPage'
import NotFoundPage from '../features/public/pages/NotFoundPage'
import HomePage from '../features/buyer/pages/HomePage'
import ProductListPage from '../features/products/pages/ProductListPage'
import ProductDetailsPage from '../features/products/pages/ProductDetailsPage'
import SellerProfilePage from '../features/store/pages/SellerProfilePage'
import ChatPage from '../features/chat/pages/ChatPage'
import ProfilePage from '../features/buyer/pages/ProfilePage'
import SellerDashboardPage from '../features/seller/pages/SellerDashboardPage'
import SellerProductsPage from '../features/seller/pages/SellerProductsPage'
import AddProductPage from '../features/seller/pages/AddProductPage'
import EditProductPage from '../features/seller/pages/EditProductPage'
import StoreSettingsPage from '../features/seller/pages/StoreSettingsPage'
import SellerChatsPage from '../features/seller/pages/SellerChatsPage'
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage'
import SellerApprovalsPage from '../features/admin/pages/SellerApprovalsPage'
import ProductModerationPage from '../features/admin/pages/ProductModerationPage'
import UserManagementPage from '../features/admin/pages/UserManagementPage'
import { ROLES } from '../constants/roles'

/**
 * AppRoutes
 *
 * Defines application routes and role-based access.
 *
 * Responsibilities:
 * - Configure public and protected route mappings
 * - Guard buyer, seller, and admin sections
 */

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.landing} element={<LandingPage />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.register} element={<RegisterPage />} />
      <Route path={ROUTES.unauthorized} element={<UnauthorizedPage />} />
      <Route path={ROUTES.home} element={<ProtectedRoute roles={[ROLES.buyer, ROLES.admin, ROLES.seller]}><HomePage /></ProtectedRoute>} />
      <Route path={ROUTES.products} element={<ProtectedRoute roles={[ROLES.buyer, ROLES.admin, ROLES.seller]}><ProductListPage /></ProtectedRoute>} />
      <Route path={ROUTES.productDetails} element={<ProtectedRoute roles={[ROLES.buyer, ROLES.admin, ROLES.seller]}><ProductDetailsPage /></ProtectedRoute>} />
      <Route path={ROUTES.sellerProfile} element={<ProtectedRoute roles={[ROLES.buyer, ROLES.admin, ROLES.seller]}><SellerProfilePage /></ProtectedRoute>} />
      <Route path={ROUTES.chat} element={<ProtectedRoute roles={[ROLES.buyer, ROLES.seller, ROLES.admin]}><ChatPage /></ProtectedRoute>} />
      <Route path={ROUTES.chatDetail} element={<ProtectedRoute roles={[ROLES.buyer, ROLES.seller, ROLES.admin]}><ChatPage /></ProtectedRoute>} />
      <Route path={ROUTES.profile} element={<ProtectedRoute roles={[ROLES.buyer, ROLES.seller, ROLES.admin]}><ProfilePage /></ProtectedRoute>} />
      <Route path={ROUTES.sellerDashboard} element={<ProtectedRoute roles={[ROLES.seller]}><SellerDashboardPage /></ProtectedRoute>} />
      <Route path={ROUTES.sellerProducts} element={<ProtectedRoute roles={[ROLES.seller]}><SellerProductsPage /></ProtectedRoute>} />
      <Route path={ROUTES.addProduct} element={<ProtectedRoute roles={[ROLES.seller]}><AddProductPage /></ProtectedRoute>} />
      <Route path={ROUTES.editProduct} element={<ProtectedRoute roles={[ROLES.seller]}><EditProductPage /></ProtectedRoute>} />
      <Route path={ROUTES.storeSettings} element={<ProtectedRoute roles={[ROLES.seller]}><StoreSettingsPage /></ProtectedRoute>} />
      <Route path={ROUTES.sellerChats} element={<ProtectedRoute roles={[ROLES.seller]}><SellerChatsPage /></ProtectedRoute>} />
      <Route path={ROUTES.adminDashboard} element={<ProtectedRoute roles={[ROLES.admin]}><AdminDashboardPage /></ProtectedRoute>} />
      <Route path={ROUTES.sellerApprovals} element={<ProtectedRoute roles={[ROLES.admin]}><SellerApprovalsPage /></ProtectedRoute>} />
      <Route path={ROUTES.productModeration} element={<ProtectedRoute roles={[ROLES.admin]}><ProductModerationPage /></ProtectedRoute>} />
      <Route path={ROUTES.userManagement} element={<ProtectedRoute roles={[ROLES.admin]}><UserManagementPage /></ProtectedRoute>} />
      <Route path={ROUTES.notFound} element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to={ROUTES.notFound} replace />} />
    </Routes>
  )
}

export default AppRoutes
