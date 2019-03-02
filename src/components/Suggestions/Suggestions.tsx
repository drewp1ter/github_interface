import * as React from 'react'
import Highlighter from 'react-highlight-words'

import styles from './suggestions.module.scss'
import { Input } from 'components'

export interface IProps {
  readonly suggestions: []
  readonly className: string
  readonly name: string
  readonly onSelect: (value: string, name: string) => any
}

export interface IState {
  readonly query: string
  readonly inputFocused: boolean
  readonly suggestionIndex: number
}

class Suggestions extends React.Component<IProps, IState> {

  state = {
    query: '',
    inputFocused: false,
    suggestionIndex: -1,
  }

  onInputFocus = () => {
    this.setState({ inputFocused: true })
  }

  onInputBlur = () => {
    this.setState({ inputFocused: false })
  }

  onChange = (query: string) => this.setState({ query })

  onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { suggestionIndex, query } = this.state
    const { suggestions } = this.props
    switch (event.which) {
      case 40: {
        // Arrow down
        event.preventDefault()
        if (suggestionIndex < suggestions.length - 1) {
          let newSuggestionIndex = suggestionIndex + 1
          let newInputQuery = suggestions[newSuggestionIndex]
          this.setState({
            suggestionIndex: newSuggestionIndex,
            query: newInputQuery
          })
        }
        break
      }
      case 38: {
        // Arrow up
        event.preventDefault()
        if (suggestionIndex >= 0) {
          let newSuggestionIndex = suggestionIndex - 1
          let newInputQuery = newSuggestionIndex === -1 ? query : suggestions[newSuggestionIndex]
          this.setState({
            suggestionIndex: newSuggestionIndex,
            query: newInputQuery
          })
        }
        break
      }
      case 13: {
        // Enter
        event.preventDefault()
        suggestionIndex >= 0 && this.selectSuggestion(suggestionIndex)
        break
      }
      default:
    }
  }

  onSuggestionClick = (event: React.MouseEvent<HTMLElement>) => {
    const index = event.currentTarget.getAttribute('data-index') || -1
    this.selectSuggestion(+index)
    event.stopPropagation()
  }

  selectSuggestion = (index: number) => {
    const { suggestions, onSelect, name } = this.props
    if (suggestions.length >= index - 1) {
      this.setState({
        query: suggestions[index],
        suggestionIndex: index
      })
      onSelect(suggestions[index], name)
    }
  }

  suggestionsList = () =>
    this.props.suggestions.map((suggestion, index) => {
      let suggestionClass = styles.suggestion
      if (index === this.state.suggestionIndex) {
        suggestionClass += ' ' + styles.suggestionCurrent
      }
      return (
        <div className={suggestionClass} key={index} data-index={index} onMouseDown={this.onSuggestionClick}>
          <Highlighter
            highlightClassName={styles.highlighted}
            searchWords={["asdas"]}
            textToHighlight={suggestion}
          />
        </div>
      )
    })

  render = () => {
    const { query, inputFocused } = this.state
    const { suggestions, className } = this.props
    const _className = `${styles.container} ${className}`
    return (
      <div className={_className}>
        <Input
          value={query}
          className={styles.input}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          onKeyDown={this.onKeyPress}
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
          autoComplete="off"
        />
        {
          inputFocused && suggestions && suggestions.length > 0 ?
            <div className={styles.suggestions}>
              <div className={styles.suggestionNote}>
                Выберите вариант или продолжите ввод
              </div>
              {this.suggestionsList()}
            </div>
            : null
        }
      </div>
    )
  }
}

export default Suggestions