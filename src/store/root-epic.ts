import { combineEpics } from 'redux-observable'

import { epics as issuesViewerEpics } from 'features/issuesViewer'

export default combineEpics(
  ...issuesViewerEpics,
)
