/**
 * ProductService
 *
 * Handles Firestore operations for product catalog.
 *
 * Responsibilities:
 * - Create, update, delete products
 * - List products and product details
 */

import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  getDocs,
} from 'firebase/firestore'
import { db } from '../../../firebase/firebaseClient'
import { COLLECTIONS } from '../../../constants/collections'

export const ProductService = {
  async createProduct(product) {
    await setDoc(doc(db, COLLECTIONS.products, product.id), product)
  },

  async getProductById(productId) {
    const snapshot = await getDoc(doc(db, COLLECTIONS.products, productId))
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
  },

  async updateProduct(productId, updates) {
    await updateDoc(doc(db, COLLECTIONS.products, productId), {
      ...updates,
      updatedAt: new Date(),
    })
  },

  async deleteProduct(productId) {
    await deleteDoc(doc(db, COLLECTIONS.products, productId))
  },

  async listApprovedProducts() {
    const q = query(collection(db, COLLECTIONS.products), where('approved', '==', true), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  async listProductsByStore(storeId) {
    const q = query(collection(db, COLLECTIONS.products), where('storeId', '==', storeId), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  async listSellerProducts(sellerId) {
    const q = query(collection(db, COLLECTIONS.products), where('sellerId', '==', sellerId), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  async searchProducts(term) {
    const lowerTerm = term.toLowerCase()
    const products = await this.listApprovedProducts()
    return products.filter(product => product.name.toLowerCase().includes(lowerTerm) || product.category.toLowerCase().includes(lowerTerm))
  },
}
