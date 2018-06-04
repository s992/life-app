import { Reducer, AnyAction } from 'redux'
import {
  createNavigationPropConstructor,
  createNavigationReducer,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers'
import { NavigationState } from 'react-navigation'

import { RootDrawer } from '../routes'
import { RootState } from './store'
import { createAction } from './redux-utils'

export type NavState = NavigationState

// the definitely-typed types for react-navigation don't expose DrawerAction, so we're just gonna do this.
export const toggleDrawer = createAction('Navigation/TOGGLE_DRAWER')

export const ROOT = 'root'
export const navReducer = createNavigationReducer(RootDrawer) as Reducer<NavState, AnyAction>
export const middleware = createReactNavigationReduxMiddleware<RootState>(ROOT, (state) => state.nav)
export const navigationPropConstructor = createNavigationPropConstructor(ROOT)
