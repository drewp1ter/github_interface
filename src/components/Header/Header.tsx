import * as React from 'react'

import styles from './header.module.scss'

export interface IProps {
  readonly title: string
  readonly className?: string
}

export const Header: React.StatelessComponent<IProps> = (props) => {

  const { className, title } = props

  return (
    <div className={[styles.header, className].join(' ')}>
      <h5>{title}</h5>
    </div>
  )
}

Header.defaultProps = {
  className: ''
}

export default Header
