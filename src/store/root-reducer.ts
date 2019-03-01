import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { reducer as issuesViewer } from 'features/issuesViewer'

const rootReducer = combineReducers({
  routing: routerReducer,
  issuesViewer
})

export default rootReducer
