import { useState } from 'react'
import Image from 'next/image'
import GitHubOrganization from '../utils/types/GitHubOrganization'

// Organizations Custom Component
export default function Organizations({ orgs }: { orgs: GitHubOrganization[] }) {
  const [isExpanded, setIsExpanded] = useState(true)

  // Always show the component, even if empty

  return (
    <div className="px-2">
      <div className="flex justify-center items-center mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg matrix-text text-center">[ORGANIZATIONS]</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-3 text-xs font-mono border border-primary px-2 py-1 hover:bg-primary hover:text-white transition-colors"
        >
          [{isExpanded ? 'COLLAPSE' : 'EXPAND'}]
        </button>
      </div>
      {isExpanded && (
        <div>
          {orgs.length === 0 ? (
            <div className="terminal-border p-4 text-center" style={{color: 'var(--text-muted)'}}>
              No organizations found
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {orgs.map((org) => (
                <a
                  key={org.login}
                  href={org.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-border p-3 text-center hover:bg-secondary transition-colors"
                >
                  <div className="w-16 h-16 mx-auto mb-2 rounded border border-primary overflow-hidden">
                    <Image
                      src={org.avatar_url}
                      alt={org.login}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-xs font-mono font-bold mb-1" style={{color: 'var(--text-primary)'}} title={org.login}>
                    {org.login.length > 12 ? `${org.login.slice(0, 10)}...` : org.login}
                  </h4>
                  {org.description && (
                    <p className="text-xs" style={{color: 'var(--text-muted)'}} title={org.description}>
                      {org.description.length > 30 ? `${org.description.slice(0, 28)}...` : org.description}
                    </p>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}