/**
 * SellerDashboardPage
 *
 * Displays seller metrics and quick actions.
 */

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../../../components/PageLayout'
import { useAuth } from '../../../context/AuthContext'
import { ProductService } from '../../products/services/ProductService'
import { StoreService } from '../../store/services/StoreService'
import { ROUTES } from '../../../constants/routes'
import Button from '../../../components/Button'
import Loader from '../../../components/Loader'

function SellerDashboardPage() {
  const { user } = useAuth()
  const [productCount, setProductCount] = useState(0)
  const [store, setStore] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const products = await ProductService.listSellerProducts(user.id)
      const currentStore = await StoreService.getStoreBySellerId(user.id)
      setProductCount(products.length)
      setStore(currentStore)
      setLoading(false)
    }
    load()
  }, [user.id])

  return (
    <PageLayout>
      {loading ? <Loader /> : (
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-semibold text-slate-900">Seller dashboard</h1>
            <p className="mt-2 text-sm text-slate-600">Manage your store, products, and customer chats.</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6">
                <p className="text-sm text-slate-500">Store status</p>
                <p className="mt-3 text-2xl font-bold text-slate-900">{store?.approved ? 'Approved' : 'Pending'}</p>
              </div>
              <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6">
                <p className="text-sm text-slate-500">Products</p>
                <p className="mt-3 text-2xl font-bold text-slate-900">{productCount}</p>
              </div>
              <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6">
                <p className="text-sm text-slate-500">Role</p>
                <p className="mt-3 text-2xl font-bold text-slate-900">{user.role}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Link to={ROUTES.sellerProducts} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:border-brand-500">
              <h2 className="text-lg font-semibold text-slate-900">Product management</h2>
              <p className="mt-2 text-sm text-slate-600">Create, edit, and remove your product listings.</p>
            </Link>
            <Link to={ROUTES.sellerChats} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:border-brand-500">
              <h2 className="text-lg font-semibold text-slate-900">Buyer chats</h2>
              <p className="mt-2 text-sm text-slate-600">Respond to buyer messages and follow up quickly.</p>
            </Link>
            <Link to={ROUTES.storeSettings} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:border-brand-500">
              <h2 className="text-lg font-semibold text-slate-900">Store settings</h2>
              <p className="mt-2 text-sm text-slate-600">Update store profile, contact info, and description.</p>
            </Link>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick actions</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button as="link" className="bg-brand-600" onClick={() => window.location.assign(ROUTES.addProduct)}>Add new product</Button>
              <Button as="link" className="bg-slate-900" onClick={() => window.location.assign(ROUTES.sellerProducts)}>Manage products</Button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  )
}

export default SellerDashboardPage
