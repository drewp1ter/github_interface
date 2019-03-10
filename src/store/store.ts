import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

import Types from 'Types'
import { composeEnhancers } from './utils'
import rootReducer from './root-reducer'
import rootEpic from './root-epic'
import services from '../services'

export const history = createHistory()

//const { loadState } = services.localStorage
const initialState = {}

const epicMiddleware = createEpicMiddleware<Types.RootAction, Types.RootAction, Types.RootState>({
  dependencies: services,
})

const routerMW = routerMiddleware(history)

function configureStore(initState?: object) {
  const middlewares = [epicMiddleware, routerMW]
  const enhancer = composeEnhancers(applyMiddleware(...middlewares))
  return createStore(rootReducer, initState!, enhancer)
}

const store = configureStore(initialState)

epicMiddleware.run(rootEpic)

export default store
