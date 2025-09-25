import { useState } from 'react'
import GitHubEvent from '../utils/types/GitHubEvent'

// Contribution Graph Custom Component
export default function ContributionGraph({ events }: { events: GitHubEvent[] }) {
  const [isExpanded, setIsExpanded] = useState(true)

  console.log('ContributionGraph - received events:', {
    count: events?.length || 0,
    events: events
  })

  const formatEventType = (type: string) => {
    switch (type) {
      case 'PushEvent': return 'PUSHED'
      case 'CreateEvent': return 'CREATED'
      case 'WatchEvent': return 'STARRED'
      case 'ForkEvent': return 'FORKED'
      case 'IssuesEvent': return 'ISSUE'
      case 'PullRequestEvent': return 'PR'
      case 'ReleaseEvent': return 'RELEASE'
      default: return type.replace('Event', '').toUpperCase()
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case 'PushEvent': return '#0066cc'
      case 'CreateEvent': return '#28a745'
      case 'WatchEvent': return '#6f42c1'
      case 'ForkEvent': return '#ffd700'
      case 'IssuesEvent': return '#ff8800'
      case 'PullRequestEvent': return '#000000'
      case 'ReleaseEvent': return '#ffd700'
      default: return '#ffd700'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="px-2">
      <div className="flex justify-center items-center mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg matrix-text text-center">[RECENT ACTIVITY]</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-3 text-xs font-mono border border-primary px-2 py-1 hover:bg-primary hover:text-white transition-colors"
        >
          [{isExpanded ? 'COLLAPSE' : 'EXPAND'}]
        </button>
      </div>
      {isExpanded && (
        <div className="space-y-2 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
          {!events || events.length === 0 ? (
            <div className="terminal-border p-4 text-center" style={{color: 'var(--text-muted)'}}>
              No recent activity found
            </div>
          ) : (
            events.slice(0, 20).map((event, index) => (
              <div key={index} className="terminal-border p-3 flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{backgroundColor: getEventColor(event.type)}}
                ></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs font-mono px-1 py-0.5 rounded"
                      style={{
                        backgroundColor: getEventColor(event.type),
                        color: getEventColor(event.type) === '#000000' ? 'white' : 'black',
                        fontSize: '10px'
                      }}
                    >
                      {formatEventType(event.type)}
                    </span>
                    <span className="text-xs font-mono" style={{color: 'var(--text-muted)'}}>
                      {formatDate(event.created_at)}
                    </span>
                  </div>
                  {event.repo && (
                    <a
                      href={`https://github.com/${event.repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono hover:underline block truncate"
                      style={{color: 'var(--text-primary)'}}
                    >
                      {event.repo.name}
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}