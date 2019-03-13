import * as issuesSearchingComponents from './components'
import * as issuesSearchingContainers from './containers'
import issuesSearchingReducer, { IssuesSearchingAction, IssuesSearchingState } from './reducer'
import issuesSearchingEpics from './epics'
import issuesSearchingRoutes from './routes'
import * as issuesSearchingActions from './actions'

export {
  issuesSearchingComponents,
  issuesSearchingContainers,
  issuesSearchingReducer,
  issuesSearchingRoutes,
  issuesSearchingEpics,
  issuesSearchingActions,
}
export type IssuesSearchingAction = IssuesSearchingAction
export type IssuesSearchingState = IssuesSearchingState
