import GitHubGist from '../utils/types/GitHubGist'

export default function Gists({ gists }: { gists: GitHubGist[] }) {
  return (
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
              <a href={gist.html_url} target="_blank" rel="noopener noreferrer" className="text-primary font-mono mb-2 text-sm sm:text-base break-words hover:underline block">
                {gist.description || 'Untitled Gist'}
              </a>
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
  )
}