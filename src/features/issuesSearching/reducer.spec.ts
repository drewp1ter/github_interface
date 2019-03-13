import reducer, { IssuesSearchingState } from './reducer'
import * as actions from './actions'
import { Issue } from './models'

const getInitialState = (initial?: Partial<IssuesSearchingState>) => reducer(initial as IssuesSearchingState, {} as any)

describe('IssuesSearching Stories', () => {
  const initialState = getInitialState()

  it('should match a snapshot', () => {
    expect(initialState).toMatchSnapshot()
  })

  it('issues request fetching true', done => {
    const state = reducer(initialState, actions.fetchIssues.request({ userName: '', repoName: '', issuesState: 'all' }))
    expect(state).toEqual({
      ...initialState,
      fetching: true,
    })
    done()
  })

  it('issues fetching success', done => {
    const issues = {
      userName: 'mufdvr',
      repoName: 'test',
      payload: [new Issue()],
    }
    expect(initialState.issues.payload).toHaveLength(0)
    const state = reducer(initialState, actions.fetchIssues.success(issues))
    expect(state).toEqual({
      ...initialState,
      issues,
    })
    done()
  })

  it('issue fetching error', done => {
    const error = {
      message: 'Not found',
      status: 404,
    }
    const state = reducer(initialState, actions.fetchIssues.failure(error))
    expect(state.issues.payload).toHaveLength(0)
    expect(state).toEqual({
      ...initialState,
      error,
    })
    done()
  })
})
