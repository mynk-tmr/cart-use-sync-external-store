# 🛒 Cart App with `useSyncExternalStore`

This project demonstrates how to build a **reactive global store** and connect it with React using [`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore) hook.
It replaces heavy state libraries with a tiny custom implementation (`sync.ts`). You can update store from anywhere, even outside react's realm


## 🚀 Features

* **Custom Store (`Store<T>`)**

  * `subscribe` → register listeners
  * `set / update / update$` → sync or async updates
  * `snapshot` → read-only state

* **Hooks**

  * `useStore(store)` → subscribe to full state
  * `useSlice(store, selector)` → subscribe to derived state only

* **Utilities**

  * `addPersistor` → persist store to `localStorage`
  * `addLogger` → console log state updates

* **Cart Demo**

  * Product listing with add/view cart
  * Cart modal with total + item controls
  * Details modal with product info


## 📂 Key Files

* `store/sync.ts` → Store implementation (state, hooks, persist, logger)
* `store/cart.ts` → Cart state & actions
* `store/modal.ts` → Modal state (cart + product details)
* `store/product.ts` → Product fetching
* `ui/**` → UI demo


## 🏃 Run Locally

```bash
bun install && bun dev
```


## 🎯 Takeaway

With less than **70 lines of code**, you get:

* Predictable global state
* Fine-grained subscriptions
* Persistence + logging
* Extensible via your custom addons