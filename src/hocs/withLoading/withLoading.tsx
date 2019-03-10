import * as React from 'react'

import { Spinner } from 'components'
import styles from './withLoading.module.scss'

const withLoading = <Props extends { fetching: boolean }>(WrappedComponent: React.ComponentType<Props>) => (props: Props) => {
  return props.fetching ? (
    <>
      <WrappedComponent {...props} />
      <Spinner className={styles.spinner} type="circle" size="md" />
    </>
  ) : (
    <WrappedComponent {...props} />
  )
}

export default withLoading
