import * as React from 'react'

import styles from './header.module.scss'

export interface IProps {
  readonly title: string
  readonly className?: string
}

const Header: React.StatelessComponent<IProps> = ({ className, title }) => {

  const _className = `${styles.header} ${className}`

  return (
    <div className={_className}>
      <h5>{title}</h5>
    </div>
  )
}


Header.defaultProps = {
  className: ''
}

export default Header
