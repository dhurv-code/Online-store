/**
 * AuthContext
 *
 * Responsible for managing authentication state and user role context.
 *
 * Responsibilities:
 * - Observe Firebase auth state
 * - Load Firestore user profile
 * - Provide login, register, and logout actions
 */

import { createContext, useContext, useEffect, useState } from 'react'
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase/firebaseClient'
import { UserService } from '../services/UserService'
import { ROLES } from '../constants/roles'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      if (!currentUser) {
        setAuthUser(null)
        setUser(null)
        setLoading(false)
        return
      }

      setAuthUser(currentUser)
      const profile = await UserService.getUserById(currentUser.uid)
      setUser(profile)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  async function register({ name, email, password, accountType }) {
    setError(null)
    setLoading(true)
    const credentials = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(credentials.user, {
      displayName: name,
    })

    const role = accountType === 'seller' ? ROLES.pendingSeller : ROLES.buyer
    await UserService.createUser({
      id: credentials.user.uid,
      displayName: name,
      email,
      role,
      city: 'Dehradun',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    setAuthUser(credentials.user)
    setUser({
      id: credentials.user.uid,
      displayName: name,
      email,
      role,
      city: 'Dehradun',
    })
    setLoading(false)
    return credentials.user
  }

  async function login({ email, password }) {
    setError(null)
    setLoading(true)
    const credentials = await signInWithEmailAndPassword(auth, email, password)
    const profile = await UserService.getUserById(credentials.user.uid)
    setAuthUser(credentials.user)
    setUser(profile)
    setLoading(false)
    return credentials.user
  }

  async function logout() {
    setError(null)
    setLoading(true)
    await signOut(auth)
    setAuthUser(null)
    setUser(null)
    setLoading(false)
  }

  const value = {
    authUser,
    user,
    loading,
    error,
    register,
    login,
    logout,
    setError,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
