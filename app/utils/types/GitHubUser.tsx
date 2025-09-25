// Custom data type for GitHub User
export default interface GitHubUser {
    login: string
    name: string
    avatar_url: string
    html_url: string
    bio: string
    location: string
    blog: string
    company: string
    twitter_username: string
    followers: number
    following: number
    public_repos: number
    public_gists: number
    created_at: string
}