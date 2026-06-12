/**
 * EmptyState
 *
 * Renders a message when no data exists.
 */

function EmptyState({ title, description }) {
  return (
    <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <p className="mt-3 text-sm text-gray-600">{description}</p>
    </div>
  )
}

export default EmptyState
