'use client'

import Link from 'next/link'
import { useEffect } from 'react'

// Error Page Component
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md mx-auto text-center px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 font-bold break-words" style={{ fontFamily: 'Courier New, monospace' }}>
          Something went wrong
        </h1>

        <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base" style={{ fontFamily: 'Courier New, monospace' }}>
          An error occurred while loading this page.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            href="/"
            className="bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 border border-border transition-colors hover:opacity-90 text-sm sm:text-base rounded-md"
            style={{ fontFamily: 'Courier New, monospace' }}
          >
            Go Home
          </Link>
          <button
            onClick={reset}
            className="bg-secondary text-secondary-foreground px-4 sm:px-6 py-2 sm:py-3 border border-border transition-colors hover:opacity-90 text-sm sm:text-base rounded-md"
            style={{ fontFamily: 'Courier New, monospace' }}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}