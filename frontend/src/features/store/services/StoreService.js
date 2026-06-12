/**
 * StoreService
 *
 * Handles Firestore operations for seller stores.
 *
 * Responsibilities:
 * - Create store data
 * - Retrieve store information
 * - Update store settings
 */

import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { db } from '../../../firebase/firebaseClient'
import { COLLECTIONS } from '../../../constants/collections'

export const StoreService = {
  async createStore(store) {
    await setDoc(doc(db, COLLECTIONS.stores, store.id), store)
  },

  async getStoreById(storeId) {
    const snapshot = await getDoc(doc(db, COLLECTIONS.stores, storeId))
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
  },

  async getStoreBySellerId(sellerId) {
    const q = query(collection(db, COLLECTIONS.stores), where('sellerId', '==', sellerId))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0] || null
  },

  async updateStore(storeId, updates) {
    await updateDoc(doc(db, COLLECTIONS.stores, storeId), {
      ...updates,
      updatedAt: new Date(),
    })
  },

  async listApprovedStores() {
    const q = query(collection(db, COLLECTIONS.stores), where('approved', '==', true))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },
}
