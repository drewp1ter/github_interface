import * as React from 'react'
import { toast } from 'react-toastify'

import { Searching } from '..'
import { SearchingResults } from '../../components'
import styles from './issuesSearchingLayout.module.scss'
import { Header } from 'components'
import { IssuesSearchingState } from '../../reducer'

class IssuesSearchingLayout extends React.Component<IssuesSearchingState> {
  public componentWillReceiveProps = (nextProps: IssuesSearchingState) => {
    const {
      error: { message },
    } = nextProps
    message && toast.error(message)
  }

  public render = () => {
    const { issues } = this.props
    return (
      <div className={styles.layout}>
        <Header title="GitHub Inteface" />
        <Searching className={styles.searching} />
        <SearchingResults issues={issues} />
      </div>
    )
  }
}

export default IssuesSearchingLayout
