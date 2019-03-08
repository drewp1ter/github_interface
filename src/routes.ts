import { RouteConfig } from 'react-router-config'

import MainLayout from 'components/MainLayout'
import NotFound from 'components/NotFound'
import issuesSearching from 'features/issuesSearching'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: MainLayout,
    routes: [
      ...issuesSearching.routes,
      {
        path: '*',
        component: NotFound
      }
    ]
  }
]

export default routes
