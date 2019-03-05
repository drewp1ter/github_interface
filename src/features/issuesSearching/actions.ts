import { createAsyncAction } from 'typesafe-actions'
import { IIssuesRequest, IIssue } from './models'

import * as types from './actionTypes'

export const fetchIssues = createAsyncAction(
  types.FETCH_ISSUES_REQUEST,
  types.FETCH_ISSUES_SUCCESS,
  types.FETCH_ISSUES_FAILURE
)<IIssuesRequest, IIssue[], RequestError>()