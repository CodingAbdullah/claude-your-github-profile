'use client'

import { useState, useEffect } from 'react'
import GitHubUser from '../utils/types/GitHubUser'
import Props from '../utils/types/Props'
import GitHubRepo from '../utils/types/GitHubRepo'
import GitHubGist from '../utils/types/GitHubGist'
import GitHubFollower from '../utils/types/GitHubFollower'
import GitHubOrganization from '../utils/types/GitHubOrganization'
import GitHubEvent from '../utils/types/GitHubEvent'
import Profile from './Profile'
import Repositories from './Repositories'
import Gists from './Gists'
import StarredRepos from './StarredRepos'
import Followers from './Followers'
import Organizations from './Organizations'
import ContributionGraph from './ContributionGraph'
import ContributionCalendar from './ContributionCalendar'
import ContributionCalendarType from '../utils/types/ContributionCalendar'

// Helper function to calculate language percentages
const calculateLanguagePercentages = (languages: Record<string, number>): string => {
  const entries = Object.entries(languages)
  const totalBytes = entries.reduce((sum, [, bytes]) => sum + bytes, 0)

  return entries
    .map(([lang, bytes]) => {
      const percentage = ((bytes / totalBytes) * 100).toFixed(1)
      return `${lang} ${percentage}%`
    })
    .join(', ')
}

// Custom GitHub Profile Component
export default function GitHubProfile({ username }: Props) {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [gists, setGists] = useState<GitHubGist[]>([])
  const [starred, setStarred] = useState<GitHubRepo[]>([])
  const [followers, setFollowers] = useState<GitHubFollower[]>([])
  const [following, setFollowing] = useState<GitHubFollower[]>([])
  const [orgs, setOrgs] = useState<GitHubOrganization[]>([])
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [contributionCalendar, setContributionCalendar] = useState<ContributionCalendarType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAllData()
  }, [username])

  const fetchAllData = async () => {
    setLoading(true)
    setError(null)

    try {
      const [userRes, reposRes, gistsRes, starredRes, followersRes, followingRes, orgsRes, eventsRes, contributionsRes] = await Promise.all([
        fetch(`/api/github/users/${username}`),
        fetch(`/api/github/users/${username}/repos?per_page=100&sort=updated`),
        fetch(`/api/github/users/${username}/gists?per_page=100`),
        fetch(`/api/github/users/${username}/starred?per_page=100&sort=created`),
        fetch(`/api/github/users/${username}/followers?per_page=50`),
        fetch(`/api/github/users/${username}/following?per_page=50`),
        fetch(`/api/github/users/${username}/orgs`),
        fetch(`/api/github/users/${username}/events?per_page=30`),
        fetch(`/api/github/users/${username}/contributions`)
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

      // Evaluate all calls and parse JSON
      const userData = await userRes.json()
      const reposData = reposRes.ok ? await reposRes.json() : []
      const gistsData = gistsRes.ok ? await gistsRes.json() : []
      const starredData = starredRes.ok ? await starredRes.json() : []
      const followersData = followersRes.ok ? await followersRes.json() : []
      const followingData = followingRes.ok ? await followingRes.json() : []
      const orgsData = orgsRes.ok ? await orgsRes.json() : []
      const eventsData = eventsRes.ok ? await eventsRes.json() : []
      const contributionsData = contributionsRes.ok ? await contributionsRes.json() : null

      // Fetch languages for each repository
      const reposWithLanguages = await Promise.all(
        reposData.map(async (repo: any) => {
          try {
            const langRes = await fetch(`/api/github/repos/${repo.owner.login}/${repo.name}/languages`)
            if (langRes.ok) {
              const languages = await langRes.json()
              if (Object.keys(languages).length > 0) {
                const percentages = calculateLanguagePercentages(languages)
                console.log(`Repo languages for ${repo.name}:`, languages, 'Percentages:', percentages)
                return {
                  ...repo,
                  languages: Object.keys(languages),
                  languagesWithPercentages: percentages
                }
              }
            }
          } 
          catch (error) {
            console.log(`Failed to fetch languages for ${repo.name}:`, error)
          }
          return repo
        })
      )

      // Fetch languages for starred repositories
      const starredWithLanguages = await Promise.all(
        starredData.map(async (repo: any) => {
          try {
            const langRes = await fetch(`/api/github/repos/${repo.owner.login}/${repo.name}/languages`)
            if (langRes.ok) {
              const languages = await langRes.json()
              if (Object.keys(languages).length > 0) {
                const percentages = calculateLanguagePercentages(languages)
                console.log(`Starred languages for ${repo.name}:`, languages, 'Percentages:', percentages)
                return {
                  ...repo,
                  languages: Object.keys(languages),
                  languagesWithPercentages: percentages
                }
              }
            }
          } 
          catch (error) {
            console.log(`Failed to fetch languages for ${repo.name}:`, error)
          }
          return repo
        })
      )

      setUser(userData)
      setRepos(reposWithLanguages)
      setGists(gistsData)
      setStarred(starredWithLanguages)
      setFollowers(followersData)
      setFollowing(followingData)
      setOrgs(orgsData)
      setEvents(eventsData)
      setContributionCalendar(contributionsData)
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
      <ContributionCalendar contributionCalendar={contributionCalendar} />
      <Followers followers={followers} following={following} />
      <Organizations orgs={orgs} />
      <Repositories repos={repos} />
      <StarredRepos starred={starred} />
      <Gists gists={gists} />
      <ContributionGraph events={events} />
    </div>
  )
}