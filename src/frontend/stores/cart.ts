import { addPersistor, Store } from './sync';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  count: number;
}

const $cart = new Store<CartItem[]>([]);
addPersistor($cart, 'cart');

export const Cart = {
  Store: $cart,
  Item: {
    add(item: Omit<CartItem, 'count'>) {
      $cart.update((cart) => [...cart, { ...item, count: 1 }]);
    },
    remove(id: number) {
      $cart.update((cart) => cart.filter((item) => item.id !== id));
    },
    changeCount(id: number, diff = 1) {
      $cart.update((cart) =>
        cart.map((item) =>
          item.id === id ? { ...item, count: item.count + diff } : item,
        ),
      );
    },
  },
  Self: {
    clear() {
      $cart.set([]);
    },
    cleanUp() {
      $cart.update((cart) => cart.filter((item) => item.count > 0));
    },
  },
};
