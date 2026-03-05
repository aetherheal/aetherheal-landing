"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center px-6">
      <h1 className="font-serif text-2xl md:text-3xl text-brand-navy">
        Something went wrong
      </h1>
      <p className="text-text-body mt-2 text-center max-w-md">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={reset}
        className="mt-8 px-6 py-3 bg-brand-navy text-white font-medium rounded-md hover:bg-brand-navy/90 transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}
