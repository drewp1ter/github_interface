import { combineReducers } from 'redux'
import { ActionType } from 'typesafe-actions'

import { IIssues } from './models'
import * as actions from './actions'
import * as types from './actionTypes'

export interface IIssuesSearchingState {
  readonly issues: IIssues
  readonly fetching: boolean
  readonly error: RequestError
}

export type IssuesSearchingAction = ActionType<typeof actions>

export default combineReducers<IIssuesSearchingState, IssuesSearchingAction>({
  issues: (state = { userName: '', repoName: '', payload: [] }, action) => action.type === types.FETCH_ISSUES_SUCCESS ? action.payload : state,
  fetching: (state = false, action) => action.type === types.FETCH_ISSUES_REQUEST || state && !(types.FETCH_ISSUES_SUCCESS || types.FETCH_ISSUES_FAILURE),
  error: (state, action) => action.type === types.FETCH_ISSUES_FAILURE ? action.payload : { message: '', status: 0 }
})