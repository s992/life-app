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
    return { id: uuid(), name }
  }

  static all() {
    return db.objects<EventModel>(Model.Event)
  }

  static getById(id: string) {
    return Event.all().filtered(`id = "${id}"`)[0]
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
    return { id: uuid(), timestamp: new Date(), event }
  }

  static all() {
    return db.objects<TrackedEventModel>(Model.TrackedEvent).sorted('timestamp', true)
  }

  static getByEventId(id: string) {
    return TrackedEvent.all().filtered(`event.id = "${id}"`)
  }
}

const db = new Realm({ schema: [Event, TrackedEvent] })

export const realm = db
