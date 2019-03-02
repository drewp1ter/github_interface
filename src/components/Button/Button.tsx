import * as React from 'react'

import styles from './button.module.scss'

export interface IProps {
  readonly children?: React.ReactNode
  readonly className?: string
  readonly theme?: string
  readonly onClick: () => void
}

const Button: React.StatelessComponent<IProps> = ({ className = '', children, onClick, theme = 'default' }) => {

  const _className = `${styles.btn} ${styles[theme]} ${className}`

  return (
    <button className={_className} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
