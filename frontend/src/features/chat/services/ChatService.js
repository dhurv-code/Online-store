/**
 * ChatService
 *
 * Handles Firestore operations for conversations and messages.
 *
 * Responsibilities:
 * - Create and fetch conversations
 * - Send and fetch messages
 * - Keep messages real-time
 */

import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
  addDoc,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../../../firebase/firebaseClient'
import { COLLECTIONS } from '../../../constants/collections'

export const ChatService = {
  async createConversation(conversation) {
    await setDoc(doc(db, COLLECTIONS.conversations, conversation.id), conversation)
  },

  async getConversationById(conversationId) {
    const snapshot = await getDoc(doc(db, COLLECTIONS.conversations, conversationId))
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
  },

  async findConversation(buyerId, sellerId, productId) {
    const q = query(
      collection(db, COLLECTIONS.conversations),
      where('buyerId', '==', buyerId),
      where('sellerId', '==', sellerId),
      where('productId', '==', productId),
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.length ? { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } : null
  },

  async listConversationsForUser(userId) {
    const q = query(collection(db, COLLECTIONS.conversations), where('participants', 'array-contains', userId), orderBy('lastMessageAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  listenConversationsForUser(userId, callback) {
    const q = query(collection(db, COLLECTIONS.conversations), where('participants', 'array-contains', userId), orderBy('lastMessageAt', 'desc'))
    return onSnapshot(q, snapshot => callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))))
  },

  listenMessages(conversationId, callback) {
    const messagesCollection = collection(db, COLLECTIONS.conversations, conversationId, COLLECTIONS.messages)
    const q = query(messagesCollection, orderBy('createdAt', 'asc'))
    return onSnapshot(q, snapshot => callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))))
  },

  async sendMessage(conversationId, message) {
    const messagesCollection = collection(db, COLLECTIONS.conversations, conversationId, COLLECTIONS.messages)
    await addDoc(messagesCollection, {
      ...message,
      createdAt: serverTimestamp(),
    })
    await updateDoc(doc(db, COLLECTIONS.conversations, conversationId), {
      lastMessage: message.message,
      lastMessageAt: serverTimestamp(),
      updatedAt: new Date(),
    })
  },

  async listMessages(conversationId) {
    const messagesCollection = collection(db, COLLECTIONS.conversations, conversationId, COLLECTIONS.messages)
    const q = query(messagesCollection, orderBy('createdAt', 'asc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },
}
