import { RouteConfig } from 'react-router-config'

import MainLayout from 'components/MainLayout'
import NotFound from 'components/NotFound'
import { issuesSearchingRoutes } from 'features/issuesSearching'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: MainLayout,
    routes: [
      ...issuesSearchingRoutes,
      {
        path: '*',
        component: NotFound,
      },
    ],
  },
]

export default routes
