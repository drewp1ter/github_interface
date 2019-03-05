import * as React from 'react'
import { Link } from 'react-router-dom'

import { IIssue } from '../../models'
import styles from './searchingResults.module.scss'

export interface IProps {
  readonly issues: IIssue[]
}

const SearchingResults: React.StatelessComponent<IProps> = ({ issues }) => {

  const issuesList = (): JSX.Element[] => issues.map((issue: IIssue) =>
    <div key={issue.id} className={styles.item}>
      <a className={styles.avatar} href={issue.user.html_url}>
        <img src={issue.user.avatar_url} alt="" />
        <div className={styles.nick}>{issue.user.login}</div>
      </a>
      <div className={styles.itemBody}>
        <h4>{issue.title}</h4>
        <span>#{issue.number} openned on {issue.created_at}</span>
      </div>
    </div>
  )

  return (
    <div className={styles.container}>
      {issuesList()}
    </div>
  )
}

export default SearchingResults