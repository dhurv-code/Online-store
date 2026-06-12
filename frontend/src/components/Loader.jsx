/**
 * Loader
 *
 * Displays a centered loading state.
 */

function Loader() {
  return (
    <div className="flex min-h-[240px] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
    </div>
  )
}

export default Loader
