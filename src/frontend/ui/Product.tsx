import { Cart } from '../stores/cart';
import { Modal } from '../stores/modal';
import type { IProduct } from '../stores/products';
import { useSlice } from '../stores/sync';

export default function Product(props: IProduct) {
  return (
    <li
      className="border border-gray-300 p-4 bg-cover bg-center bg-black/60 bg-blend-darken rounded-lg text-white grid gap-3"
      style={{ backgroundImage: `url('${props.image}')` }}
    >
      <h3 className="text-xl font-semibold">{props.title}</h3>
      <data className="text-2xl">$ {props.price}</data>
      <div className="flex items-center gap-x-2 justify-end *:font-medium *:hover:opacity-85 *:px-3 *:py-1 *:text-white *:rounded">
        <ProductButton {...props} />
        <DetailsButton {...props} />
      </div>
    </li>
  );
}

function ProductButton({ id, title, price }: IProduct) {
  const item = useSlice(Cart.Store, (cart) =>
    cart.some((item) => item.id === id),
  );
  if (!item)
    return (
      <button
        type="button"
        className="bg-pink-600"
        onClick={() => Cart.Item.add({ id, title, price })}
      >
        Add
      </button>
    );

  const openCart = () => Modal.Cart.isOpen(true);
  return (
    <button
      data-id="view_cart"
      type="button"
      className="bg-green-600"
      onClick={openCart}
    >
      View Cart
    </button>
  );
}

function DetailsButton(props: IProduct) {
  return (
    <button
      type="button"
      className="bg-indigo-700"
      onClick={() => Modal.Details.open(props)}
    >
      See Details
    </button>
  );
}
