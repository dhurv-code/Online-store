/**
 * HomePage
 *
 * Buyer dashboard showing featured products and search.
 */

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../../products/components/ProductCard'
import { ProductService } from '../../products/services/ProductService'
import { ROUTES } from '../../../constants/routes'
import Input from '../../../components/Input'
import Loader from '../../../components/Loader'
import EmptyState from '../../../components/EmptyState'
import PageLayout from '../../../components/PageLayout'

function HomePage() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      const result = await ProductService.listApprovedProducts()
      setProducts(result)
      setLoading(false)
    }

    loadProducts()
  }, [])

  async function handleSearch(event) {
    const term = event.target.value
    setSearch(term)
    if (!term.trim()) {
      const allProducts = await ProductService.listApprovedProducts()
      setProducts(allProducts)
      return
    }
    const results = await ProductService.searchProducts(term)
    setProducts(results)
  }

  return (
    <PageLayout>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <section className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-semibold text-slate-900">Discover top local products in Dehradun</h1>
            <p className="mt-2 text-sm text-slate-600">Search and contact sellers directly through the marketplace chat system.</p>
            <div className="mt-6 max-w-md">
              <Input label="Search products" id="product-search" value={search} onChange={handleSearch} placeholder="Search by name or category" />
            </div>
          </div>

          <div className="space-y-4">
            {loading ? <Loader /> : products.length ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map(product => <ProductCard key={product.id} product={product} />)}
              </div>
            ) : <EmptyState title="No products found" description="Try a different search term or check back later." />}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Quick actions</h2>
            <div className="mt-4 space-y-3">
              <Link className="block rounded-2xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white" to={ROUTES.products}>Browse all products</Link>
              <Link className="block rounded-2xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700" to={ROUTES.profile}>View profile</Link>
            </div>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Dehradun</h2>
            <p className="mt-3 text-sm text-slate-600">A local marketplace to validate seller interest and buyer demand without shipping or subscriptions.</p>
          </div>
        </aside>
      </div>
    </PageLayout>
  )
}

export default HomePage
