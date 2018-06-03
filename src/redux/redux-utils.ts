export type ActionType = string

export interface Action<P = void> {
  readonly type: ActionType
  payload?: P
}

export interface ActionCreator<P = void, A = P> {
  readonly type: ActionType
  (payload?: A): Action<P>
}

export function createAction<P = void, A = P>(
  type: ActionType,
  // gross.. mapper is an identity fn by default and requires all sorts of type gymnastics
  mapper: (a: A) => P = (a) => (a as any) as P,
): ActionCreator<P, A> {
  return Object.assign(
    (payload?: A) => {
      if (!payload) {
        return { type }
      }

      return { type, payload: mapper(payload) }
    },
    { type },
  )
}

export const noopAction = createAction('life::noop')
