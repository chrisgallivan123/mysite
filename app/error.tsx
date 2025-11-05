'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container py-24 text-center">
      <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
      <p className="text-neutral-400 mb-6">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded transition-colors"
      >
        Try again
      </button>
    </div>
  )
}

