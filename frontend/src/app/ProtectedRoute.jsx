/**
 * ProtectedRoute
 *
 * Handles route protection by validating the current user role.
 *
 * Responsibilities:
 * - Redirect unauthenticated users to login
 * - Redirect unauthorized users to unauthorized page
 * - Allow allowed roles to access protected content
 */

import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ROUTES } from '../constants/routes'

function ProtectedRoute({ children, roles = [] }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return <Navigate to={ROUTES.login} state={{ from: location }} replace />
  }

  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to={ROUTES.unauthorized} replace />
  }

  return children
}

export default ProtectedRoute
