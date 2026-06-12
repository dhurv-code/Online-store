/**
 * Input
 *
 * Reusable input field component.
 */

function Input({ label, id, type = 'text', value, onChange, placeholder, className = '', ...props }) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {label}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${className}`}
        {...props}
      />
    </label>
  )
}

export default Input
