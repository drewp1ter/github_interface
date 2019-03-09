import * as React from 'react'
import classNames from 'classnames'

import styles from './inputWithSuggestions.module.scss'

export interface IProps {
  readonly suggestions: string[]
  readonly className?: string
  readonly name?: string
  readonly value?: string
  readonly theme?: 'default'
  readonly hasError?: boolean
  readonly onChange?: (value: string, name?: string, onSelect?: boolean) => void
  readonly placeholder?: string
}

export interface IState {
  readonly suggestions: string[]
  readonly showSuggestions: boolean
  readonly suggestionIndex: number
}

class InputWithSuggestions extends React.Component<IProps, IState> {

  static defaultProps: { theme?: string } = {
    theme: 'default'
  }

  state = {
    suggestions: this.props.suggestions,
    showSuggestions: false,
    suggestionIndex: -1,
  }

  onInputFocus = () => {
    this.setState({ showSuggestions: true })
  }

  onInputBlur = () => {
    this.setState({ showSuggestions: false })
  }

  handleChange = ({ target: { value, name = '' } }: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { onChange } = this.props
      const suggestions: string[] = this.props.suggestions.filter((suggestion: string) => suggestion.includes(value!))
      this.setState({ suggestions, showSuggestions: true, suggestionIndex: -1 })
      onChange && onChange(value, name)
    } catch (e) {
      console.error(e)
    }
  }

  onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    try {
      const { suggestionIndex, suggestions } = this.state
      const { onChange, name } = this.props
      switch (event.which) {
        case 40: { // Arrow down
          event.preventDefault()
          if (suggestionIndex < suggestions.length - 1) {
            const newSuggestionIndex = suggestionIndex + 1
            this.setState({ suggestionIndex: newSuggestionIndex })
            onChange && onChange(suggestions[newSuggestionIndex], name)
          }
          break
        }
        case 38: { // Arrow up
          event.preventDefault()
          if (suggestionIndex > 0) {
            const newSuggestionIndex = suggestionIndex - 1
            this.setState({ suggestionIndex: newSuggestionIndex })
            onChange && onChange(suggestions[newSuggestionIndex], name)
          }
          break
        }
        case 13: { // Enter
          event.preventDefault()
          suggestionIndex >= 0 && this.selectSuggestion(suggestionIndex)
          break
        }
        default:
      }
    } catch (e) {
      console.error(e)
    }
  }

  onSuggestionClick = (event: React.MouseEvent<HTMLElement>) => {
    try {
      const index = event.currentTarget.dataset.index || -1
      this.selectSuggestion(+index)
      event.stopPropagation()
    } catch (e) {
      console.error(e)
    }
  }

  selectSuggestion = (index: number) => {
    try {
      const { onChange, name = '' } = this.props
      const { suggestions } = this.state
      if (suggestions.length >= index - 1) {
        this.setState({
          suggestionIndex: index,
          showSuggestions: false
        })
        onChange && onChange(suggestions[index], name, true)
      }
    } catch (e) {
      console.error(e)
    }
  }

  suggestionsList = (): JSX.Element[] => {
    try {
      return this.state.suggestions.map((suggestion, index) => {
        const suggestionClass = classNames(styles.suggestion, { [styles.suggestionCurrent]: index === this.state.suggestionIndex })
        return (
          <div className={suggestionClass} key={index} data-index={index} onMouseDown={this.onSuggestionClick}>
            {suggestion}
          </div>
        )
      })
    } catch (e) {
      console.error(e)
      return []
    }
  }

  render = () => {
    const { showSuggestions, suggestions } = this.state
    const { className, name, theme, value, hasError, placeholder } = this.props
    const wrpClass = classNames(styles.container, className)
    const inptClass = classNames(styles.input, { [styles.hasError]: hasError })
    return (
      <div className={wrpClass}>
        <input
          value={value}
          name={name}
          className={inptClass}
          data-theme={theme}
          onChange={this.handleChange}
          onKeyPress={this.onKeyPress}
          onKeyDown={this.onKeyPress}
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
          autoComplete="off"
          placeholder={placeholder}
        />
        {
          showSuggestions && suggestions!.length > 0 && (
            <div className={styles.suggestions}>
              <div className={styles.suggestionNote}>
                select variant or continue typing
              </div>
              {this.suggestionsList()}
            </div>
          )
        }
      </div>
    )
  }
}

export default InputWithSuggestions