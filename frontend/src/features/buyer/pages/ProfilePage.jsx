/**
 * ProfilePage
 *
 * Buyer and seller account profile management.
 */

import { useState } from 'react'
import PageLayout from '../../../components/PageLayout'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import { useAuth } from '../../../context/AuthContext'
import { UserService } from '../../../services/UserService'
import { useToast } from '../../../context/ToastContext'

function ProfilePage() {
  const { user, setUser } = useAuth()
  const { addToast } = useToast()
  const [displayName, setDisplayName] = useState(user?.displayName || '')
  const [city, setCity] = useState(user?.city || 'Dehradun')
  const [loading, setLoading] = useState(false)

  async function handleSave(event) {
    event.preventDefault()
    setLoading(true)
    try {
      await UserService.updateUser(user.id, { displayName, city })
      setUser({ ...user, displayName, city })
      addToast('Profile updated.', 'success')
    } catch (err) {
      addToast('Unable to save profile.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout>
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Profile</h1>
          <p className="mt-2 text-sm text-slate-600">Manage your account details and city preference.</p>
          <form className="mt-8 space-y-5" onSubmit={handleSave}>
            <Input label="Full name" id="displayName" value={displayName} onChange={e => setDisplayName(e.target.value)} required />
            <Input label="City" id="city" value={city} onChange={e => setCity(e.target.value)} required />
            <div className="space-y-1 rounded-3xl border border-gray-100 bg-slate-50 p-5">
              <p className="text-sm text-slate-600">Account type: <span className="font-semibold text-slate-900">{user.role}</span></p>
              <p className="text-sm text-slate-600">Email: <span className="font-semibold text-slate-900">{user.email}</span></p>
            </div>
            <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save profile'}</Button>
          </form>
        </div>
      </div>
    </PageLayout>
  )
}

export default ProfilePage
