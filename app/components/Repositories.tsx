import GitHubRepo from '../utils/types/GitHubRepo'

// Repositories Custom Component
export default function Repositories({ repos }: { repos: GitHubRepo[] }) {
  return (
    <div className="px-2">
      <h3 className="text-base sm:text-lg matrix-text mb-3 sm:mb-4 text-center">[REPOSITORIES]</h3>
      <div className="space-y-3 sm:space-y-4 max-h-[60vh] overflow-y-auto">
        {repos.map((repo) => (
          <div key={repo.name} className="terminal-border p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-primary font-mono text-sm sm:text-base break-words hover:underline">
                {repo.full_name}
              </a>
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
  )
}