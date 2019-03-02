import Types from 'Types'
import { Epic } from 'redux-observable'
import { filter, switchMap, map, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'

import { fetchIssues } from './actions'
import { IssuesViewerAction } from '../issuesViewer'
import * as apiEndpoints from './apiEndpoints'
import { IIssue } from './models'

const fetchIssuesAction: Epic<IssuesViewerAction, IssuesViewerAction, Types.RootState, Types.Services> = (action$, state$, { ajax, pick }) =>
  action$.pipe(
    filter(isActionOf(fetchIssues.request)),
    switchMap(action => ajax.getJSON(apiEndpoints.repoIssues(action.payload)).pipe(
      map((res: any) => res.map((item: IIssue) => {
        const picked = pick<IIssue>(item, ['id', 'number', 'created_at', 'title', 'user'])
        return {
          ...picked,
          user: pick(picked.user, ['avatar_url', 'login', 'html_url'])
        }
      })),
      map(fetchIssues.success),
      catchError(error => of(fetchIssues.failure(error)))
    )
    )
  )

export default [
  fetchIssuesAction,
]