export interface IUserDTO {
  id: number
  login: string
  avatar_url: string
  html_url: string
}

export interface IUser {
  id: number
  login: string
  avatarUrl: string
  htmlUrl: string
}

export class User implements IUser {

  public static create(dto: IUserDTO): IUser {
    return new User(dto.id, dto.login, dto.avatar_url, dto.html_url)
  }
  constructor(public id: number = -1, public login: string = '', public avatarUrl: string = '', public htmlUrl: string = '') {}
}
