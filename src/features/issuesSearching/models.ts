export interface IIssuesRequest {
  userName: string
  repoName: string
}

export interface IIssue {
  id: number
  created_at: string
  title: string
  body: string
  number: number
  user: {
    login: string
    avatar_url: string
    html_url: string
  }
}