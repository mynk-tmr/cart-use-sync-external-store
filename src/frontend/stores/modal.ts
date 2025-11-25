import type { IProduct } from './products';
import { addLogger, Store } from './sync';

const $cart_modal = new Store(false);
const $details_modal = new Store<{ open: boolean; item?: IProduct }>({
  open: false,
});

addLogger($cart_modal, 'cart_modal');
addLogger($details_modal, 'details_modal');

export const Modal = {
  Cart: {
    store: $cart_modal,
    toggle: () => $cart_modal.update((open) => !open),
    isOpen: (open: boolean) => $cart_modal.set(open),
  },
  Details: {
    store: $details_modal,
    open: (item: IProduct) => $details_modal.set({ open: true, item }),
    close: () => $details_modal.set({ open: false }),
  },
};
