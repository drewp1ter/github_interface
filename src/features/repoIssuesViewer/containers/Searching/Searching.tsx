import * as React from 'react'
import { Subject, from, of } from 'rxjs'
import { debounceTime, map, tap, catchError, switchMap, filter } from 'rxjs/operators'
import axios from 'axios'

import { Input } from 'components'
import { userRepos } from '../../apiEndpoints'

export interface IProps {
  readonly findUser: (name: string) => void
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
    userName: '',
    repos: [],
    reposNotFound: false
  }

  private reposQuery$ = new Subject()

  componentDidMount = () => {
    this.reposQuery$.pipe(
      tap(() => this.setState({
        reposNotFound: false
      })),
      filter(name => name !== ''),
      debounceTime(1000),
      switchMap(name => from(axios.get(userRepos(name))).pipe(
        map(res => res.data.map((item: any): string => item.name)),
        catchError(() => {
          this.setState({ reposNotFound: true })
          return of([])
        })
      ))
    ).subscribe(repos => this.setState({ repos }))
  }


  handleChange = (value: string, name: string):void => {
    this.setState({ [name]: value })
    this.reposQuery$.next(value)
  }

  render = () => {
    const { className } = this.props
    const { userName, reposNotFound, repos } = this.state
    console.log(repos)
    return (
      <div className={className}>
        <Input onChange={this.handleChange} error={reposNotFound} name="userName" value={userName} />
      </div>
    )
  }
}

export default Searching