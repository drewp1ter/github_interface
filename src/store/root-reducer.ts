import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import issuesViewer from 'features/issuesViewer'

export default combineReducers({
  routing: routerReducer,
  issuesViewer: issuesViewer.reducer
})