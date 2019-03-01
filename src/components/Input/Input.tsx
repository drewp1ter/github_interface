import * as React from 'react'

import styles from './input.module.scss'

export interface IProps {
  readonly onChange?: (value: string, name: string) => void
  readonly inputRef?: (node: HTMLInputElement) => void
  readonly type?: string
  readonly name?: string
  readonly error?: boolean
  readonly className?: string
  readonly value?: string | number
  readonly [key: string]: any
}

export const Input: React.StatelessComponent<IProps> = ({ onChange, inputRef, error, className, ...inputProps }) => {

  const handleChange = ({ target: { value, name } }: React.ChangeEvent<HTMLInputElement>): void => onChange && onChange(value, name)

  return (
    <input ref={inputRef} className={[styles.input, error ? styles.error : [], className].join(' ')} onChange={handleChange} {...inputProps} />
  )
}

Input.defaultProps = {
  type: 'text',
  className: '',
  error: false
}

export default Input
