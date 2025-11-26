import { useRef, useSyncExternalStore } from 'react';

export class Store<T> {
  subs = new Set<() => void>();
  constructor(private state: T) {}
  get snapshot() {
    return this.state as Readonly<T>;
  }
  subscribe(cb: () => void) {
    this.subs.add(cb);
    return () => this.subs.delete(cb);
  }
  update(fn: (state: Readonly<T>) => T) {
    this.set(fn(this.snapshot));
  }
  async update$(fn: (state: Readonly<T>) => Promise<T>) {
    this.set(await fn(this.snapshot));
  }
  set(state: T) {
    if (this.state === state) return;
    this.state = state;
    for (const cb of this.subs) cb();
  }
}

export function useStore<T>(store: Store<T>): Readonly<T> {
  return useSyncExternalStore(
    (cb) => store.subscribe(cb),
    () => store.snapshot,
  );
}

export function useSlice<T, R>(
  store: Store<T>,
  selector: (state: T) => R,
  eqFn: (old: R, next: R) => boolean = Object.is,
): Readonly<R> {
  const slice = useRef(selector(store.snapshot));
  return useSyncExternalStore(
    (cb) => store.subscribe(cb),
    () => {
      const next = selector(store.snapshot);
      if (!eqFn(slice.current, next)) slice.current = next;
      return slice.current;
    },
  );
}

export function addPersistor<T>(store: Store<T>, key: string): void {
  const state = localStorage.getItem(key);
  if (state) store.set(JSON.parse(state));
  store.subscribe(() => {
    localStorage.setItem(key, JSON.stringify(store.snapshot));
  });
}

export function addLogger<T>(store: Store<T>, key: string): void {
  store.subscribe(() => {
    console.log(
      `[SyncTs] [${key}] [${new Date().toLocaleTimeString()}]`,
      store.snapshot,
    );
  });
}
