/**
 * ProductModerationPage
 *
 * Admin interface for managing product listings.
 */

import { useEffect, useState } from 'react'
import PageLayout from '../../../components/PageLayout'
import Loader from '../../../components/Loader'
import EmptyState from '../../../components/EmptyState'
import Button from '../../../components/Button'
import { ProductService } from '../../products/services/ProductService'

function ProductModerationPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const allProducts = await ProductService.listApprovedProducts()
      setProducts(allProducts)
      setLoading(false)
    }
    load()
  }, [])

  async function handleDelete(productId) {
    await ProductService.deleteProduct(productId)
    setProducts(current => current.filter(product => product.id !== productId))
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Product moderation</h1>
          <p className="mt-2 text-sm text-slate-600">Remove inappropriate or outdated product listings.</p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          {loading ? <Loader /> : products.length ? (
            <div className="space-y-4">
              {products.map(product => (
                <div key={product.id} className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{product.name}</h2>
                    <p className="text-sm text-slate-600">₹{product.price} • {product.category}</p>
                  </div>
                  <Button className="bg-red-500 hover:bg-red-600" onClick={() => handleDelete(product.id)}>Delete</Button>
                </div>
              ))}
            </div>
          ) : <EmptyState title="No products" description="No approved products available for moderation." />}
        </div>
      </div>
    </PageLayout>
  )
}

export default ProductModerationPage
