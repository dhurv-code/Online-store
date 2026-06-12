/**
 * UnauthorizedPage
 *
 * Shown when the current user lacks page permissions.
 */

import { Link } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import Button from '../../../components/Button'

function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-24">
      <div className="mx-auto max-w-xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">Unauthorized</p>
        <h1 className="mt-5 text-3xl font-bold text-slate-900">Access denied</h1>
        <p className="mt-4 text-sm text-slate-600">You do not have permission to view this page. Contact support if you think this is an error.</p>
        <div className="mt-8">
          <Link to={ROUTES.home}><Button>Return home</Button></Link>
        </div>
      </div>
    </div>
  )
}

export default UnauthorizedPage
