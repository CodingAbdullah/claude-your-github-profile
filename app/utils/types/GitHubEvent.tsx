// Custom data type for GitHub Event
export default interface GitHubEvent {
    type: string
    created_at: string
    repo: {
        name: string
        url: string
    }
    payload: any
}