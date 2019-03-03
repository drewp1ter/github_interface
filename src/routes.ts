import MainLayout from 'components/MainLayout'
import issuesViewer from 'features/issuesViewer'

const routes = [
  {
    path: '/',
    component: MainLayout,
    routes: [
      ...issuesViewer.routes,
    ]
  }
]

export default routes
