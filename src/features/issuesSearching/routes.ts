import { RouteConfig } from 'react-router-config'

import * as containers from './containers'

const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: containers.IssuesSearchingLayout,
  },
  {
    path: '/issue_details/:userName/:repoName/:id',
    exact: true,
    component: containers.IssueDetails,
  },
]

export default routes
