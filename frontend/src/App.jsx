import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import AppRoutes from './app/routes'

/**
 * App
 *
 * Root application component that sets up routing and authentication context.
 *
 * Responsibilities:
 * - Provide AuthContext
 * - Initialize client-side routing
 */

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  )
}

export default App
