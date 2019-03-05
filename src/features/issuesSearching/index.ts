import * as components from './components'
import * as containers from './containers'
import reducer, { IssuesSearchingAction, IIssuesSearchingState } from './reducer'
import epics from './epics'
import routes from './routes'

export default { components, containers, reducer, routes }
export { epics }
export type IssuesSearchingAction = IssuesSearchingAction
export type IIssuesSearchingState = IIssuesSearchingState