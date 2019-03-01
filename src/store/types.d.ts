import { StateType } from 'typesafe-actions'
import { IssuesViewerAction } from 'features/issuesViewer'
import rootReducer from './root-reducer'

declare module 'Types' {
  export type RootState = StateType<typeof rootReducer>
  export type RootAction = IssuesViewerAction
}
