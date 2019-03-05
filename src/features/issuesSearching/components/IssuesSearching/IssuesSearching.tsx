import * as React from 'react'

import { Searching, SearchingResults } from '../../containers'
import styles from './issuesSearching.module.scss'
import { Header } from 'components'

const IssuesSearching: React.StatelessComponent = () => (
  <div className={styles.layout}>
    <Header title="Repo issues" />
    <Searching className={styles.searching} />
    <SearchingResults />
  </div>
)

export default IssuesSearching