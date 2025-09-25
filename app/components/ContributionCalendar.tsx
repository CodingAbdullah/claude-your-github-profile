'use client'

import { useState } from 'react'

type Day = {
  date: string
  contributionCount: number
  weekday?: number
  color?: string
}
type Week = { contributionDays: Day[] }
type ContributionCalendarData = {
  totalContributions: number
  weeks: Week[]
}

// Contribution Calendar Custom Component
export default function ContributionCalendar({
  contributionCalendar
}: {
  contributionCalendar: ContributionCalendarData | null
}) {
  const [isExpanded, setIsExpanded] = useState(true)

  if (!contributionCalendar) {
    return (
      <div className="px-2">
        <div className="flex justify-center items-center mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg matrix-text text-center">[CONTRIBUTION CALENDAR]</h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-3 text-xs font-mono border border-primary px-2 py-1 hover:bg-primary hover:text-white transition-colors"
          >
            [{isExpanded ? 'COLLAPSE' : 'EXPAND'}]
          </button>
        </div>
        {isExpanded && (
          <div className="terminal-border p-4 text-center" style={{color: 'var(--text-muted)'}}>
            Contribution calendar requires authentication
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="px-2">
      <div className="flex justify-center items-center mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg matrix-text text-center">[CONTRIBUTION CALENDAR]</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-3 text-xs font-mono border border-primary px-2 py-1 hover:bg-primary hover:text-white transition-colors"
        >
          [{isExpanded ? 'COLLAPSE' : 'EXPAND'}]
        </button>
      </div>
      {isExpanded && (
        <div className="terminal-border p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-mono" style={{color: 'var(--text-primary)'}}>
              {contributionCalendar.totalContributions} contributions in the last year
            </span>
          </div>
          <div className="flex justify-center">
            <div className="inline-flex gap-0.5">
              {contributionCalendar.weeks.map((week, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  {week.contributionDays.map((day, j) => {
                    const date = new Date(day.date)
                    const formattedDate = date.toLocaleDateString()
                    return (
                      <div
                        key={j}
                        title={`${formattedDate}: ${day.contributionCount} contributions`}
                        className="w-2.5 h-2.5 rounded-sm"
                        style={{
                          backgroundColor: day.color || (
                            day.contributionCount === 0
                              ? "#161b22"
                              : day.contributionCount < 3
                              ? "#0e4429"
                              : day.contributionCount < 6
                              ? "#006d32"
                              : day.contributionCount < 10
                              ? "#26a641"
                              : "#39d353"
                          )
                        }}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end items-center gap-1 mt-3 text-xs" style={{color: 'var(--text-muted)'}}>
            <span>Less</span>
            <div className="w-2.5 h-2.5 rounded-sm" style={{backgroundColor: '#161b22'}}></div>
            <div className="w-2.5 h-2.5 rounded-sm" style={{backgroundColor: '#0e4429'}}></div>
            <div className="w-2.5 h-2.5 rounded-sm" style={{backgroundColor: '#006d32'}}></div>
            <div className="w-2.5 h-2.5 rounded-sm" style={{backgroundColor: '#26a641'}}></div>
            <div className="w-2.5 h-2.5 rounded-sm" style={{backgroundColor: '#39d353'}}></div>
            <span>More</span>
          </div>
        </div>
      )}
    </div>
  )
}
