/**
 * EditProductPage
 *
 * Allows sellers to edit existing products.
 */

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageLayout from '../../../components/PageLayout'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Textarea from '../../../components/Textarea'
import Loader from '../../../components/Loader'
import { ProductService } from '../../products/services/ProductService'
import { StorageService } from '../../../services/StorageService'
import { useToast } from '../../../context/ToastContext'

function EditProductPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [product, setProduct] = useState(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const productDetails = await ProductService.getProductById(productId)
      setProduct(productDetails)
      setName(productDetails.name)
      setPrice(productDetails.price)
      setCategory(productDetails.category)
      setDescription(productDetails.description)
      setLoading(false)
    }
    load()
  }, [productId])

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    try {
      const updates = { name, price: Number(price), category, description, updatedAt: new Date() }
      if (imageFile) {
        const imageUrl = await StorageService.uploadFile(`products/${product.sellerId}/${product.id}`, imageFile)
        updates.images = [imageUrl]
      }
      await ProductService.updateProduct(product.id, updates)
      addToast('Product updated.', 'success')
      navigate('/seller/products')
    } catch (err) {
      addToast('Unable to save changes.', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <PageLayout><Loader /></PageLayout>
  }

  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Edit product</h1>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <Input label="Product name" id="name" value={name} onChange={e => setName(e.target.value)} required />
          <Input label="Price" id="price" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
          <Input label="Category" id="category" value={category} onChange={e => setCategory(e.target.value)} required />
          <Textarea label="Description" id="description" value={description} onChange={e => setDescription(e.target.value)} required />
          <div>
            <label className="block text-sm font-medium text-gray-700">Replace image</label>
            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="mt-2 w-full text-sm text-slate-700" />
          </div>
          <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save changes'}</Button>
        </form>
      </div>
    </PageLayout>
  )
}

export default EditProductPage
