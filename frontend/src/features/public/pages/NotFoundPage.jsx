/**
 * NotFoundPage
 *
 * Rendered for unmatched routes.
 */

import { Link } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import Button from '../../../components/Button'

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-24">
      <div className="mx-auto max-w-xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-lg">
        <h1 className="text-4xl font-bold text-slate-900">404</h1>
        <p className="mt-4 text-sm text-slate-600">Page not found. The page you tried to access does not exist.</p>
        <div className="mt-8"><Link to={ROUTES.home}><Button>Back to home</Button></Link></div>
      </div>
    </div>
  )
}

export default NotFoundPage
