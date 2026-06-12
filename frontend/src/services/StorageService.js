/**
 * StorageService
 *
 * Handles Firebase Storage image uploads.
 *
 * Responsibilities:
 * - Upload files to storage paths
 * - Return downloadable URLs
 */

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase/firebaseClient'

export const StorageService = {
  async uploadFile(path, file) {
    const storageRef = ref(storage, path)
    await uploadBytes(storageRef, file)
    return getDownloadURL(storageRef)
  },
}
