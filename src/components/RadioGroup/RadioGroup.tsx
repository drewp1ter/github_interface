import * as React from 'react'

import styles from './radioGroup.module.scss'

type RadioItem = {
  value: string | number
  label: string
}

export interface IProps {
  readonly items: RadioItem[]
  readonly name: string
  readonly onChange?: (value: string | number, name?: string) => void
  readonly className?: string
  readonly value?: string | number
  readonly theme?: 'default'
}

const RadioGroup: React.StatelessComponent<IProps> = ({ items, value, name, onChange, className = '', theme = 'default' }) => {
  const handleChange = ({ target: { value, name } }: React.ChangeEvent<HTMLInputElement>): void => onChange && onChange(value, name)

  return (
    <div className={className}>
      {items &&
        items.map((item, index) => {
          const id = `${name}_${index}`
          return (
            <label key={index} htmlFor={id} className={styles.radio} data-theme={theme}>
              <input
                type="radio"
                value={item.value}
                name={name}
                onChange={handleChange}
                id={id}
                className={styles.hidden}
                checked={item.value === value}
              />
              <span className={styles.label} />
              {item.label}
            </label>
          )
        })}
    </div>
  )
}

export default RadioGroup
