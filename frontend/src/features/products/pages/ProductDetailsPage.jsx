/**
 * ProductDetailsPage
 *
 * Shows detailed product information and contact seller action.
 */

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PageLayout from '../../../components/PageLayout'
import Button from '../../../components/Button'
import Loader from '../../../components/Loader'
import EmptyState from '../../../components/EmptyState'
import { ProductService } from '../services/ProductService'
import { StoreService } from '../../store/services/StoreService'
import { SellerService } from '../../seller/services/SellerService'
import { ChatService } from '../../chat/services/ChatService'
import { useAuth } from '../../../context/AuthContext'
import { ROUTES } from '../../../constants/routes'

function ProductDetailsPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [product, setProduct] = useState(null)
  const [store, setStore] = useState(null)
  const [seller, setSeller] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const item = await ProductService.getProductById(productId)
        if (!item) {
          setError('Product not found.')
          setLoading(false)
          return
        }
        setProduct(item)
        const sellerProfile = await SellerService.getSellerById(item.sellerId)
        setSeller(sellerProfile)
        if (item.storeId) {
          const storeProfile = await StoreService.getStoreById(item.storeId)
          setStore(storeProfile)
        }
      } catch (err) {
        setError('Unable to load product.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [productId])

  async function handleContactSeller() {
    if (!user) {
      navigate(ROUTES.login)
      return
    }
    if (!seller) {
      setError('Seller information unavailable.')
      return
    }
    const existing = await ChatService.findConversation(user.id, seller.id, product.id)
    if (existing) {
      navigate(`/chat/${existing.id}`)
      return
    }
    const conversationId = crypto.randomUUID()
    await ChatService.createConversation({
      id: conversationId,
      buyerId: user.id,
      sellerId: seller.id,
      productId: product.id,
      storeId: product.storeId,
      productName: product.name,
      participants: [user.id, seller.id],
      lastMessage: '',
      lastMessageAt: new Date(),
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    navigate(`/chat/${conversationId}`)
  }

  if (loading) {
    return <PageLayout><Loader /></PageLayout>
  }

  if (error) {
    return <PageLayout><EmptyState title="Error" description={error} /></PageLayout>
  }

  return (
    <PageLayout>
      <div className="grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="overflow-hidden rounded-3xl bg-slate-100">
            <img src={product.images?.[0] || 'https://via.placeholder.com/800x520'} alt={product.name} className="h-[360px] w-full object-cover" />
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">{product.category}</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">{product.name}</h1>
            </div>
            <div className="flex items-center justify-between gap-4 border-y border-gray-200 py-4 text-sm text-slate-700">
              <span className="font-semibold">Price:</span>
              <span className="text-2xl font-bold">₹{product.price}</span>
            </div>
            <div className="space-y-3 text-sm text-slate-600">
              <p>{product.description}</p>
              <p><span className="font-semibold text-slate-900">Availability</span>: {product.available ? 'In stock' : 'Unavailable'}</p>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Seller</h2>
            <p className="mt-3 text-sm text-slate-600">{seller?.businessName || 'Seller store'}</p>
            <p className="text-sm text-slate-600">Status: {seller?.status}</p>
            <div className="mt-6">
              <Button onClick={handleContactSeller} disabled={!product.available}>Contact Seller</Button>
            </div>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Store information</h3>
            <p className="mt-3 text-sm text-slate-600">{store?.description || 'No store description available.'}</p>
          </div>
        </aside>
      </div>
    </PageLayout>
  )
}

export default ProductDetailsPage
