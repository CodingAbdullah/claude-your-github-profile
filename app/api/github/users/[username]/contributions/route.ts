import { NextRequest, NextResponse } from 'next/server'

// GitHub GraphQL API Endpoint
const GITHUB_GRAPHQL = "https://api.github.com/graphql"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  if (!process.env.GITHUB_AUTH_TOKEN) {
    return NextResponse.json(
      { error: 'GitHub authentication token is not configured. Please add GITHUB_AUTH_TOKEN to your environment secrets.' },
      { status: 500 }
    )
  }

  try {
    const now = new Date()
    const from = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).toISOString()
    const to = now.toISOString()

    const query = `
      query ($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  weekday
                  color
                }
              }
            }
          }
        }
      }
    `

    // You'll need to add a GitHub token in production
    const response = await fetch(GITHUB_GRAPHQL, {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'GitHub Profile App',
        'Authorization': `Bearer ${process.env.GITHUB_AUTH_TOKEN}`
      },
      body: JSON.stringify({
        query,
        variables: { login: username, from, to }
      }),
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
      throw new Error(`GitHub GraphQL API responded with ${response.status}`)
    }

    const data = await response.json()

    if (data.errors) {
      return NextResponse.json({ error: 'GraphQL query failed' }, { status: 500 })
    }

    return NextResponse.json(data.data.user.contributionsCollection.contributionCalendar)
  }
  catch {
    return NextResponse.json(
      { error: 'Failed to fetch contribution calendar' },
      { status: 500 }
    )
  }
}