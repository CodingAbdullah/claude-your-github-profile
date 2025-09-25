import { useState } from 'react'
import Image from 'next/image'
import GitHubFollower from '../utils/types/GitHubFollower'

// Followers Custom Component
export default function Followers({ followers, following }: { followers: GitHubFollower[], following: GitHubFollower[] }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [activeTab, setActiveTab] = useState('followers')

  // Show component if either followers or following exist
  if ((!followers || followers.length === 0) && (!following || following.length === 0)) {
    return null
  }

  return (
    <div className="px-2">
      <div className="flex justify-center items-center mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg matrix-text text-center">[NETWORK]</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-3 text-xs font-mono border border-primary px-2 py-1 hover:bg-primary hover:text-white transition-colors"
        >
          [{isExpanded ? 'COLLAPSE' : 'EXPAND'}]
        </button>
      </div>
      {isExpanded && (
        <div>
          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={() => setActiveTab('followers')}
              className={`px-3 py-1 text-xs font-mono border transition-colors ${
                activeTab === 'followers'
                  ? 'bg-primary text-black border-primary'
                  : 'border-border hover:bg-secondary'
              }`}
            >
              FOLLOWERS ({followers?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`px-3 py-1 text-xs font-mono border transition-colors ${
                activeTab === 'following'
                  ? 'bg-primary text-black border-primary'
                  : 'border-border hover:bg-secondary'
              }`}
            >
              FOLLOWING ({following?.length || 0})
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
            {(activeTab === 'followers' ? (followers || []) : (following || [])).map((user) => (
              <a
                key={user.login}
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-border p-2 text-center hover:bg-secondary transition-colors"
              >
                <div className="w-12 h-12 mx-auto mb-2 rounded border border-primary overflow-hidden">
                  <Image
                    src={user.avatar_url}
                    alt={user.login}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-mono" style={{color: 'var(--text-primary)'}} title={user.login}>
                  {user.login.length > 10 ? `${user.login.slice(0, 8)}...` : user.login}
                </span>
              </a>
            ))}
          </div>

          {(activeTab === 'followers' ? (followers || []) : (following || [])).length === 0 && (
            <div className="terminal-border p-4 text-center" style={{color: 'var(--text-muted)'}}>
              No {activeTab} found
            </div>
          )}
        </div>
      )}
    </div>
  )
}