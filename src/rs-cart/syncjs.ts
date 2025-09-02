import { useSyncExternalStore } from 'react'

export class Store<T> {
  subs = new Set<() => void>()
  constructor(private state: T) {
    this.subscribe = this.subscribe.bind(this)
    this.update = this.update.bind(this)
  }
  get snapshot() {
    return this.state as Readonly<T>
  }
  subscribe(cb: () => void) {
    this.subs.add(cb)
    return () => this.subs.delete(cb)
  }
  update(fn: (state: Readonly<T>) => T) {
    this.set(fn(this.snapshot))
  }
  async update$(fn: (state: Readonly<T>) => Promise<T>) {
    this.set(await fn(this.snapshot))
  }
  set(state: T) {
    if (this.state === state) return
    this.state = state
    this.subs.forEach((cb) => cb())
  }
}

export function useStore<T>(store: Store<T>): Readonly<T>
export function useStore<T, R>(
  store: Store<T>,
  selector: (state: T) => R,
): Readonly<R>
export function useStore<T, R>(store: Store<T>, selector?: (state: T) => R) {
  return useSyncExternalStore(store.subscribe, () => {
    return selector ? selector(store.snapshot) : store.snapshot
  })
}

export function addPersistor<T>(store: Store<T>, key: string): void {
  const state = localStorage.getItem(key)
  if (state) store.set(JSON.parse(state))
  store.subscribe(() => {
    localStorage.setItem(key, JSON.stringify(store.snapshot))
  })
}

export function addLogger<T>(store: Store<T>, key: string): void {
  store.subscribe(() => {
    console.log(
      `[SYNCJS] [${key || ''}] [${new Date().toLocaleTimeString()}]`,
      store.snapshot,
    )
  })
}
