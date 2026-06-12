/**
 * ProductListPage
 *
 * Display of all approved products for buyers.
 */

import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { ProductService } from '../services/ProductService'
import Loader from '../../../components/Loader'
import EmptyState from '../../../components/EmptyState'
import PageLayout from '../../../components/PageLayout'
import Input from '../../../components/Input'

function ProductListPage() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const result = await ProductService.listApprovedProducts()
      setProducts(result)
      setLoading(false)
    }
    load()
  }, [])

  async function handleSearch(event) {
    const term = event.target.value
    setSearch(term)
    if (!term.trim()) {
      const result = await ProductService.listApprovedProducts()
      setProducts(result)
      return
    }
    const result = await ProductService.searchProducts(term)
    setProducts(result)
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Browse products</h1>
          <p className="mt-2 text-sm text-slate-600">Search across local sellers and view product details.</p>
          <div className="mt-5 max-w-md"><Input label="Search" id="search" value={search} onChange={handleSearch} placeholder="Enter name or category" /></div>
        </div>

        {loading ? <Loader /> : products.length ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{products.map(product => <ProductCard key={product.id} product={product} />)}</div>
        ) : <EmptyState title="No products yet" description="No approved products are available right now." />}
      </div>
    </PageLayout>
  )
}

export default ProductListPage
