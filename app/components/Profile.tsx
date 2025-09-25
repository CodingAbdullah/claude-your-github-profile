import { useState } from 'react'
import Image from 'next/image'
import GitHubUser from '../utils/types/GitHubUser'

// Profile Custom Component
export default function Profile({ user }: { user: GitHubUser }) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div>
      <div className="flex justify-center items-center mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg matrix-text text-center">[PROFILE]</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-3 text-xs font-mono border border-primary px-2 py-1 hover:bg-primary hover:text-white transition-colors"
        >
          [{isExpanded ? 'COLLAPSE' : 'EXPAND'}]
        </button>
      </div>
      {isExpanded && (
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
          <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
            <h2 className="text-lg sm:text-xl font-mono font-bold text-foreground mb-2 break-words">{user.name || user.login}</h2>
          </a>
          <p className="text-muted-foreground font-mono text-sm break-words">@{user.login}</p>
        </div>
      </div>

      <div className="lg:col-span-2 bg-card border border-border rounded-lg p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-mono font-bold text-foreground mb-3 sm:mb-4 text-center">[SYSTEM INFO]</h3>
        <div className="space-y-2 sm:space-y-3 font-mono text-xs sm:text-sm">
          <div className="flex flex-col sm:flex-row sm:justify-center items-center"><span className="text-primary w-full sm:w-24 text-center mb-1 sm:mb-0">BIO:</span> <span className="text-foreground text-center flex-1 break-words px-2">{user.bio || 'N/A'}</span></div>
          <div className="flex flex-col sm:flex-row sm:justify-center items-center"><span className="text-primary w-full sm:w-24 text-center mb-1 sm:mb-0">LOCATION:</span> <span className="text-foreground text-center flex-1 break-words px-2">{user.location || 'Unknown'}</span></div>
          <div className="flex flex-col sm:flex-row sm:justify-center items-center"><span className="text-primary w-full sm:w-24 text-center mb-1 sm:mb-0">COMPANY:</span> <span className="text-foreground text-center flex-1 break-words px-2">{user.company || 'N/A'}</span></div>
          <div className="flex flex-col sm:flex-row sm:justify-center items-center"><span className="text-primary w-full sm:w-24 text-center mb-1 sm:mb-0">WEBSITE:</span> <span className="text-foreground text-center flex-1 break-words px-2">{user.blog ? <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{color: 'var(--accent)'}}>{user.blog}</a> : 'N/A'}</span></div>
          <div className="flex flex-col sm:flex-row sm:justify-center items-center"><span className="text-primary w-full sm:w-24 text-center mb-1 sm:mb-0">TWITTER:</span> <span className="text-foreground text-center flex-1 break-words px-2">{user.twitter_username ? <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{color: 'var(--accent)'}}>@{user.twitter_username}</a> : 'N/A'}</span></div>
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
    </div>
  )
}