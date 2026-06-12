/**
 * LoginPage
 *
 * Handles user authentication with email and password.
 */

import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { ROUTES } from '../../../constants/routes'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import { useToast } from '../../../context/ToastContext'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const { addToast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const from = location.state?.from?.pathname || ROUTES.home

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    try {
      await login({ email, password })
      navigate(from, { replace: true })
      addToast('Welcome back!', 'success')
    } catch (error) {
      addToast('Unable to login. Please check credentials.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <Input label="Email" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <Input label="Password" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <Button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</Button>
        </form>
        <p className="mt-6 text-sm text-slate-600">Don't have an account? <Link to={ROUTES.register} className="font-semibold text-brand-600">Register</Link></p>
      </div>
    </div>
  )
}

export default LoginPage
