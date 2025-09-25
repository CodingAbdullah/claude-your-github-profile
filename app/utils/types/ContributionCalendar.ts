// Custom ContributionCalendar data type
export default interface ContributionCalendar {
  totalContributions: number
  weeks: {
    contributionDays: {
      date: string
      contributionCount: number
      weekday?: number
      color?: string
    }[]
  }[]
}