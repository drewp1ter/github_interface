import { combineEpics } from 'redux-observable'

import { issuesSearchingEpics } from 'features/issuesSearching'

export default combineEpics(issuesSearchingEpics)
