/**
 * SellerApprovalsPage
 *
 * Allows admins to review pending sellers.
 */

import { useEffect, useState } from 'react'
import PageLayout from '../../../components/PageLayout'
import Loader from '../../../components/Loader'
import EmptyState from '../../../components/EmptyState'
import Button from '../../../components/Button'
import { SellerService } from '../../seller/services/SellerService'
import { UserService } from '../../../services/UserService'

function SellerApprovalsPage() {
  const [sellers, setSellers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const pendingSellers = await SellerService.listPendingSellers()
      setSellers(pendingSellers)
      setLoading(false)
    }
    load()
  }, [])

  async function handleStatusChange(sellerId, userId, status) {
    await SellerService.updateSeller(sellerId, { status, updatedAt: new Date() })
    await UserService.updateUser(userId, { role: status === 'approved' ? 'seller' : 'buyer' })
    setSellers(current => current.filter(item => item.id !== sellerId))
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Seller approvals</h1>
          <p className="mt-2 text-sm text-slate-600">Review applications and approve local sellers.</p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          {loading ? <Loader /> : sellers.length ? (
            <div className="space-y-4">
              {sellers.map(seller => (
                <div key={seller.id} className="rounded-3xl border border-gray-100 bg-slate-50 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">{seller.businessName}</h2>
                      <p className="text-sm text-slate-600">{seller.address}</p>
                      <p className="text-sm text-slate-600">Status: {seller.status}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleStatusChange(seller.id, seller.userId, 'approved')}>Approve</Button>
                      <Button className="bg-red-500 hover:bg-red-600" onClick={() => handleStatusChange(seller.id, seller.userId, 'rejected')}>Reject</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : <EmptyState title="No pending sellers" description="All seller applications have been reviewed." />}
        </div>
      </div>
    </PageLayout>
  )
}

export default SellerApprovalsPage
