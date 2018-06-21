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
  createdOn: Date
}

export interface TrackedEventModel {
  id: string
  timestamp: Date
  note?: string
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
      createdOn: 'date',
    },
  }

  static create(name: string, calendarSync = false) {
    db.write(() => db.create(Model.Event, { id: uuid(), name, calendarSync, createdOn: new Date() }))
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
      note: 'string?',
      event: { type: 'Event' },
    },
  }

  static async create(event: EventModel, note?: string) {
    const timestamp = new Date()

    db.write(() => db.create(Model.TrackedEvent, { id: uuid(), timestamp, event, note }))

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

  static update(id: string, timestamp: Date) {
    db.write(() => db.create(Model.TrackedEvent, { id, timestamp }, true))
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
      realm.create(Model.Event, { id: uuid(), name, calendarSync: false, createdOn: new Date() })
    })
  })
}

const schemas = [
  {
    schema: [Event, TrackedEvent],
    schemaVersion: 1,
    migration: (oldRealm: Realm, newRealm: Realm) => {
      if (oldRealm.schemaVersion === 1) {
        return
      }

      const newObjects = newRealm.objects<EventModel>(Model.Event)

      for (let i = 0; i < newObjects.length; i++) {
        newObjects[i].calendarSync = newObjects[i].calendarSync || false
      }
    },
  },
  {
    schema: [Event, TrackedEvent],
    schemaVersion: 2,
    migration: (oldRealm: Realm, newRealm: Realm) => {
      if (oldRealm.schemaVersion === 2) {
        return
      }

      const newObjects = newRealm.objects<EventModel>(Model.Event)
      const now = new Date()

      for (let i = 0; i < newObjects.length; i++) {
        newObjects[i].createdOn = now
      }
    },
  },
  {
    schema: [Event, TrackedEvent],
    schemaVersion: 3,
    migration: (oldRealm: Realm, newRealm: Realm) => {
      if (oldRealm.schemaVersion === 3) {
        return
      }

      const newObjects = newRealm.objects<TrackedEventModel>(Model.TrackedEvent)

      for (let i = 0; i < newObjects.length; i++) {
        newObjects[i].note = undefined
      }
    },
  },
]

let nextSchemaIndex = Realm.schemaVersion(Realm.defaultPath)

while (nextSchemaIndex < schemas.length) {
  const migratedRealm = new Realm(schemas[nextSchemaIndex++])
  migratedRealm.close()
}

const db = new Realm(schemas[schemas.length - 1])

createDefaultEvents(db)

export const realm = db
