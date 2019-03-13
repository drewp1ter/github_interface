import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { issuesSearchingReducer } from 'features/issuesSearching'

export default combineReducers({
  routing: routerReducer,
  issuesViewer: issuesSearchingReducer,
})
