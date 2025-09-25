import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ owner: string; repo: string }> }
) {
  const { owner, repo } = await params

  if (!owner || !repo) {
    return NextResponse.json(
      { error: 'Owner and repo are required' },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/languages`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHub Profile App'
        },
        next: { revalidate: 3600 }
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'Repository not found' }, { status: 404 })
      }
      throw new Error(`GitHub API responded with ${response.status}`)
    }

    const languages = await response.json();
    return NextResponse.json(languages);
  } 
  catch {
    return NextResponse.json(
      { error: 'Failed to fetch repository languages' },
      { status: 500 }
    )
  }
}