const { REACT_APP_API_PLACEHOLDER } = process.env

export const USER_REPOS = REACT_APP_API_PLACEHOLDER + 'users/{user}/repos'
export const userRepos = (name: any):string => `${REACT_APP_API_PLACEHOLDER}users/${name}/repos`