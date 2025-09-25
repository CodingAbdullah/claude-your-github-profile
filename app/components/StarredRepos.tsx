import { useState } from 'react'
import GitHubRepo from '../utils/types/GitHubRepo'

// Starred Repositories Custom Component
export default function StarredRepos({ starred }: { starred: GitHubRepo[] }) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="px-2">
      <div className="flex justify-center items-center mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg matrix-text text-center">[STARRED REPOSITORIES]</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-3 text-xs font-mono border border-primary px-2 py-1 hover:bg-primary hover:text-white transition-colors"
        >
          [{isExpanded ? 'COLLAPSE' : 'EXPAND'}]
        </button>
      </div>
      {isExpanded && (
        <div className="space-y-3 sm:space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
        {starred.length === 0 ? (
          <div className="terminal-border p-3 sm:p-4 text-center text-muted">
            No starred repositories found
          </div>
        ) : (
          starred.map((repo) => (
            <div key={repo.name} className="terminal-border p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                <div className="flex flex-col gap-1">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="font-mono text-sm sm:text-base break-words font-bold hover:underline" style={{color: 'var(--text-primary)'}}>
                    {repo.full_name}
                  </a>
                  <span className="text-xs font-mono" style={{color: 'var(--text-primary)'}}>by {repo.owner.login}</span>
                </div>
                <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm justify-start sm:justify-end" style={{color: 'var(--text-primary)'}}>
                  <span>★ {repo.stargazers_count}</span>
                  <span>⑂ {repo.forks_count}</span>
                </div>
              </div>
              <p className="mb-2 text-xs sm:text-sm break-words" style={{color: 'var(--text-primary)'}}>{repo.description || 'No description'}</p>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs gap-1">
                <span style={{color: 'var(--text-muted)'}}>
                  {repo.languagesWithPercentages || (repo.language && repo.language !== 'Unknown' ? repo.language : 'Unknown')}
                </span>
                <span style={{color: 'var(--text-primary)'}}>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
        </div>
      )}
    </div>
  )
}