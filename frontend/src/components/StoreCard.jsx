/**
 * StoreCard
 *
 * Displays a seller store summary card.
 */

import { Link } from 'react-router-dom'

function StoreCard({ store, sellerId }) {
  return (
    <Link to={`/seller/${sellerId}`} className="block overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="bg-slate-100 px-5 py-6">
        <h3 className="text-xl font-semibold text-slate-900">{store.name}</h3>
        <p className="mt-2 text-sm text-slate-600">{store.location?.area || 'Dehradun'}</p>
      </div>
      <div className="space-y-2 p-5">
        <p className="text-sm text-slate-600">{store.description}</p>
      </div>
    </Link>
  )
}

export default StoreCard
