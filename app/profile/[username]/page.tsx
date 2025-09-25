'use client'

import Link from 'next/link'
import { use } from 'react'
import GitHubProfile from '../../components/GitHubProfile'
import { Card, CardContent } from '@/components/ui/card'

interface Props {
  params: Promise<{ username: string }>
}

export default function ProfilePage({ params }: Props) {
  const resolvedParams = use(params)
  const { username } = resolvedParams

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">

        {/* Header Navigation - Mobile Responsive */}
        <div className="flex flex-col items-center mb-6 sm:mb-8 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between w-full max-w-4xl px-2">
            <Link href="/" className="text-primary hover:text-foreground font-mono transition-colors text-sm sm:text-base">
              ← Back to Search
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="text-primary hover:text-foreground font-mono transition-colors bg-transparent border-none cursor-pointer text-sm sm:text-base"
            >
              Refresh →
            </button>
          </div>

          {/* Title - Mobile Responsive */}
          <div className="text-center px-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-foreground mb-2">
              GitHub Profile
            </h1>
          </div>
        </div>

        {/* Username Display - Mobile Responsive */}
        <div className="flex justify-center mb-6 sm:mb-8 px-2">
          <Card className="w-full max-w-2xl">
            <CardContent className="p-4 sm:p-6 text-center">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-mono font-bold text-foreground break-words">
                Profile: <span className="text-primary">{username}</span>
              </h2>
              <div className="text-muted-foreground font-mono text-xs sm:text-sm mt-2">
                Loading GitHub data...
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Content - Mobile Responsive with Scrolling */}
        <div className="flex justify-center px-2">
          <div className="w-full max-w-6xl">
            <Card className="overflow-hidden">
              <CardContent className="p-3 sm:p-4 lg:p-6 max-h-[70vh] sm:max-h-none overflow-y-auto">
                <GitHubProfile username={username} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Footer - Mobile Responsive */}
        <div className="flex justify-center mt-6 sm:mt-8 px-2">
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm">
                <Link
                  href="/"
                  className="text-primary hover:text-foreground transition-colors"
                >
                  New Search
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                  href="/"
                  className="text-primary hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer - Mobile Responsive */}
        <div className="text-center mt-6 sm:mt-8 px-4">
          <p className="text-muted-foreground font-mono text-xs sm:text-sm break-words">
            Profile data for: {username}
          </p>
        </div>
      </div>
    </div>
  )
}