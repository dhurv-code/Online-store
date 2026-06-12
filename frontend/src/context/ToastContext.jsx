/**
 * ToastContext
 *
 * Provides simple toast notifications across the application.
 *
 * Responsibilities:
 * - Expose addToast method
 * - Render toast messages
 */

import { createContext, useContext, useMemo, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'info') => {
    const id = Date.now().toString()
    setToasts(current => [...current, { id, message, type }])
    setTimeout(() => {
      setToasts(current => current.filter(toast => toast.id !== id))
    }, 4500)
  }

  const value = useMemo(() => ({ addToast }), [])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-3">
        {toasts.map(toast => (
          <div key={toast.id} className={`max-w-xs rounded-xl px-4 py-3 shadow-lg text-white ${toast.type === 'error' ? 'bg-red-500' : toast.type === 'success' ? 'bg-green-500' : 'bg-brand-600'}`}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
