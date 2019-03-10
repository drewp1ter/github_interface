import { IIssuesRequest } from './models'

const { REACT_APP_API_PLACEHOLDER } = process.env

export const userRepos = (name: string): string => `${REACT_APP_API_PLACEHOLDER}users/${name}/repos`
export const repoIssues = ({ userName, repoName, issuesState }: IIssuesRequest) =>
  `${REACT_APP_API_PLACEHOLDER}repos/${userName}/${repoName}/issues?state=${issuesState}`
