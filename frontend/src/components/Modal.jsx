/**
 * Modal
 *
 * Reusable modal dialog container.
 */

function Modal({ open, title, children, onClose }) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <button onClick={onClose} className="rounded-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">Close</button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
