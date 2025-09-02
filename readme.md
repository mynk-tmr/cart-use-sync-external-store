# 🛒 Cart App with `useSyncExternalStore`

This project demonstrates how to build a **reactive global store** in React using the native [`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore) hook.
It replaces heavy state libraries with a tiny custom implementation (`syncjs.ts`). You can update store from anywhere, even outside react's realm


## 🚀 Features

* **Custom Store (`Store<T>`)**

  * `subscribe` → register listeners
  * `set / update / update$` → sync or async updates
  * `snapshot` → read-only state

* **Hooks**

  * `useStore(store)` → subscribe to full state
  * `useStore(store, selector)` → subscribe to derived state only

* **Utilities**

  * `addPersistor` → persist store to `localStorage`
  * `addLogger` → console log state updates

* **Cart Demo**

  * Product listing with add/view cart
  * Cart modal with total + item controls
  * Details modal with product info


## 📂 Key Files

* `syncjs.ts` → Store implementation (state, hooks, persist, logger)
* `cartstore.ts` → Cart state & actions
* `modalstore.ts` → Modal state (cart + product details)
* `apistore.ts` → Product fetching
* `CartPage.tsx` → UI demo


## 🏃 Run Locally

```bash
npm install # or bun install
node --run dev  #bun dev
```


## 🎯 Takeaway

With less than **100 lines of code**, you get:

* Predictable global state
* Fine-grained subscriptions
* Persistence + logging
* Extensible via your custom addons