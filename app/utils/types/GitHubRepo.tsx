// Custom data type for GitHub Repo
export default interface GitHubRepo {
    name: string
    full_name: string
    description: string
    stargazers_count: number
    forks_count: number
    language: string
    updated_at: string
    html_url: string
    owner: {
        login: string
        avatar_url: string
    }
}