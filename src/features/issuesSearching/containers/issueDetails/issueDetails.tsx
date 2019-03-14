import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import { IIssues, IIssue, IIssuesRequest, Issue } from '../../models'
import styles from './issueDetails.module.scss'
import { NotFound, Button } from 'components'

export interface IMatchParams {
  userName: string
  repoName: string
  id: string
}

export interface IProps extends RouteComponentProps<IMatchParams> {
  readonly issues: IIssues
  readonly fetching: boolean
  readonly error: IRequestError
  readonly fetchIssues: (request: IIssuesRequest) => void
}

export interface IState {
  readonly issue: IIssue
  readonly notFound: boolean
}

class IssueDetails extends React.Component<IProps, IState> {
  public state = {
    issue: new Issue(),
    notFound: false,
  }

  public componentDidMount = () => {
    const {
      issues,
      fetchIssues,
      match: { params },
    } = this.props
    if (issues.userName === params.userName && issues.repoName === params.repoName) {
      const issue = issues.payload.find(issue => issue.id === +params.id)
      issue && this.setState({ issue })
    } else {
      fetchIssues({
        userName: params.userName,
        repoName: params.repoName,
        issuesState: 'all',
      })
    }
  }

  public componentWillReceiveProps = (nextProps: IProps) => {
    const {
      issues,
      error,
      match: { params },
    } = nextProps
    const issue = !error.message && issues.payload.find(issue => issue.id === +params.id)
    issue ? this.setState({ issue, notFound: false }) : this.setState({ notFound: true })
  }

  public render = () => {
    const { issue, notFound } = this.state
    const { fetching, history } = this.props
    const date = issue.createdAtFormated
    if (!fetching && notFound) { return <NotFound /> }
    return (
      <>
        <Button className={styles.backButton} onClick={history.goBack}>Back</Button>
        <div className={styles.item}>
          <a className={styles.avatar} href={issue.user.htmlUrl}>
            <img src={issue.user.avatarUrl} alt="" />
            <div className={styles.nick}>{issue.user.login}</div>
          </a>
          <div className={styles.itemBody}>
            <h4>{issue.title}</h4>
            <pre>{issue.body}</pre>
            <br />
            <span>
              #{issue.number} openned on {date}. State: {issue.state}
            </span>
          </div>
        </div>
      </>
    )
  }
}

export default IssueDetails
