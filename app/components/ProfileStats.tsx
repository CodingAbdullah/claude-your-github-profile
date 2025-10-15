'use client'

import ProfileStatsType from '../utils/types/ProfileStatsType';

export default function ProfileStats({ repos, contributionCalendar }: ProfileStatsType) {
  // Calculate total stars across all repos
  const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)

  // Calculate total forks across all repos
  const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0)

  // Get total contributions from calendar
  const totalContributions = contributionCalendar?.totalContributions || 0

  const stats = [
    { label: 'Total Stars', value: totalStars, icon: '⭐' },
    { label: 'Total Forks', value: totalForks, icon: '🍴' },
    { label: 'Public Repos', value: repos.length, icon: '📦' },
    { label: 'Contributions', value: totalContributions, icon: '📊' }
  ]

  // Profile Stats Component
  return (
    <div className="github-card">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Profile Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center p-4 bg-white dark:bg-black rounded-lg border border-gray-300 dark:border-gray-700">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-black dark:text-white">{stat.value.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
