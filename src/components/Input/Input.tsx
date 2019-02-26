import * as React from 'react'

import styles from './input.module.scss'

export interface IProps {
  readonly onChange: (value: string, name: string) => void
  readonly type?: string
  readonly name?: string
  readonly error?: boolean
  readonly className?: string
  readonly value: string | number
  readonly [key: string]: any
}

export const Input: React.StatelessComponent<IProps> = (props) => {

  const { onChange, error, className, ...inputProps } = props

  const handleChange = ({ target: { value, name } }: React.ChangeEvent<HTMLInputElement>): void =>
    onChange(value, name)

  return (
    <input className={[styles.input, error ? styles.error : [], className].join(' ')} onChange={handleChange} {...inputProps} />
  )
}

Input.defaultProps = {
  type: 'text',
  className: '',
  error: false
}

export default Input
