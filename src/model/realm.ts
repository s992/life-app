import Realm from 'realm'
import uuid from 'uuid'

export enum Model {
  Event = 'Event',
  TrackedEvent = 'TrackedEvent',
}

export interface EventModel {
  id: string
  name: string
}

export interface TrackedEventModel {
  id: string
  timestamp: Date
  event: EventModel
}

export class Event {
  static schema = {
    name: Model.Event,
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
    },
  }

  static create(name: string) {
    db.write(() => {
      db.create(Model.Event, { id: uuid(), name })
    })
  }

  static all() {
    return db.objects<EventModel>(Model.Event)
  }
}

export class TrackedEvent {
  static schema = {
    name: Model.TrackedEvent,
    primaryKey: 'id',
    properties: {
      id: 'string',
      timestamp: 'date',
      event: { type: 'Event' },
    },
  }

  static create(event: EventModel) {
    db.write(() => {
      db.create(Model.TrackedEvent, { id: uuid(), timestamp: new Date(), event })
    })
  }

  static all() {
    return db.objects<TrackedEventModel>(Model.TrackedEvent).sorted('timestamp', true)
  }
}

const db = new Realm({ schema: [Event, TrackedEvent] })

const events = db.objects(Model.Event)

if (events.length === 0) {
  const defaultEvents = [
    { name: 'woke up' },
    { name: 'went to sleep' },
    { name: 'ate a meal' },
    { name: 'ate a snack' },
    { name: 'exercised' },
  ]

  defaultEvents.forEach(({ name }) => Event.create(name))
}

export const realm = db
