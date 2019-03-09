import * as React from 'react'
import { of, fromEvent } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { debounceTime, map, tap, catchError, switchMap, filter, pluck, timeout } from 'rxjs/operators'
import classNames from 'classnames'

import { Input, Button, InputWithSuggestions, Spinner, RadioGroup } from 'components'
import { userRepos } from '../../apiEndpoints'
import { IIssuesRequest } from '../../models'
import { fetchIssues } from '../../actions'
import { IIssuesSearchingState } from '../../reducer'
import styles from './searching.module.scss'

interface PropsFromDispatch {
  fetchIssues: typeof fetchIssues.request
}

interface IProps {
  readonly className?: string
}

interface IState extends IIssuesRequest {
  readonly [key: string]: any
  readonly reposSuggestions: string[],
  readonly reposNotFound: boolean
  readonly reposFetching: boolean
}

class Searching extends React.Component<IProps & PropsFromDispatch & IIssuesSearchingState, IState> {

  static defaultProps = {
    className: ''
  }

  state: IState = {
    userName: 'mufdv',
    repoName: '',
    reposSuggestions: [],
    reposNotFound: false,
    reposFetching: false,
    issuesState: 'all'
  }

  userNameSubscription: any = null

  componentWillUnmount = () => this.userNameSubscription.unsubscribe()

  handleChange = (value: string | number, name = 'def', onSelect = false): void =>
    this.setState({ [name]: value }, () => onSelect && this.handleClick())

  handleClick = () => {
    const { fetchIssues } = this.props
    const { userName, repoName, issuesState } = this.state
    fetchIssues({ userName, repoName, issuesState })
  }

  fetchRepos = (node: HTMLInputElement) => {
    try {
      if (!node) return
      this.userNameSubscription = fromEvent(node, 'keyup').pipe(
        tap(() => this.setState({ reposNotFound: false })),
        pluck('target', 'value'),
        map(value => value as string),
        filter(value => value !== ''),
        debounceTime(800),
        tap(() => this.setState({ reposFetching: true })),
        switchMap(value => ajax.getJSON(userRepos(value)).pipe(
          timeout(10000),
          map(res => res as { name: string }[]),
          map(res => res.map(({ name }) => name)),
          catchError(() => {
            this.setState({
              reposNotFound: true,
              reposFetching: false
            })
            return of([])
          })
        ))
      ).subscribe(reposSuggestions => this.setState({
        reposSuggestions,
        reposFetching: false
      }))
    } catch (e) {
      console.error(e)
    }
  }

  render = () => {
    const { className, fetching } = this.props
    const { userName, repoName, reposNotFound, reposSuggestions, reposFetching, issuesState } = this.state
    const wrpClass = classNames(styles.wrapper, className)
    return (
      <div className={wrpClass}>
        <div>
          <label className={styles.label}>User name</label>
          <Input
            className={styles.userNameInput}
            inputRef={this.fetchRepos}
            onChange={this.handleChange}
            hasError={reposNotFound}
            name="userName"
            value={userName}
          />
        </div>
        <div className={styles.spinner}>
          {reposFetching && <Spinner />}
        </div>
        <div className={styles.repoName}>
          <label className={styles.label}>Repository name</label>
          <InputWithSuggestions
            name="repoName"
            onChange={this.handleChange}
            suggestions={reposSuggestions}
            value={repoName}
          />
        </div>
        <div>
          <label className={styles.label}>Status</label>
          <RadioGroup
            className={styles.radio}
            items={[
              { value: 'all', label: 'All' },
              { value: 'open', label: 'Open' },
              { value: 'closed', label: 'Closed' }
            ]}
            name="issuesState"
            value={issuesState}
            onChange={this.handleChange}
          />
        </div>
        <Button onClick={this.handleClick} disabled={fetching} loading={fetching}>Search</Button>
      </div>
    )
  }
}

export default Searching