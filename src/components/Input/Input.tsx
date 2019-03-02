import * as React from 'react'

import styles from './input.module.scss'

export interface IProps {
  readonly onChange?: (value: string, name: string) => void
  readonly inputRef?: (node: HTMLInputElement) => void
  readonly type?: string
  readonly name?: string
  readonly theme?: string
  readonly error?: boolean
  readonly className?: string
  readonly value?: string | number
  readonly [key: string]: any
}

const Input: React.StatelessComponent<IProps> = ({
  type = 'text',
  className = '',
  theme='default',
  error = false,
  onChange,
  inputRef,
  ...inputProps
}) => {

  const handleChange = ({ target: { value, name } }: React.ChangeEvent<HTMLInputElement>): void => onChange && onChange(value, name)

  const _className = `${styles.input} ${styles[theme]} ${error ? styles.error : ''} ${className}`

  return (
    <input type={type} ref={inputRef} className={_className} onChange={handleChange} {...inputProps} />
  )
}

export default Input
