import { createStore, applyMiddleware, combineReducers, Reducer, AnyAction } from 'redux'
import {
  createNavigationPropConstructor,
  createNavigationReducer,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers'
import { NavigationState } from 'react-navigation'

import { RootDrawer } from './routes'

export type AppState = {
  readonly nav: NavigationState
}

export const ROOT = 'root'

const navReducer = createNavigationReducer(RootDrawer) as Reducer<NavigationState, AnyAction>
const appReducer = combineReducers<AppState>({ nav: navReducer })
const middleware = createReactNavigationReduxMiddleware<AppState>(ROOT, (state) => state.nav)

export const navigationPropConstructor = createNavigationPropConstructor(ROOT)
export const store = createStore(appReducer, applyMiddleware(middleware))
