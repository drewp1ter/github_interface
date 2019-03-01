import { IIssuesRequest } from './models'

const { REACT_APP_API_PLACEHOLDER } = process.env

export const userRepos = (name: any):string => `${REACT_APP_API_PLACEHOLDER}users/${name}/repos`
export const repoIssues = ({ userName, repoName }: IIssuesRequest) => `${REACT_APP_API_PLACEHOLDER}repos/${userName}/${repoName}/issues`