import { Model, realm, TrackedEvent, TrackedEventModel } from '../model/realm'
import { ActionsObservable, ofType } from 'redux-observable'
import { map, mapTo, tap } from 'rxjs/operators'

import { Action, createAction, noopAction } from './redux-utils'

export const hydrationRequested = createAction('trackedEvent::hydration-requested')
export const hydrateTrackedEvents = createAction<ReadonlyArray<TrackedEventModel>>('trackedEvent::hydrate')
export const trackedEventDeleted = createAction<TrackedEventModel>('trackedEvent::delete')
export const eventTracked = createAction<TrackedEventModel>('trackedEvent::tracked')

export interface TrackedEventState {
  trackedEvents: ReadonlyArray<TrackedEventModel>
}

const initialState: TrackedEventState = { trackedEvents: [] }

export function trackedEventReducer(state: TrackedEventState = initialState, action: Action<any>) {
  switch (action.type) {
    case hydrateTrackedEvents.type:
      return { ...state, events: action.payload }

    case trackedEventDeleted.type:
      const idx = state.trackedEvents.findIndex(
        (trackedEvent) => trackedEvent.id === (action.payload as TrackedEventModel).id,
      )

      if (idx === -1) {
        return state
      }

      const nextEvents = [...state.trackedEvents]
      nextEvents.splice(idx, 1)

      return { ...state, events: nextEvents }

    case eventTracked.type:
      return { ...state, events: [...state.trackedEvents, action.payload] }
  }

  return state
}

const trackedEventsLoaded = (actions$: ActionsObservable<Action>) =>
  actions$.pipe(ofType(hydrationRequested.type), map(() => TrackedEvent.all()), map(hydrateTrackedEvents))

const deleteTrackedEvent = (actions$: ActionsObservable<Action>) =>
  actions$.pipe(
    ofType(trackedEventDeleted.type),
    tap((action) => {
      realm.write(() => realm.delete(action.payload))
    }),
    mapTo(noopAction()),
  )

const createTrackedEvent = (actions$: ActionsObservable<Action>) =>
  actions$.pipe(
    ofType(eventTracked.type),
    tap((action) => {
      console.log(action.payload)
      realm.write(() => realm.create(Model.TrackedEvent, action.payload))
    }),
    mapTo(noopAction()),
  )

export const epics = [trackedEventsLoaded, deleteTrackedEvent, createTrackedEvent]
