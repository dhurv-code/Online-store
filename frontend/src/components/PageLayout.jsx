/**
 * PageLayout
 *
 * Wraps page content with navigation and page container.
 */

import Navbar from './Navbar'

function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}

export default PageLayout
