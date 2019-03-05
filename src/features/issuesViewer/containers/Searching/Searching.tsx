import * as React from 'react'
import { of, fromEvent } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { debounceTime, map, tap, catchError, switchMap, filter, pluck } from 'rxjs/operators'

import { Input, Button, InputWithSuggestions, Spinner } from 'components'
import { userRepos } from '../../apiEndpoints'
import { IIssuesRequest } from '../../models'
import styles from './searching.module.scss'

export interface IProps {
  readonly fetchIssues: (request: IIssuesRequest) => void
  readonly className?: string
  readonly fetching: boolean
}

export interface IState {
  readonly [key: string]: any
  readonly repos: string[],
  readonly repoName: string
  readonly userName: string
  readonly reposNotFound: boolean
  readonly reposFetching: boolean
}

class Searching extends React.Component<IProps, IState> {

  static defaultProps = {
    className: ''
  }

  readonly state: IState = {
    userName: 'mufdv',
    repoName: '',
    repos: [],
    reposNotFound: false,
    reposFetching: false
  }

  handleChange = (value: string, name = 'def'): void => this.setState({ [name]: value })

  fetchRepos = (node: HTMLInputElement) => {
    fromEvent(node, 'keyup').pipe(
      tap(() => this.setState({ reposNotFound: false })),
      pluck('target', 'value'),
      map(value => value as string),
      filter(value => value !== ''),
      debounceTime(800),
      tap(() => this.setState({ reposFetching: true })),
      switchMap(value => ajax.getJSON(userRepos(value)).pipe(
        map(res => res as {}[]),
        map(res => res.map((item: any): string => item.name)),
        catchError(() => {
          this.setState({
            reposNotFound: true,
            reposFetching: false
          })
          return of([])
        })
      ))
    ).subscribe(repos => this.setState({
      repos,
      reposFetching: false
    }))
  }

  handleClick = () => {
    const { fetchIssues } = this.props
    const { userName, repoName } = this.state
    fetchIssues({ userName, repoName })
  }

  render = () => {
    const { className, fetching } = this.props
    const { userName, repoName, reposNotFound, repos, reposFetching } = this.state
    const _className = `${styles.wrapper} ${className}`
    return (
      <div className={_className}>
        <div>
          <label className={styles.label}>User name</label>
          <Input className={styles.userNameInput} inputRef={this.fetchRepos} onChange={this.handleChange} error={reposNotFound} name="userName" value={userName} />
        </div>
        <div className={styles.spinner}>
          {reposFetching && <Spinner />}
        </div>
        <div className={styles.repoName}>
          <label className={styles.label}>Repo name</label>
          <InputWithSuggestions name="repoName" onChange={this.handleChange} suggestions={repos} value={repoName} />
        </div>
        <Button onClick={this.handleClick} disabled={fetching} loading={fetching}>Search</Button>
      </div>
    )
  }
}

export default Searching