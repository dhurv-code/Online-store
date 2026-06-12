/**
 * Sidebar
 *
 * Simple sidebar navigation layout component.
 */

function Sidebar({ title, children }) {
  return (
    <aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <div className="mt-4 space-y-3">{children}</div>
    </aside>
  )
}

export default Sidebar
