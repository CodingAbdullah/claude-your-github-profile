'use client'

import { useState, useEffect } from 'react'
import GitHubUser from '../utils/types/GitHubUser'
import Props from '../utils/types/Props'
import GitHubRepo from '../utils/types/GitHubRepo'
import GitHubGist from '../utils/types/GitHubGist'
import Profile from './Profile'
import Repositories from './Repositories'
import Gists from './Gists'
import StarredRepos from './StarredRepos'

// Custom GitHub Profile Component
export default function GitHubProfile({ username }: Props) {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [gists, setGists] = useState<GitHubGist[]>([])
  const [starred, setStarred] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAllData()
  }, [username])

  const fetchAllData = async () => {
    setLoading(true)
    setError(null)

    try {
      const [userRes, reposRes, gistsRes, starredRes] = await Promise.all([
        fetch(`/api/github/users/${username}`),
        fetch(`/api/github/users/${username}/repos?per_page=10&sort=updated`),
        fetch(`/api/github/users/${username}/gists?per_page=5`),
        fetch(`/api/github/users/${username}/starred?per_page=5&sort=created`)
      ])

      if (!userRes.ok) {
        throw new Error(userRes.status === 404 ? 'User not found' : 'Failed to fetch user data')
      }
      if (!reposRes.ok && reposRes.status !== 404) {
        throw new Error('Failed to fetch repositories')
      }
      if (!gistsRes.ok && gistsRes.status !== 404) {
        throw new Error('Failed to fetch gists')
      }
      if (!starredRes.ok && starredRes.status !== 404) {
        throw new Error('Failed to fetch starred repositories')
      }

      const userData = await userRes.json()
      const reposData = reposRes.ok ? await reposRes.json() : []
      const gistsData = gistsRes.ok ? await gistsRes.json() : []
      const starredData = starredRes.ok ? await starredRes.json() : []

      setUser(userData)
      setRepos(reposData)
      setGists(gistsData)
      setStarred(starredData)
    }
    catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return
    }
    finally {
      setLoading(false)
    }
  }

  if (error) {
    throw new Error(error)
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-lg font-mono">
          Loading GitHub profile...
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="space-y-8">
      <Profile user={user} />
      <Repositories repos={repos} />
      <Gists gists={gists} />
      <StarredRepos starred={starred} />
    </div>
  )
}