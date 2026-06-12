/**
 * ProductCard
 *
 * Displays a product preview in listing pages.
 */

import { Link } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="group block overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="h-52 overflow-hidden bg-slate-100">
        <img src={product.images?.[0] || 'https://via.placeholder.com/400x300'} alt={product.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
      </div>
      <div className="space-y-3 p-5">
        <div>
          <p className="text-sm font-semibold text-brand-600">{product.category}</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">{product.name}</h3>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">₹{product.price}</span>
          <span className="text-sm text-slate-500">{product.available ? 'Available' : 'Unavailable'}</span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
