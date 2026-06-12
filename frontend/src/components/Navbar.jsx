/**
 * Navbar
 *
 * Primary navigation for buyers, sellers, and admins.
 */

import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ROUTES } from '../constants/routes'

function Navbar() {
  const location = useLocation()
  const { user, logout } = useAuth()

  const activeClass = path => path === location.pathname ? 'text-brand-800 font-semibold' : 'text-gray-700'

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to={ROUTES.home} className="text-lg font-bold text-brand-700">Dehradun Market</Link>
        <nav className="flex items-center gap-4">
          <Link className={activeClass(ROUTES.home)} to={ROUTES.home}>Home</Link>
          <Link className={activeClass(ROUTES.products)} to={ROUTES.products}>Products</Link>
          {user?.role === 'seller' && <Link className={activeClass(ROUTES.sellerDashboard)} to={ROUTES.sellerDashboard}>Dashboard</Link>}
          {user?.role === 'admin' && <Link className={activeClass(ROUTES.adminDashboard)} to={ROUTES.adminDashboard}>Admin</Link>}
          {user ? (
            <button onClick={logout} className="rounded-full px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100">Logout</button>
          ) : (
            <Link className="rounded-full bg-brand-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-700" to={ROUTES.login}>Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
