/**
 * SellerProfilePage
 *
 * Displays seller store and approved products.
 */

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageLayout from '../../../components/PageLayout'
import EmptyState from '../../../components/EmptyState'
import Loader from '../../../components/Loader'
import ProductCard from '../../products/components/ProductCard'
import { SellerService } from '../../seller/services/SellerService'
import { StoreService } from '../services/StoreService'
import { ProductService } from '../../products/services/ProductService'

function SellerProfilePage() {
  const { sellerId } = useParams()
  const [seller, setSeller] = useState(null)
  const [store, setStore] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const sellerProfile = await SellerService.getSellerById(sellerId)
      setSeller(sellerProfile)
      const storeProfile = await StoreService.getStoreBySellerId(sellerId)
      setStore(storeProfile)
      if (storeProfile) {
        const storeProducts = await ProductService.listProductsByStore(storeProfile.id)
        setProducts(storeProducts)
      }
      setLoading(false)
    }
    load()
  }, [sellerId])

  if (loading) {
    return <PageLayout><Loader /></PageLayout>
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">{store?.name || seller?.businessName || 'Seller store'}</h1>
          <p className="mt-3 text-sm text-slate-600">{store?.description || 'Local seller in Dehradun.'}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Seller status</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{seller?.status}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Location</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{store?.location?.area || 'Dehradun'}</p>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">Products</h2>
          <div className="mt-5">{products.length ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{products.map(product => <ProductCard key={product.id} product={product} />)}</div>
          ) : <EmptyState title="No products available" description="This seller has not published any products yet." />}</div>
        </section>
      </div>
    </PageLayout>
  )
}

export default SellerProfilePage
