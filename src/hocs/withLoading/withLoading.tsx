import * as React from 'react'

import { Spinner } from 'components'
import styles from './withLoading.module.scss'

const withLoading = <Props extends { fetching: boolean }>(WrappedComponent: React.ComponentType<Props>) =>
  (props: Props) => {

    return props.fetching ? (
      <div className={styles.spinner}>
        <Spinner type='circle' size="md" />
      </div>
    ) : <WrappedComponent {...props} />

  }

export default withLoading