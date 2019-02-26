import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

// import Types from 'Types'
import { composeEnhancers } from './utils'
import rootReducer from './root-reducer'
import rootEpic from './root-epic'
import services from '../services'

const { loadState } = services.localStorage
const initialState = loadState() || {}

export const epicMiddleware = createEpicMiddleware({
  dependencies: services
})

function configureStore(initState?: object) {
  const middlewares = [epicMiddleware]
  const enhancer = composeEnhancers(applyMiddleware(...middlewares))
  return createStore(rootReducer, initState!, enhancer)
}

const store = configureStore(initialState)

epicMiddleware.run(rootEpic)

export default store
