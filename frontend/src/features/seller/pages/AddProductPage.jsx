/**
 * AddProductPage
 *
 * Allows a seller to add a new product to their store.
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PageLayout from '../../../components/PageLayout'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Textarea from '../../../components/Textarea'
import Loader from '../../../components/Loader'
import { useAuth } from '../../../context/AuthContext'
import { ProductService } from '../../products/services/ProductService'
import { StoreService } from '../../store/services/StoreService'
import { StorageService } from '../../../services/StorageService'
import { useToast } from '../../../context/ToastContext'

function AddProductPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addToast } = useToast()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('General')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [store, setStore] = useState(null)

  useEffect(() => {
    async function loadStore() {
      const sellerStore = await StoreService.getStoreBySellerId(user.id)
      setStore(sellerStore)
    }
    loadStore()
  }, [user.id])

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    try {
      const productId = crypto.randomUUID()
      const imageUrl = imageFile ? await StorageService.uploadFile(`products/${user.id}/${productId}`, imageFile) : ''
      await ProductService.createProduct({
        id: productId,
        sellerId: user.id,
        storeId: store?.id || '',
        name,
        price: Number(price),
        category,
        description,
        images: imageUrl ? [imageUrl] : [],
        available: true,
        approved: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      addToast('Product created. Awaiting admin approval.', 'success')
      navigate('/seller/products')
    } catch (err) {
      addToast('Unable to create product.', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (!store) {
    return <PageLayout><Loader /></PageLayout>
  }

  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Add product</h1>
        <p className="mt-2 text-sm text-slate-600">Add a new product listing for your store.</p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <Input label="Product name" id="name" value={name} onChange={e => setName(e.target.value)} required />
          <Input label="Price" id="price" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
          <Input label="Category" id="category" value={category} onChange={e => setCategory(e.target.value)} required />
          <Textarea label="Description" id="description" value={description} onChange={e => setDescription(e.target.value)} required />
          <div>
            <label className="block text-sm font-medium text-gray-700">Product image</label>
            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="mt-2 w-full text-sm text-slate-700" />
          </div>
          <Button type="submit" disabled={loading}>{loading ? 'Saving product...' : 'Create product'}</Button>
        </form>
      </div>
    </PageLayout>
  )
}

export default AddProductPage
