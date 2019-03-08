import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import { IIssues, IIssue, IIssuesRequest, createIssue } from '../../models'
import styles from './issueDetails.module.scss'

export interface MatchParams {
  userName: string
  repoName: string
  id: string
}

export interface IProps extends RouteComponentProps<MatchParams> {
  readonly issues: IIssues
  readonly fetching: boolean
  readonly error: RequestError
  readonly fetchIssues: (request: IIssuesRequest) => void
}

export interface IState {
  readonly issue: IIssue
}

class IssueDetails extends React.Component<IProps, IState> {

  state = {
    issue: createIssue()
  }

  componentDidMount = () => {
    const { issues, fetchIssues, match: { params } } = this.props
    if (issues.userName === params.userName && issues.repoName == params.repoName) {
      const issue = issues.payload.find(issue => issue.id === +params.id)
      issue && this.setState({ issue })
    } else {
      fetchIssues({ userName: params.userName, repoName: params.repoName })
    }
  }

  componentWillReceiveProps = (nextProps: IProps) => {
    const { issues, error, match: { params } } = nextProps
    const issue = !error.message && issues.payload.find(issue => issue.id === +params.id)
    issue ? this.setState({ issue }) : console.log(error.message)
  }

  render = () => {
    const { issue } = this.state
    return (
      <div className={styles.item}>
        <a className={styles.avatar} href={issue.user.html_url}>
          <img src={issue.user.avatar_url} alt="" />
          <div className={styles.nick}>{issue.user.login}</div>
        </a>
        <div className={styles.itemBody}>
          <h4>{issue.title}</h4>
          <pre>{issue.body}</pre>
          <br/>
          <span>#{issue.number} openned on {issue.created_at}</span>
        </div>
      </div>
    )
  }
}

export default IssueDetails