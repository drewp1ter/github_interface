import * as React from 'react'

import { Provider } from 'react-redux'

import store from 'store'
import * as issuesViewer from 'features/issuesViewer'
import './App.scss'
import 'normalize.css'

const App:React.SFC = () => {
  const { RepoIssuesViewerLayout } = issuesViewer.components
  return (
    <Provider store={store}>
      <RepoIssuesViewerLayout />
    </Provider>
  )
}


export default App