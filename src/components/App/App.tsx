import * as React from 'react'

import { Provider } from 'react-redux'

import store from 'store'
import * as repoIssuesViewer from 'features/repoIssuesViewer'
import './App.scss'
import 'normalize.css'

const App:React.SFC = () => {
  const { RepoIssuesViewerLayout } = repoIssuesViewer.components
  return (
    <Provider store={store}>
      <RepoIssuesViewerLayout />
    </Provider>
  )
}


export default App