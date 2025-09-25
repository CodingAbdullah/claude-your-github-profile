'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface GitHubUser {
  login: string
  name: string
  avatar_url: string
  bio: string
  location: string
  blog: string
  followers: number
  following: number
  public_repos: number
  public_gists: number
  created_at: string
}

interface GitHubRepo {
  name: string
  description: string
  stargazers_count: number
  forks_count: number
  language: string
  updated_at: string
  html_url: string
}

interface GitHubGist {
  description: string
  created_at: string
  html_url: string
  files: { [key: string]: { language: string } }
}

interface Props {
  username: string
}

export default function GitHubProfile({ username }: Props) {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [gists, setGists] = useState<GitHubGist[]>([])
  const [starred, setStarred] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('profile')

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

      const userData = await userRes.json()
      const reposData = reposRes.ok ? await reposRes.json() : []
      const gistsData = gistsRes.ok ? await gistsRes.json() : []
      const starredData = starredRes.ok ? await starredRes.json() : []

      setUser(userData)
      setRepos(reposData)
      setGists(gistsData)
      setStarred(starredData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="matrix-text text-lg">
          ACCESSING GITHUB DATABASE<span className="loading-dots"></span>
        </div>
        <div className="mt-4 ascii-art">
{`
 ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░▌
▐░█▀▀▀▀▀▀▀█░▌ ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌
▐░▌       ▐░▌     ▐░▌     ▐░▌       ▐░▌▐░▌       ▐░▌
▐░█▄▄▄▄▄▄▄█░▌     ▐░▌     ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌
▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌▐░░░░░░░░░░▌
 ▀▀▀▀▀▀▀▀▀█░▌     ▐░▌     ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌
          ▐░▌     ▐░▌     ▐░▌       ▐░▌▐░▌       ▐░▌
 ▄▄▄▄▄▄▄▄▄█░▌ ▄▄▄▄█░█▄▄▄▄ ▐░▌       ▐░▌▐░▌       ▐░▌
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░▌       ▐░▌
 ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀         ▀
`}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-error text-lg mb-4">
          ERROR: {error}
        </div>
        <div className="ascii-art text-error mb-6">
{`
 ███████╗██████╗ ██████╗  ██████╗ ██████╗
 ██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔══██╗
 █████╗  ██████╔╝██████╔╝██║   ██║██████╔╝
 ██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══██╗
 ███████╗██║  ██║██║  ██║╚██████╔╝██║  ██║
 ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝
`}
        </div>
        <div className="terminal-border p-4">
          <h4 className="text-secondary mb-2">[TROUBLESHOOTING]</h4>
          <div className="text-muted font-mono text-sm">
            <p>• Check username spelling</p>
            <p>• Verify user exists on GitHub</p>
            <p>• Try a different username</p>
          </div>
          <button
            onClick={fetchAllData}
            className="mt-4 bg-transparent border border-primary text-primary px-4 py-2 font-mono hover:bg-primary hover:text-bg-primary transition-colors"
          >
            [RETRY]
          </button>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      {/* Navigation - Mobile Responsive */}
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-4 sm:mb-6 px-2">
        {['profile', 'repos', 'gists', 'starred'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-2 sm:px-4 py-1 sm:py-2 border font-mono text-xs sm:text-sm rounded-md transition-all duration-200 ${
              activeSection === section
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-transparent text-foreground border-border hover:bg-secondary hover:border-primary'
            }`}
          >
            [{section.toUpperCase()}]
          </button>
        ))}
      </div>

      {/* Profile Header - Mobile Responsive */}
      {activeSection === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
            <div className="text-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-4 border-2 border-primary rounded-lg overflow-hidden">
                <Image
                  src={user.avatar_url}
                  alt={user.login}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-lg sm:text-xl font-mono font-bold text-foreground mb-2 break-words">{user.name || user.login}</h2>
              <p className="text-muted-foreground font-mono text-sm break-words">@{user.login}</p>
            </div>
          </div>

          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-mono font-bold text-foreground mb-3 sm:mb-4 text-center">[SYSTEM INFO]</h3>
            <div className="space-y-2 sm:space-y-3 font-mono text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-center items-center"><span className="text-primary w-full sm:w-24 text-center mb-1 sm:mb-0">BIO:</span> <span className="text-foreground text-center flex-1 break-words px-2">{user.bio || 'N/A'}</span></div>
              <div className="flex flex-col sm:flex-row sm:justify-center items-center"><span className="text-primary w-full sm:w-24 text-center mb-1 sm:mb-0">LOCATION:</span> <span className="text-foreground text-center flex-1 break-words px-2">{user.location || 'Unknown'}</span></div>
              <div className="flex flex-col sm:flex-row sm:justify-center items-center"><span className="text-primary w-full sm:w-24 text-center mb-1 sm:mb-0">WEBSITE:</span> <span className="text-foreground text-center flex-1 break-words px-2">{user.blog || 'N/A'}</span></div>
              <div className="flex flex-col sm:flex-row sm:justify-center items-center"><span className="text-primary w-full sm:w-24 text-center mb-1 sm:mb-0">JOINED:</span> <span className="text-foreground text-center flex-1 break-words px-2">{new Date(user.created_at).toLocaleDateString()}</span></div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
              <div className="bg-secondary border border-border rounded-lg p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-2xl font-mono font-bold text-primary">{user.public_repos}</div>
                <div className="text-xs text-muted-foreground font-mono">REPOS</div>
              </div>
              <div className="bg-secondary border border-border rounded-lg p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-2xl font-mono font-bold text-primary">{user.public_gists}</div>
                <div className="text-xs text-muted-foreground font-mono">GISTS</div>
              </div>
              <div className="bg-secondary border border-border rounded-lg p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-2xl font-mono font-bold text-primary">{user.followers}</div>
                <div className="text-xs text-muted-foreground font-mono">FOLLOWERS</div>
              </div>
              <div className="bg-secondary border border-border rounded-lg p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-2xl font-mono font-bold text-primary">{user.following}</div>
                <div className="text-xs text-muted-foreground font-mono">FOLLOWING</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Repositories - Mobile Responsive */}
      {activeSection === 'repos' && (
        <div className="px-2">
          <h3 className="text-base sm:text-lg matrix-text mb-3 sm:mb-4 text-center">[REPOSITORIES]</h3>
          <div className="space-y-3 sm:space-y-4 max-h-[60vh] overflow-y-auto">
            {repos.map((repo) => (
              <div key={repo.name} className="terminal-border p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                  <h4 className="text-primary font-mono text-sm sm:text-base break-words">{repo.name}</h4>
                  <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm text-muted justify-start sm:justify-end">
                    <span>★ {repo.stargazers_count}</span>
                    <span>⑂ {repo.forks_count}</span>
                  </div>
                </div>
                <p className="text-secondary mb-2 text-xs sm:text-sm break-words">{repo.description || 'No description'}</p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-muted gap-1">
                  <span>{repo.language || 'Unknown'}</span>
                  <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gists - Mobile Responsive */}
      {activeSection === 'gists' && (
        <div className="px-2">
          <h3 className="text-base sm:text-lg matrix-text mb-3 sm:mb-4 text-center">[GISTS]</h3>
          <div className="space-y-3 sm:space-y-4 max-h-[60vh] overflow-y-auto">
            {gists.length === 0 ? (
              <div className="terminal-border p-3 sm:p-4 text-center text-muted">
                No public gists found
              </div>
            ) : (
              gists.map((gist, index) => (
                <div key={index} className="terminal-border p-3 sm:p-4">
                  <h4 className="text-primary font-mono mb-2 text-sm sm:text-base break-words">
                    {gist.description || 'Untitled Gist'}
                  </h4>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-muted gap-1">
                    <span>
                      {Object.values(gist.files)[0]?.language || 'Text'}
                    </span>
                    <span>Created: {new Date(gist.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Starred Repos - Mobile Responsive */}
      {activeSection === 'starred' && (
        <div className="px-2">
          <h3 className="text-base sm:text-lg matrix-text mb-3 sm:mb-4 text-center">[STARRED REPOSITORIES]</h3>
          <div className="space-y-3 sm:space-y-4 max-h-[60vh] overflow-y-auto">
            {starred.length === 0 ? (
              <div className="terminal-border p-3 sm:p-4 text-center text-muted">
                No starred repositories found
              </div>
            ) : (
              starred.map((repo) => (
                <div key={repo.name} className="terminal-border p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                    <h4 className="text-primary font-mono text-sm sm:text-base break-words">{repo.name}</h4>
                    <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm text-muted justify-start sm:justify-end">
                      <span>★ {repo.stargazers_count}</span>
                      <span>⑂ {repo.forks_count}</span>
                    </div>
                  </div>
                  <p className="text-secondary mb-2 text-xs sm:text-sm break-words">{repo.description || 'No description'}</p>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-muted gap-1">
                    <span>{repo.language || 'Unknown'}</span>
                    <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}