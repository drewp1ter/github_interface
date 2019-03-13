import { StateObservable, ActionsObservable } from 'redux-observable'
import { Subject, of, throwError } from 'rxjs'
import Types from 'Types'

import * as actions from './actions'
import * as epics from './epics'
import { IIssuesRequest, User, Issue } from './models'
import fx from './fixtures/issues.json'

describe('Issues searching Epics', () => {
  const request: IIssuesRequest = { userName: 'mufdvr', repoName: 'citypark_front', issuesState: 'all' }
  const fetchIssuesAction = actions.fetchIssues.request(request)
  const action$ = ActionsObservable.of(fetchIssuesAction)
  let state$: StateObservable<Types.RootState>
  beforeEach(() => {
    state$ = new StateObservable<Types.RootState>(new Subject<Types.RootState>(), undefined as any)
  })

  it('fetch issues success and create models', done => {
    const services: any = {
      getJSON: (url: string): any => of(fx),
    }

    epics
      .fetchIssuesAction(action$, state$, services)
      .toPromise()
      .then((outputAction: Types.RootAction) => {
        expect(outputAction).toEqual({
          type: '@FETCH_ISSUES_SUCCESS',
          payload: {
            userName: request.userName,
            repoName: request.repoName,
            payload: [
              new Issue(
                333142267,
                '2018-06-18T06:01:34Z',
                'Перевести проекты в закрытый раздел ',
                'Нужно перевести проект в закрытый раздел и добавить меня в админы',
                3,
                new User(13976639, 'evilosa', 'https://avatars3.githubusercontent.com/u/13976639?v=4', 'https://github.com/evilosa')
              ),
            ],
          },
        })
        done()
      })
  })

  it('fetch issues failure by network', done => {
    const services: any = {
      getJSON: (url: string): any => throwError({ message: 'Network Error' }),
    }

    epics
      .fetchIssuesAction(action$, state$, services)
      .toPromise()
      .then((outputAction: Types.RootAction) => {
        expect(outputAction).toEqual({
          type: '@FETCH_ISSUES_FAILURE',
          payload: {
            message: 'Network Error',
          },
        })
        done()
      })
  })

  it('fetch issues failure by 404', done => {
    const services: any = {
      getJSON: (url: string): any =>
        throwError({
          status: 404,
          response: {
            message: 'Not Found!',
          },
        }),
    }

    epics
      .fetchIssuesAction(action$, state$, services)
      .toPromise()
      .then((outputAction: Types.RootAction) => {
        expect(outputAction).toEqual({
          type: '@FETCH_ISSUES_FAILURE',
          payload: {
            message: 'Not Found!',
            status: 404
          },
        })
        done()
      })
  })
})
