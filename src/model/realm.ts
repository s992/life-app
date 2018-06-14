import Realm from 'realm'
import uuid from 'uuid'
import RNCalendarEvents from 'react-native-calendar-events'

export enum Model {
  Event = 'Event',
  TrackedEvent = 'TrackedEvent',
}

export interface EventModel {
  id: string
  name: string
  calendarSync: boolean
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
      calendarSync: 'bool',
    },
  }

  static create(name: string, calendarSync = false) {
    db.write(() => db.create(Model.Event, { id: uuid(), name, calendarSync }))
  }

  static update(id: string, name: string, calendarSync: boolean) {
    db.write(() => db.create(Model.Event, { id, name, calendarSync }, true))
  }

  static delete(event: EventModel) {
    db.write(() => {
      const orphans = TrackedEvent.getByEventId(event.id)
      db.delete([...orphans, event])
    })
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

  static async create(event: EventModel) {
    const timestamp = new Date()

    db.write(() => db.create(Model.TrackedEvent, { id: uuid(), timestamp, event }))

    if (event.calendarSync) {
      const calendars = await RNCalendarEvents.findCalendars()
      const primary = calendars.find((calendar) => calendar.isPrimary)

      if (!primary) {
        return
      }

      await RNCalendarEvents.saveEvent(event.name, {
        calendarId: primary.id,
        startDate: timestamp,
        endDate: timestamp,
      })
    }
  }

  static delete(trackedEvent: TrackedEventModel) {
    db.write(() => db.delete(trackedEvent))
  }

  static deleteAll() {
    db.write(() => db.delete(TrackedEvent.all()))
  }

  static all() {
    return db.objects<TrackedEventModel>(Model.TrackedEvent).sorted('timestamp', true)
  }

  static getById(id: string) {
    return TrackedEvent.all().filtered(`id = "${id}"`)[0]
  }

  static getByEventId(id: string) {
    return TrackedEvent.all().filtered(`event.id = "${id}"`)
  }
}

function createDefaultEvents(realm: Realm) {
  const events = Event.all()

  if (events.length !== 0) {
    return
  }

  const defaultEvents = ['Woke up', 'Went to sleep', 'Ate a meal', 'Ate a snack', 'Exercised']

  db.write(() => {
    defaultEvents.forEach((name) => {
      realm.create(Model.Event, { id: uuid(), name, calendarSync: false })
    })
  })
}

const db = new Realm({
  schema: [Event, TrackedEvent],
  schemaVersion: 1,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion === 1) {
      return
    }

    const newObjects = newRealm.objects<EventModel>(Model.Event)

    for (let i = 0; i < newObjects.length; i++) {
      newObjects[i].calendarSync = newObjects[i].calendarSync || false
    }
  },
})

createDefaultEvents(db)

export const realm = db
