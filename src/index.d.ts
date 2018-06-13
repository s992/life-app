declare module 'react-native-calendar-events' {
  type CalendarId = string
  type EventId = string

  enum AuthResult {
    Denied = 'denied',
    Restricted = 'restricted',
    Authorized = 'authorized',
    Undetermined = 'undetermined',
  }

  enum Recurrence {
    Daily = 'daily',
    Weekly = 'weekly',
    Monthly = 'monthly',
    Yearly = 'yearly',
  }

  enum Availability {
    Busy = 'busy',
    Free = 'free',
  }

  interface RecurrenceRule {
    frequency: Recurrence
    endDate: Date
    ocurrence: number
    interval: number
  }

  interface Alarm {
    date: Date
  }

  interface Attendee {
    name: string
    email: string
  }

  interface EventOptions {
    exceptionDate?: Date
  }

  interface Event {
    id: EventId
    calendarId: CalendarId
    title: string
    startDate: Date
    endDate: Date
    allDay: boolean
    recurrence?: Recurrence
    recurrenceRule?: RecurrenceRule
    url: string
    location: string
    alarms: Alarm[]
    attendees: Attendee[]
  }

  interface Calendar {
    id: CalendarId
    isPrimary: boolean
    type: string
    allowsModifications: boolean
    allowedAvailabilities: Availability
    title: string
    source: string
  }

  export function authorizationStatus(): Promise<AuthResult>
  export function authorizeEventStore(): Promise<AuthResult>
  export function findCalendars(): Promise<Calendar[]>
  export function findEventById(id: EventId): Promise<Event>
  export function fetchAllEvents(startDate: Date, endDate: Date, calendars: CalendarId[]): Promise<Event[]>
  export function saveEvent(title: string, details: Partial<Event>, options?: EventOptions): Promise<EventId>
  export function removeEvent(id: EventId, options?: EventOptions): Promise<boolean>
}
