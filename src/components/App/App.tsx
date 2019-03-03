import * as React from 'react'

import { Provider } from 'react-redux'

import store, { history } from 'store'
import { ConnectedRouter } from 'react-router-redux'
import { renderRoutes } from 'react-router-config'

import routes from 'routes'

import './App.scss'

const App: React.SFC = () =>
  <Provider store={store}>
    <ConnectedRouter store={store} history={history}>{renderRoutes(routes)}</ConnectedRouter>
  </Provider>


export default App