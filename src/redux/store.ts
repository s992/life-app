import { createStore, applyMiddleware, combineReducers } from 'redux'

import { middleware as navMiddleware, navReducer, NavState } from './nav'

export type RootState = {
  readonly nav: NavState
}

const rootReducer = combineReducers<RootState>({
  nav: navReducer,
})

export const store = createStore(rootReducer, applyMiddleware(navMiddleware))
