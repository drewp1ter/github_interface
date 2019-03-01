import * as React from 'react'
import Highlighter from 'react-highlight-words'

import styles from './suggestions.module.scss'

export interface IProps {
  readonly suggestions: []
  readonly name: string
  readonly onSelect: (value: string, name:string) => any
}

export interface IState {
  readonly [key: string]: any
}

class Suggestions extends React.Component<IProps, IState> {

  readonly state = {
    query: '',
    inputFocused: false,
    suggestionIndex: -1,
    suggestionsVisible: true,
  }

  onInputFocus = () => {
    this.setState({ inputFocused: true })
  }

  onInputBlur = () => {
    this.setState({ inputFocused: false })
  }

  onChange = ({ target: { value: query }}: React.ChangeEvent<HTMLInputElement>) => this.setState({ query })

  onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { suggestionIndex, query } = this.state
    const { suggestions } = this.props
    event.preventDefault()
    switch (event.which) {
      case 40: {
        // Arrow down
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
        suggestionIndex >= 0 && this.selectSuggestion(suggestionIndex)
        break
      }
      default:
    }
  }

  onSuggestionClick = (index: number, event: React.MouseEvent<HTMLElement>) => {
    this.selectSuggestion(index)
    event.stopPropagation()
  }

  selectSuggestion = (index: number) => {
    const { suggestions, onSelect, name } = this.props
    if (suggestions.length >= index - 1) {
      this.setState({
        query: suggestions[index],
        suggestionsVisible: false,
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
        <div className={suggestionClass} key={index} onMouseDown={event => this.onSuggestionClick(index, event)}>
          <Highlighter
            highlightClassName={styles.highlighted}
            searchWords={["asdas"]}
            textToHighlight={suggestion}
          />
        </div>
      )
    })

  render = () => {
    const { query, inputFocused, suggestionsVisible } = this.state
    const { suggestions } = this.props
    return (
      <div className={styles.container}>
        <div>
          <input
            className={styles.input}
            value={query}
            ref="textInput"
            disabled={!suggestions.length}
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            onKeyDown={this.onKeyPress}
            onFocus={this.onInputFocus}
            onBlur={this.onInputBlur}
            autoComplete="off"
          />
        </div>
        {
          inputFocused && suggestionsVisible && suggestions && suggestions.length > 0 ?
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