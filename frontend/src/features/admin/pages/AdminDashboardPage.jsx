/**
 * AdminDashboardPage
 *
 * Shows admin metrics and quick links.
 */

import { Link } from 'react-router-dom'
import PageLayout from '../../../components/PageLayout'
import { ROUTES } from '../../../constants/routes'

function AdminDashboardPage() {
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Admin dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">Review seller applications, moderate products, and manage users.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          <Link to={ROUTES.sellerApprovals} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:border-brand-500">
            <h2 className="text-lg font-semibold text-slate-900">Seller approvals</h2>
            <p className="mt-2 text-sm text-slate-600">Approve or reject pending seller registrations.</p>
          </Link>
          <Link to={ROUTES.productModeration} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:border-brand-500">
            <h2 className="text-lg font-semibold text-slate-900">Product moderation</h2>
            <p className="mt-2 text-sm text-slate-600">Remove or manage product listings.</p>
          </Link>
          <Link to={ROUTES.userManagement} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:border-brand-500">
            <h2 className="text-lg font-semibold text-slate-900">User management</h2>
            <p className="mt-2 text-sm text-slate-600">Suspend users and control access.</p>
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}

export default AdminDashboardPage
