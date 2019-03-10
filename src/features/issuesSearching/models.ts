export interface IIssuesRequest {
  userName: string
  repoName: string
  issuesState: 'all' | 'open' | 'closed'
}

export interface IIssueDTO {
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

export interface IIssue {
  id: number
  createdAt: string
  createdAtFormated: string
  title: string
  body: string
  number: number
  user: {
    login: string
    avatarUrl: string
    htmlUrl: string
  }
}

export class Issue implements IIssue {

  constructor(
    public id: number = -1,
    public createdAt: string = '',
    public title: string = '',
    public body: string = '',
    public number: number = -1,
    public user = {
      login: '',
      avatarUrl: '',
      htmlUrl: ''
    }
  ) { }

  get createdAtFormated(): string {
    const date = new Date(this.createdAt)
    return date.toDateString()
  }

  static create(dto: IIssueDTO): IIssue {
    const model = new Issue(dto.id, dto.created_at, dto.title, dto.body, dto.number,
      { login: dto.user.login, avatarUrl: dto.user.avatar_url, htmlUrl: dto.user.html_url }
      );

    return model;
  }

}

export interface IIssues {
  userName: string,
  repoName: string,
  payload: IIssue[]
}