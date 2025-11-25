import { useEffect, useRef } from 'react';
import { Cart, type CartItem } from '../stores/cart';
import { Modal } from '../stores/modal';
import { useSlice, useStore } from '../stores/sync';

export default function CartDisplay() {
  const open = useStore(Modal.Cart.store);
  const length = useSlice(Cart.Store, (c) => c.length);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.dataset.id === 'view_cart') return;
      if (ref.current && !ref.current.contains(target)) {
        Modal.Cart.isOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  return (
    <div ref={ref} className="fixed right-4 top-4">
      <button
        onClick={Modal.Cart.toggle}
        type="button"
        className="rounded-full size-10 text-lg bg-white text-black cursor-pointer"
      >
        📦
      </button>
      <span className="font-semibold absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-6 text-xs grid place-items-center">
        {length}
      </span>

      {open && <ShowCart />}
    </div>
  );
}

function ShowCart() {
  const cart = useStore(Cart.Store);
  const total = cart.reduce((acc, item) => acc + item.price * item.count, 0);
  return (
    <section className="bg-white text-black p-4 rounded absolute top-12 right-0 w-96">
      {cart.length === 0 ? (
        <h3 className="font-medium text-center">Cart is Empty</h3>
      ) : (
        <>
          <section className="max-h-[400px] overflow-y-scroll noscroll">
            {cart.map((item) => (
              <Item key={item.id} {...item} />
            ))}
          </section>
          <footer className="flex items-center justify-between pt-4 border-t-2">
            <span className="font-semibold">Total: ${total.toFixed(2)}</span>
            <button
              type="button"
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
              onClick={Cart.Self.clear}
            >
              Clear
            </button>
          </footer>
        </>
      )}
    </section>
  );
}

function Item(item: CartItem) {
  const id = item.id;
  const up = () => Cart.Item.changeCount(id, 1);
  const down = () => {
    Cart.Item.changeCount(id, -1);
    Cart.Self.cleanUp();
  };
  const remove = () => Cart.Item.remove(id);
  return (
    <div className="mb-5">
      <div className="flex gap-4 justify-between mb-2 text-sm font-medium">
        <span className="font-semibold bg-black text-white rounded-full size-6 shrink-0 text-xs grid place-items-center">
          {item.count}
        </span>
        <span className="grow">{item.title}</span>
        <span className="bg-violet-700 px-2 self-center text-white rounded-lg">
          ${item.price}
        </span>
      </div>
      <div className="flex justify-end gap-2 *:size-7 *:rounded-full *:font-bold font-mono *:cursor-pointer">
        <button type="button" className="bg-green-300" onClick={up}>
          +
        </button>
        <button type="button" className="bg-yellow-300" onClick={down}>
          -
        </button>
        <button type="button" className="bg-red-300" onClick={remove}>
          x
        </button>
      </div>
    </div>
  );
}
