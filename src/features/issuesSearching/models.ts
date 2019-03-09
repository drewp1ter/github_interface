export interface IIssuesRequest {
  userName: string
  repoName: string
  issuesState: 'all' | 'open' | 'closed'
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

export interface IIssues {
  userName: string,
  repoName: string,
  payload: IIssue[]
}

export const createIssue = (props?: IIssue): IIssue => ({
  id: -1,
  created_at: '',
  title: '',
  body: '',
  number: -1,
  user: {
    login: '',
    avatar_url: '',
    html_url: ''
  },
  ...props
})