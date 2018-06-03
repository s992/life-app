import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { merge } from 'rxjs'

import { middleware as navMiddleware, navReducer, NavState } from './nav'
import { epics as eventEpics, eventReducer, EventState } from './event'
import { epics as trackedEventEpics, trackedEventReducer, TrackedEventState } from './tracked-event'

export type AppState = {
  readonly event: EventState
  readonly nav: NavState
  readonly trackedEvent: TrackedEventState
}

// combineEpics that comes with redux-observable is throwing an error when
// attempting to defineProperty on a function name. not sure if the issue
// is with my config or what, but just re-implementing the logic here without
// the defineProperty call. can't be bothered to type it.
const combineEpics = (...epics: any[]) => {
  return (...args: any[]) =>
    merge(
      ...epics.map((epic) => {
        const output$ = epic(...args)

        if (!output$) {
          throw new TypeError(
            `combineEpics: one of the provided Epics "${epic.name ||
              '<anonymous>'}" does not return a stream. Double check you\'re not missing a return statement!`,
          )
        }

        return output$
      }),
    )
}

const rootReducer = combineReducers<AppState>({
  event: eventReducer,
  nav: navReducer,
  trackedEvent: trackedEventReducer,
})

// not sure why typing is messed up on this..
const rootEpic = combineEpics(...eventEpics, ...trackedEventEpics) as any
const epicMiddleware = createEpicMiddleware()

export const store = createStore(rootReducer, applyMiddleware(navMiddleware, epicMiddleware))

epicMiddleware.run(rootEpic)
