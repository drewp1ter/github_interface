import * as React from 'react'
import { of, fromEvent } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { debounceTime, map, tap, catchError, switchMap, filter, pluck } from 'rxjs/operators'

import { Input, Button, InputWithSuggestions } from 'components'
import { userRepos } from '../../apiEndpoints'
import { IIssuesRequest, IIssue } from '../../models'
import styles from './searching.module.scss'

export interface IProps {
  readonly fetchIssues: (request: IIssuesRequest) => void
  readonly issues: IIssue[]
  readonly className?: string
}

export interface IState {
  readonly [key: string]: any
  readonly repos: string[],
  readonly repoName: string
  readonly userName: string
  readonly reposNotFound: boolean
}

class Searching extends React.Component<IProps, IState> {

  static defaultProps = {
    className: ''
  }

  readonly state: IState = {
    userName: 'mufdv',
    repoName: '',
    repos: [],
    reposNotFound: false
  }

  handleChange = (value: string, name = 'def'): void => this.setState({ [name]: value })

  fetchRepos = (node: HTMLInputElement) => {
    fromEvent(node, 'keyup').pipe(
      tap(() => this.setState({
        reposNotFound: false
      })),
      pluck('target', 'value'),
      map(value => value as string),
      filter(value => value !== ''),
      debounceTime(1000),
      switchMap(value => ajax.getJSON(userRepos(value)).pipe(
        map(res => res as {}[]),
        map(res => res.map((item: any): string => item.name)),
        catchError(() => {
          this.setState({ reposNotFound: true })
          return of([])
        })
      ))
    ).subscribe(repos => this.setState({ repos }))
  }

  handleClick = () => {
    const { fetchIssues } = this.props
    const { userName, repoName } = this.state
    fetchIssues({ userName, repoName })
  }

  render = () => {
    const { className } = this.props
    const { userName, repoName, reposNotFound, repos } = this.state
    const _className = `${styles.container} ${className}`
    console.log(this.state)
    return (
      <div className={_className}>
        <Input className={styles.userName} inputRef={this.fetchRepos} onChange={this.handleChange} error={reposNotFound} name="userName" value={userName} />
        <InputWithSuggestions className={styles.suggestions} name="repoName" onChange={this.handleChange} suggestions={repos} value={repoName} />
        <Button onClick={this.handleClick}>request</Button>
      </div>
    )
  }
}

export default Searching