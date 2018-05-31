import Realm from 'realm'
import uuid from 'uuid'

export enum Model {
  Item = 'Item',
  TrackedItem = 'TrackedItem',
}

export interface ItemModel {
  id: string
  name: string
}

export interface TrackedItemModel {
  id: string
  timestamp: Date
  item: ItemModel
}

export class Item {
  static schema = {
    name: Model.Item,
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
    },
  }

  static create(name: string) {
    db.write(() => {
      db.create(Model.Item, { id: uuid(), name })
    })
  }

  static all() {
    return db.objects<ItemModel>(Model.Item)
  }
}

export class TrackedItem {
  static schema = {
    name: Model.TrackedItem,
    primaryKey: 'id',
    properties: {
      id: 'string',
      timestamp: 'date',
      item: { type: 'Item' },
    },
  }

  static create(item: any) {
    db.write(() => {
      db.create(Model.TrackedItem, { id: uuid(), timestamp: new Date(), item })
    })
  }

  static all() {
    return db
      .objects<TrackedItemModel>(Model.TrackedItem)
      .sorted('timestamp', true)
  }
}

const db = new Realm({ schema: [Item, TrackedItem] })

const items = db.objects(Model.Item)

if (items.length === 0) {
  const defaultItems = [
    { name: 'woke up' },
    { name: 'went to sleep' },
    { name: 'ate a meal' },
    { name: 'ate a snack' },
    { name: 'exercised' },
  ]

  defaultItems.forEach(({ name }) => Item.create(name))
}

export const realm = db
