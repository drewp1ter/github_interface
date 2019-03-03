import * as React from 'react'

import { Searching } from '../../containers'
import styles from './issuesViewerLayout.module.scss'
import { Header } from 'components'

const IssuesViewerLayout: React.StatelessComponent = () => (
  <div className={styles.layout}>
    <Header title="Repo issues" />
    <Searching className={styles.searching} />
  </div>
)

export default IssuesViewerLayout