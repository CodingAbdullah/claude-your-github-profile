'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'

// Setting the form username criteria
const formSchema = z.object({
  username: z.string().min(1, 'Username is required').min(2, 'Username must be at least 2 characters')
})

// Home Page Component
export default function Home() {
  const [loading, setLoading] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const fullText = 'GitHub Profile Terminal'
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: ''
    },
  })

  // Gradually displaying title text
  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex))
        currentIndex++
      } 
      else {
        clearInterval(typingInterval)
      }
    }, 80)

    return () => clearInterval(typingInterval)
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    router.push(`/profile/${values.username.trim()}`)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg mx-auto">

        {/* Title - Perfectly Centered with Courier New */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-4 sm:mb-6">
            &gt;_
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">
            {displayText}
            <span className="typing-effect"></span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg px-4">
            Search any GitHub username to explore their profile
          </p>
        </div>

        {/* shadcn Card with Tailwind styling */}
        <Card className="bg-gray-900 border-gray-700 shadow-2xl mx-2 sm:mx-0">
          <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Enter GitHub Username
            </h2>
          </CardHeader>

          <CardContent className="px-4 sm:px-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">

                {/* shadcn FormField with proper centering */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="text-center">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter GitHub username..."
                          className="bg-black border-gray-400 text-white text-lg sm:text-xl py-3 sm:py-4 text-center placeholder:text-gray-500 focus:border-gray-300 focus:ring-2 focus:ring-gray-400"
                          autoFocus
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-center text-sm" />
                    </FormItem>
                  )}
                />

                {/* shadcn Button with Tailwind styling */}
                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white text-lg sm:text-xl py-3 sm:py-4 font-bold disabled:bg-gray-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Searching...</span>
                    </div>
                  ) : (
                    'Search Profile'
                  )}
                </Button>

              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Footer - Centered */}
        <div className="text-center mt-6 sm:mt-8 px-4">
          <p className="text-gray-500 text-sm sm:text-base">
            Try: <span className="text-white font-bold">octocat</span>, <span className="text-white font-bold">torvalds</span>, <span className="text-white font-bold">gaearon</span>
          </p>
        </div>

      </div>
    </div>
  )
}