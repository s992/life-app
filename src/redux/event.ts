import { ActionsObservable, ofType } from 'redux-observable'
import { map, mapTo, tap } from 'rxjs/operators'

import { Event, EventModel, Model, realm } from '../model/realm'
import { Action, createAction, noopAction } from './redux-utils'

export const hydrationRequested = createAction('event::hydrate-requested')
export const hydrateEvents = createAction<ReadonlyArray<EventModel>>('event::hydrate')
export const eventDeleted = createAction<EventModel>('event::delete')
export const eventCreated = createAction<EventModel>('event::add')

export interface EventState {
  events: ReadonlyArray<EventModel>
}

const initialState: EventState = { events: [] }

export function eventReducer(state: EventState = initialState, action: Action<any>) {
  switch (action.type) {
    case hydrateEvents.type:
      console.log(state, action.payload)
      return { ...state, events: action.payload }

    case eventDeleted.type:
      const idx = state.events.findIndex((event) => event.id === (action.payload as EventModel).id)

      if (idx === -1) {
        return state
      }

      const nextEvents = [...state.events]
      nextEvents.splice(idx, 1)

      return { ...state, events: nextEvents }

    case eventCreated.type:
      return { ...state, events: [...state.events, action.payload] }
  }

  return state
}

const eventsLoaded = (actions$: ActionsObservable<Action>) =>
  actions$.pipe(ofType(hydrationRequested.type), map(() => Event.all()), map(hydrateEvents))

const deleteEvent = (actions$: ActionsObservable<Action>) =>
  actions$.pipe(
    ofType(eventDeleted.type),
    tap((action) => {
      realm.write(() => realm.delete(action.payload))
    }),
    mapTo(noopAction()),
  )

const createEvent = (actions$: ActionsObservable<Action>) =>
  actions$.pipe(
    ofType(eventCreated.type),
    tap((action) => {
      realm.write(() => realm.create(Model.Event, action.payload))
    }),
    mapTo(noopAction()),
  )

export const epics = [eventsLoaded, deleteEvent, createEvent]
