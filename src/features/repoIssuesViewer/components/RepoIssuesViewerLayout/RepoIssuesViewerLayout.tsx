import * as React from 'react'

import { Searching } from '../../containers'
import styles from './repoIssuesViewerLayout.module.scss'
import { Header } from 'components'

const repoIssuesLayout: React.StatelessComponent = () => (
  <div className={styles.layout}>
    <Header title="Repo issues" />
    <Searching className={styles.searching} findUser={() => { }} />
  </div>
)

export default repoIssuesLayout