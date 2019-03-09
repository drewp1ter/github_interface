import * as React from 'react'
import classNames from 'classnames'

import Spinner from '../Spinner'
import styles from './button.module.scss'

export interface IProps {
  readonly children?: React.ReactNode
  readonly className?: string
  readonly disabled?: boolean
  readonly loading?: boolean
  readonly theme?: 'default'
  readonly size?: 'sm'
  readonly onClick: () => void
}

const Button: React.StatelessComponent<IProps> = ({
  className = '',
  children, onClick,
  theme = 'default',
  size = 'sm',
  loading = false,
  disabled = false
}) => {

  const btnClass = classNames(styles.button, className)

  return (
    <button className={btnClass} disabled={disabled} data-theme={theme} data-size={size} onClick={onClick}>
      <span className={styles.children} data-loading={loading}>{children}</span>
      {
        loading && <Spinner className={styles.spinner} type="circle" theme="light" />
      }
    </button>
  )
}

export default Button
