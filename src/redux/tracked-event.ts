import { ActionsObservable, ofType } from 'redux-observable'
import { map, mapTo, tap } from 'rxjs/operators'

import { Action, createAction, noopAction } from './redux-utils'
import { Event, Model, realm, TrackedEvent, TrackedEventModel } from '../model/realm'

export const hydrationRequested = createAction('trackedEvent::hydration-requested')
export const hydrateTrackedEvents = createAction<ReadonlyArray<TrackedEventModel>>('trackedEvent::hydrate')
export const trackedEventDeleted = createAction<TrackedEventModel>('trackedEvent::delete')
export const allTrackedEventsDeleted = createAction('trackedEvent::delete-all')
export const eventTracked = createAction<TrackedEventModel>('trackedEvent::tracked')

export interface TrackedEventState {
  trackedEvents: ReadonlyArray<TrackedEventModel>
}

const initialState: TrackedEventState = { trackedEvents: [] }

export function trackedEventReducer(state: TrackedEventState = initialState, action: Action<any>) {
  switch (action.type) {
    case hydrateTrackedEvents.type:
      return { ...state, trackedEvents: action.payload }

    case trackedEventDeleted.type:
      const idx = state.trackedEvents.findIndex(
        (trackedEvent) => trackedEvent.id === (action.payload as TrackedEventModel).id,
      )

      if (idx === -1) {
        return state
      }

      const nextEvents = [...state.trackedEvents]
      nextEvents.splice(idx, 1)

      return { ...state, trackedEvents: nextEvents }

    case eventTracked.type:
      return { ...state, trackedEvents: [...state.trackedEvents, action.payload] }

    case allTrackedEventsDeleted.type:
      return { ...state, trackedEvents: [] }
  }

  return state
}

const trackedEventsLoaded = (actions$: ActionsObservable<Action>) =>
  actions$.pipe(ofType(hydrationRequested.type), map(() => TrackedEvent.all()), map(hydrateTrackedEvents))

const deleteTrackedEvent = (actions$: ActionsObservable<Action>) =>
  actions$.pipe(
    ofType(trackedEventDeleted.type),
    tap((action: any) => {
      const record = TrackedEvent.getById(action.payload.id)
      realm.write(() => realm.delete(record))
    }),
    mapTo(noopAction()),
  )

const deleteAllTrackedEvents = (actions$: ActionsObservable<Action>) =>
  actions$.pipe(
    ofType(allTrackedEventsDeleted.type),
    tap(() => {
      const records = TrackedEvent.all()
      realm.write(() => realm.delete(records))
    }),
    mapTo(hydrationRequested()),
  )

const createTrackedEvent = (actions$: ActionsObservable<Action>) =>
  actions$.pipe(
    ofType(eventTracked.type),
    // TODO: figure out how to type this nonsense
    tap((action: any) => {
      action.payload.event = Event.getById(action.payload.event.id)
      realm.write(() => realm.create(Model.TrackedEvent, action.payload))
    }),
    mapTo(hydrationRequested()),
  )

export const epics = [trackedEventsLoaded, deleteTrackedEvent, createTrackedEvent, deleteAllTrackedEvents]
