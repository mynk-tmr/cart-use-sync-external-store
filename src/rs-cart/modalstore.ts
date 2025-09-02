import type { IProduct } from './apistore'
import { addLogger, Store } from './syncjs'

// cart modal

const $modal = new Store<boolean>(false)
addLogger($modal, 'cart_modal')

export const $cartModal = {
  store: $modal,
  actions: {
    open: () => $modal.set(true),
    toggle: () => $modal.update((open) => !open),
  },
}

// details modal

export const $detailsModal = {
  store: new Store<{ open: boolean; item?: IProduct }>({
    open: false,
  }),
  actions: {
    open: (item: IProduct) => $detailsModal.store.set({ open: true, item }),
    close: () => $detailsModal.store.set({ open: false }),
  },
}
