/**
 * Button
 *
 * A reusable button component with Tailwind styling.
 */

function Button({ children, type = 'button', className = '', onClick, disabled = false }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
