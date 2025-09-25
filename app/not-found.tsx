import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-6 sm:mb-8">
          <div className="text-6xl sm:text-8xl font-bold text-primary mb-4" style={{ fontFamily: 'Courier New, monospace' }}>
            404
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 font-bold break-words" style={{ fontFamily: 'Courier New, monospace' }}>
            Not Found
          </h1>
        </div>

        <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base" style={{ fontFamily: 'Courier New, monospace' }}>
          The page you're looking for doesn't exist.
        </p>

        <Link
          href="/"
          className="inline-block bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 border border-border transition-colors text-sm sm:text-base rounded-md"
          style={{ fontFamily: 'Courier New, monospace' }}
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}