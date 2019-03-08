import { RouteConfig } from 'react-router-config'

import * as components from './components'
import * as containers from './containers'

const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: components.IssuesSearching
  },
  {
    path: '/issue_details/:userName/:repoName/:id',
    exact: true,
    component: containers.IssueDetails
  }
]

export default routes