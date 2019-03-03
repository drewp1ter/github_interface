import * as components from './components'
import * as containers from './containers'
import reducer, { IssuesViewerAction, IIssuesViewerState } from './reducer'
import epics from './epics'
import routes from './routes'

export default { components, containers, reducer, routes }
export { epics }
export type IssuesViewerAction = IssuesViewerAction
export type IIssuesViewerState = IIssuesViewerState