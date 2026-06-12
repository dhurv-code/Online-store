/**
 * SellerProductsPage
 *
 * Seller view for managing owned products.
 */

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../../../components/PageLayout'
import Loader from '../../../components/Loader'
import EmptyState from '../../../components/EmptyState'
import { useAuth } from '../../../context/AuthContext'
import { ProductService } from '../../products/services/ProductService'
import { ROUTES } from '../../../constants/routes'
import Button from '../../../components/Button'

function SellerProductsPage() {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const sellerProducts = await ProductService.listSellerProducts(user.id)
      setProducts(sellerProducts)
      setLoading(false)
    }
    load()
  }, [user.id])

  async function handleDelete(productId) {
    await ProductService.deleteProduct(productId)
    setProducts(current => current.filter(product => product.id !== productId))
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Your products</h1>
            <p className="mt-2 text-sm text-slate-600">Edit or remove listings that belong to your store.</p>
          </div>
          <Link to={ROUTES.addProduct}><Button>Add product</Button></Link>
        </div>

        {loading ? <Loader /> : products.length ? (
          <div className="space-y-4">
            {products.map(product => (
              <div key={product.id} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{product.name}</h2>
                    <p className="mt-1 text-sm text-slate-600">₹{product.price} • {product.category}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link to={ROUTES.editProduct.replace(':productId', product.id)}><Button>Edit</Button></Link>
                    <Button className="bg-red-500 hover:bg-red-600" onClick={() => handleDelete(product.id)}>Delete</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : <EmptyState title="No products yet" description="Create your first product to appear in the marketplace." />}
      </div>
    </PageLayout>
  )
}

export default SellerProductsPage
