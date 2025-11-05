'use client'

export default function IdeasError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container py-24 text-center">
      <h2 className="text-2xl font-semibold mb-4">Error loading ideas</h2>
      <p className="text-neutral-400 mb-6">{error.message || 'Something went wrong'}</p>
      <div className="space-x-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded transition-colors"
        >
          Try again
        </button>
        <a
          href="/"
          className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded transition-colors inline-block"
        >
          Go home
        </a>
      </div>
    </div>
  )
}

