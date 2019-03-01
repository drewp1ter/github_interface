import * as React from 'react'
import { from, of, fromEvent } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { debounceTime, map, tap, catchError, switchMap, filter, pluck } from 'rxjs/operators'

import { Input, Suggestions } from 'components'
import { userRepos } from '../../apiEndpoints'
import { IIssuesRequest, IIssue } from '../../models'
import { string } from 'prop-types';

export interface IProps {
  readonly findUser: (name: string) => void
  readonly fetchIssues: (request: IIssuesRequest) => void
  readonly issues: IIssue[]
  readonly className?: string
}

export interface IState {
  readonly [key: string]: any
  readonly repos: [],
  readonly reposNotFound: boolean
}

class Searching extends React.Component<IProps, IState> {

  static defaultProps = {
    className: ''
  }

  readonly state: IState = {
    userName: 'muf',
    repos: [],
    reposNotFound: false
  }

  handleChange = (value: string, name: string): void => this.setState({ [name]: value })

  fetchRepos = (node: HTMLInputElement) => {
    fromEvent(node, 'keyup').pipe(
      tap(() => this.setState({
        reposNotFound: false
      })),
      pluck('target', 'value'),
      filter(value => value !== ''),
      debounceTime(1000),
      switchMap(value => ajax.getJSON<IState>(userRepos(value)).pipe(
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
    const { className, issues } = this.props
    const { userName, reposNotFound, repos } = this.state
    console.log(this.props)
    return (
      <div className={className}>
        <div>
          <Input inputRef={this.fetchRepos} onChange={this.handleChange} error={reposNotFound} name="userName" value={userName} />
          <Suggestions name="repoName" onSelect={this.handleChange} suggestions={repos} />
          <button onClick={this.handleClick}>request</button>
        </div>
      </div>
    )
  }
}

export default Searching