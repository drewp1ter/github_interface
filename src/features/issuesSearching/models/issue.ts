import { User, IUser, IUserDTO } from './user'

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
  user: IUserDTO
}

export interface IIssue {
  id: number
  createdAt: string
  createdAtFormated: string
  title: string
  body: string
  number: number
  user: IUser
}

export class Issue implements IIssue {
  constructor(
    public id: number = -1,
    public createdAt: string = '',
    public title: string = '',
    public body: string = '',
    public number: number = -1,
    public user = new User()
  ) {}

  get createdAtFormated(): string {
    const date = new Date(this.createdAt)
    return date.toDateString()
  }

  static create(dto: IIssueDTO): IIssue {
    return new Issue(dto.id, dto.created_at, dto.title, dto.body, dto.number, User.create(dto.user))
  }
}

export interface IIssues {
  userName: string
  repoName: string
  payload: IIssue[]
}
