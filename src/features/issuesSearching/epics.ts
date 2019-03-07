import Types from 'Types'
import { Epic } from 'redux-observable'
import { filter, switchMap, map, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'

import { fetchIssues } from './actions'
import { IssuesSearchingAction } from './reducer'
import * as apiEndpoints from './apiEndpoints'
import { IIssue } from './models'

const fetchIssuesAction: Epic<IssuesSearchingAction, IssuesSearchingAction, Types.RootState, Types.Services> = (action$, state$, { ajax, pick }) =>
  action$.pipe(
    filter(isActionOf(fetchIssues.request)),
    switchMap(action => ajax.getJSON(apiEndpoints.repoIssues(action.payload)).pipe(
      map((res: any) => res.map((item: IIssue) => {
        const picked = pick<IIssue>(item, ['id', 'number', 'created_at', 'title', 'body', 'user'])
        return {
          ...picked,
          user: pick(picked.user, ['avatar_url', 'login', 'html_url'])
        }
      })),
      map(payload => ({
        ...action.payload,
        payload
      })),
      map(fetchIssues.success),
      catchError(error => of(fetchIssues.failure(error)))
    )
    )
  )

export default [
  fetchIssuesAction,
]