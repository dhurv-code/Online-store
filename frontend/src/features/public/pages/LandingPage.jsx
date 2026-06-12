/**
 * LandingPage
 *
 * Public homepage for fresh visitors.
 */

import { Link } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import Button from '../../../components/Button'

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-lg sm:p-12">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">Dehradun Hyperlocal Marketplace</p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Find local sellers, message instantly, and grow your store.</h1>
            <p className="max-w-2xl text-lg text-slate-600">A simple marketplace for Dehradun buyers and sellers. Use authenticated browsing, seller stores, and real-time chat without any custom backend.</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to={ROUTES.register}><Button className="w-full sm:w-auto">Create Account</Button></Link>
            <Link to={ROUTES.login} className="w-full sm:w-auto"><Button className="bg-gray-900">Login</Button></Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Browse products</h2>
            <p className="mt-3 text-sm text-slate-600">Search across local categories and discover sellers in Dehradun.</p>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Contact sellers</h2>
            <p className="mt-3 text-sm text-slate-600">Open a chat with a seller directly from product details.</p>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Seller approvals</h2>
            <p className="mt-3 text-sm text-slate-600">Sellers are reviewed by admin before products go live.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
