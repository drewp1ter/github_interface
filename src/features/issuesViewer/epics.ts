import Types from 'Types'
import { Epic } from 'redux-observable'
import { filter, switchMap, map, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'

import { fetchIssues } from './actions'
import { IssuesViewerAction } from '../issuesViewer'
import * as apiEndpoints from './apiEndpoints'
import { IIssue } from './models'
import { Interface } from 'readline';

//const filterResponse = (res: {}, interface: any) => {
//  Object.keys(res).reduce((sum, val) => Object.keys(interface)
//}

function pick(obj: any, keys: string[]) {
  return keys.map(k => k in obj ? { [k]: obj[k] } : {})
    .reduce((res, o) => Object.assign(res, o), {});
}

const fetchIssuesAction: Epic<IssuesViewerAction, IssuesViewerAction, Types.RootState, Types.Services> = (action$, state$, { ajax }) =>
  action$.pipe(
    filter(isActionOf(fetchIssues.request)),
    switchMap(action => ajax.getJSON(apiEndpoints.repoIssues(action.payload)).pipe(
      //map((res: any) => res.map((item: any) => ({ created_at: item.created_at, title: item.title }))),
      map((res: any) => res.map((item: IIssue) => pick(item, ['created_at', 'title']))),
      map(fetchIssues.success),
      catchError(error => of(fetchIssues.failure(error)))
    )
    )
  )

export default [
  fetchIssuesAction,
]