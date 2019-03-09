import * as React from 'react'
import { Link } from 'react-router-dom'

import { IIssues, IIssue } from '../../models'
import styles from './searchingResults.module.scss'

export interface IProps {
  readonly issues: IIssues
}

const SearchingResults: React.StatelessComponent<IProps> = ({ issues }) => {

  const issuesList = (): JSX.Element[] => issues.payload.map((issue: IIssue) => {
    const date = new Date(issue.created_at)
    return (
      <div key={issue.id} className={styles.item}>
        <a className={styles.avatar} href={issue.user.html_url}>
          <img src={issue.user.avatar_url} alt="" />
          <div className={styles.nick}>{issue.user.login}</div>
        </a>
        <div className={styles.itemBody}>
          <Link to={`issue_details/${issues.userName}/${issues.repoName}/${issue.id}`}>
            <h4>{issue.title}</h4>
          </Link>
          <span>#{issue.number} openned on {date.toDateString()}</span>
        </div>
      </div>
    )
  })

  return (
    <div className={styles.container}>
      {issuesList()}
    </div>
  )
}

export default SearchingResults