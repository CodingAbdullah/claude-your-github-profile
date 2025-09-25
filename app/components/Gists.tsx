import { useState } from 'react'
import GitHubGist from '../utils/types/GitHubGist'

export default function Gists({ gists }: { gists: GitHubGist[] }) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="px-2">
      <div className="flex justify-center items-center mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg matrix-text text-center">[GISTS]</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-3 text-xs font-mono border border-primary px-2 py-1 hover:bg-primary hover:text-white transition-colors"
        >
          [{isExpanded ? 'COLLAPSE' : 'EXPAND'}]
        </button>
      </div>
      {isExpanded && (
        <div className="space-y-3 sm:space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
        {gists.length === 0 ? (
          <div className="terminal-border p-3 sm:p-4 text-center text-muted">
            No public gists found
          </div>
        ) : (
          gists.map((gist, index) => (
            <div key={index} className="terminal-border p-3 sm:p-4">
              <a href={gist.html_url} target="_blank" rel="noopener noreferrer" className="font-mono mb-2 text-sm sm:text-base break-words font-bold hover:underline block" style={{color: 'var(--text-primary)'}}>
                {gist.description || 'Untitled Gist'}
              </a>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs gap-1">
                <span style={{color: 'var(--text-muted)'}}>
                  {Object.values(gist.files)[0]?.language || 'Text'}
                </span>
                <span style={{color: 'var(--text-primary)'}}>Created: {new Date(gist.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
        </div>
      )}
    </div>
  )
}