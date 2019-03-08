import * as React from 'react'
import classNames from 'classnames'

import styles from './header.module.scss'

export interface IProps {
  readonly title: string
  readonly className?: string
}

const Header: React.StatelessComponent<IProps> = ({ className, title }) => {

  const hdrClass = classNames(styles.header, className)

  return (
    <div className={hdrClass}>
      <h5>{title}</h5>
    </div>
  )
}


Header.defaultProps = {
  className: ''
}

export default Header
