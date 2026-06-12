/**
 * RegisterPage
 *
 * Handles fresh account creation for buyers and sellers.
 */

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { ROUTES } from '../../../constants/routes'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import { useToast } from '../../../context/ToastContext'

function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const { addToast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accountType, setAccountType] = useState('buyer')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    try {
      await register({ name, email, password, accountType })
      addToast('Account created. Welcome!', 'success')
      navigate(ROUTES.home)
    } catch (error) {
      addToast('Unable to register. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-slate-900">Register</h1>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <Input label="Full name" id="name" value={name} onChange={e => setName(e.target.value)} required />
          <Input label="Email" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <Input label="Password" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <div>
            <p className="text-sm font-medium text-gray-700">Account type</p>
            <div className="mt-3 flex gap-3">
              <label className={`cursor-pointer rounded-2xl border px-4 py-3 ${accountType === 'buyer' ? 'border-brand-500 bg-brand-50' : 'border-gray-200 bg-white'}`}>
                <input type="radio" name="accountType" value="buyer" checked={accountType === 'buyer'} onChange={() => setAccountType('buyer')} className="sr-only" />
                Buyer
              </label>
              <label className={`cursor-pointer rounded-2xl border px-4 py-3 ${accountType === 'seller' ? 'border-brand-500 bg-brand-50' : 'border-gray-200 bg-white'}`}>
                <input type="radio" name="accountType" value="seller" checked={accountType === 'seller'} onChange={() => setAccountType('seller')} className="sr-only" />
                Seller
              </label>
            </div>
          </div>
          <Button type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Register'}</Button>
        </form>
        <p className="mt-6 text-sm text-slate-600">Already registered? <Link to={ROUTES.login} className="font-semibold text-brand-600">Login</Link></p>
      </div>
    </div>
  )
}

export default RegisterPage
