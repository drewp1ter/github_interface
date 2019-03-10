import { combineEpics } from 'redux-observable'

import { epics as issuesSearchingEpics } from 'features/issuesSearching'

export default combineEpics(...issuesSearchingEpics)
