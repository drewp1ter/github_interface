import { combineReducers } from 'redux'
import { ActionType } from 'typesafe-actions'

import { IIssue } from './models'
import * as actions from './actions'
import * as types from './actionTypes'

export interface IIssuesViewerState {
  readonly issues: IIssue[]
  readonly fetching: boolean
  readonly error: RequestError
}

export type IssuesViewerAction = ActionType<typeof actions>

export default combineReducers<IIssuesViewerState, IssuesViewerAction>({
  issues: (state = [], action) => action.type === types.FETCH_ISSUES_SUCCESS ? action.payload : state,
  fetching: (state = false, action) => action.type === types.FETCH_ISSUES_REQUEST || state && !(types.FETCH_ISSUES_SUCCESS || types.FETCH_ISSUES_FAILURE),
  error: (state, action) => action.type === types.FETCH_ISSUES_FAILURE ? action.payload : { message: '' }
})