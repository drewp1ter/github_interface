import MainLayout from 'components/MainLayout'
import issuesSearching from 'features/issuesSearching'

const routes = [
  {
    path: '/',
    component: MainLayout,
    routes: [
      ...issuesSearching.routes,
    ]
  }
]

export default routes
