/**
 * UserService
 *
 * Handles all Firestore operations related to users.
 *
 * Responsibilities:
 * - Create user profiles
 * - Read user documents
 * - Update user profile data
 */

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
} from 'firebase/firestore'
import { db } from '../firebase/firebaseClient'
import { COLLECTIONS } from '../constants/collections'

export const UserService = {
  async createUser(user) {
    await setDoc(doc(db, COLLECTIONS.users, user.id), user)
  },

  async getUserById(userId) {
    const snapshot = await getDoc(doc(db, COLLECTIONS.users, userId))
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
  },

  async updateUser(userId, updates) {
    await updateDoc(doc(db, COLLECTIONS.users, userId), {
      ...updates,
      updatedAt: new Date(),
    })
  },

  async getAllUsers() {
    const snapshot = await getDocs(collection(db, COLLECTIONS.users))
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  async findUsersByRole(role) {
    const q = query(collection(db, COLLECTIONS.users), where('role', '==', role))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },
}
