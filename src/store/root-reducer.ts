import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import issuesSearching from 'features/issuesSearching'

export default combineReducers({
  routing: routerReducer,
  issuesViewer: issuesSearching.reducer,
})
