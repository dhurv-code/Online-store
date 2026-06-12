/**
 * SellerService
 *
 * Handles Firestore operations for seller profiles and approval workflows.
 *
 * Responsibilities:
 * - Create seller applications
 * - Retrieve seller details
 * - Update seller status
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

export const SellerService = {
  async createSellerProfile(seller) {
    await setDoc(doc(db, COLLECTIONS.sellers, seller.id), seller)
  },

  async getSellerById(sellerId) {
    const snapshot = await getDoc(doc(db, COLLECTIONS.sellers, sellerId))
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
  },

  async updateSeller(sellerId, updates) {
    await updateDoc(doc(db, COLLECTIONS.sellers, sellerId), {
      ...updates,
      updatedAt: new Date(),
    })
  },

  async listPendingSellers() {
    const q = query(collection(db, COLLECTIONS.sellers), where('status', '==', 'pending'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  async listAllSellers() {
    const snapshot = await getDocs(collection(db, COLLECTIONS.sellers))
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },
}
