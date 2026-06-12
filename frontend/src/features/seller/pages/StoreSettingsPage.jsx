/**
 * StoreSettingsPage
 *
 * Allows the seller to update store details.
 */

import { useEffect, useState } from 'react'
import PageLayout from '../../../components/PageLayout'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Textarea from '../../../components/Textarea'
import Loader from '../../../components/Loader'
import { useAuth } from '../../../context/AuthContext'
import { StoreService } from '../services/StoreService'
import { useToast } from '../../../context/ToastContext'

function StoreSettingsPage() {
  const { user } = useAuth()
  const { addToast } = useToast()
  const [store, setStore] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [area, setArea] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const currentStore = await StoreService.getStoreBySellerId(user.id)
      if (currentStore) {
        setStore(currentStore)
        setName(currentStore.name)
        setDescription(currentStore.description)
        setArea(currentStore.location?.area || '')
        setPhone(currentStore.contactInfo?.phone || '')
      }
      setLoading(false)
    }
    load()
  }, [user.id])

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    try {
      if (!store) {
        const newStore = {
          id: crypto.randomUUID(),
          sellerId: user.id,
          name,
          description,
          slug: name.toLowerCase().replace(/\s+/g, '-'),
          approved: false,
          location: { city: 'Dehradun', area },
          contactInfo: { phone, email: user.email },
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        await StoreService.createStore(newStore)
        setStore(newStore)
        addToast('Store created. Awaiting admin approval.', 'success')
      } else {
        await StoreService.updateStore(store.id, {
          name,
          description,
          location: { city: 'Dehradun', area },
          contactInfo: { phone, email: user.email },
        })
        addToast('Store updated.', 'success')
      }
    } catch (err) {
      addToast('Unable to update store.', 'error')
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
        <h1 className="text-2xl font-semibold text-slate-900">Store settings</h1>
        <p className="mt-2 text-sm text-slate-600">Manage your store name, description, and contact information.</p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <Input label="Store name" id="name" value={name} onChange={e => setName(e.target.value)} required />
          <Input label="Local area" id="area" value={area} onChange={e => setArea(e.target.value)} required />
          <Input label="Contact phone" id="phone" value={phone} onChange={e => setPhone(e.target.value)} required />
          <Textarea label="Description" id="description" value={description} onChange={e => setDescription(e.target.value)} required />
          <Button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Save store'}</Button>
        </form>
      </div>
    </PageLayout>
  )
}

export default StoreSettingsPage
