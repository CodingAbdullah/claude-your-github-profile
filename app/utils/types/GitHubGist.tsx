// Custom data type for GitHub Gist
export default interface GitHubGist {
    description: string
    created_at: string
    html_url: string
    public: boolean
    files: { [key: string]: { language: string } }
}
  