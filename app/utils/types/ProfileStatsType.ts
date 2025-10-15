import GitHubRepo from './GitHubRepo'
import ContributionCalendarType from './ContributionCalendar'

// Profile Stats data type
export default interface ProfileStatsType {
    repos: GitHubRepo[]
    contributionCalendar: ContributionCalendarType | null
  }
  