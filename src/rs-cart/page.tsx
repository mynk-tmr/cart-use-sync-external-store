import { type IProduct, useProducts } from './apistore'
import { $cart, cartActions } from './cartstore'
import { $cartModal, $detailsModal } from './modalstore'
import { useStore } from './syncjs'

export default function CartPage() {
  return (
    <div style={{ paddingBottom: '8rem', display: 'grid' }}>
      <h1>Cart | useSyncExternalStore</h1>
      <hr style={{ margin: 0 }} />
      <ProductsDisplay />
      <Cart />
      <DetailsModal />
    </div>
  )
}

function ProductsDisplay() {
  const { data, loading, error } = useProducts()
  if (loading) return <h2>Loading...</h2>
  if (error) return <h2>{error}</h2>
  if (!data) return null
  return (
    <ul
      style={{
        padding: 0,
        listStyle: 'none',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 20,
      }}
    >
      {data.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </ul>
  )
}

function Product(props: IProduct) {
  return (
    <li
      key={props.id}
      style={{
        border: '1px solid #ccc',
        padding: 10,
        display: 'grid',
        background: `url('${props.image}'), #00000080`,
        backgroundBlendMode: 'darken',
      }}
    >
      <h3>{props.title}</h3>
      <data style={{ fontSize: 20 }}>$ {props.price}</data>
      <div style={{ alignSelf: 'end', marginTop: 10 }}>
        <ProductButton {...props} />
        <DetailsButton {...props} />
      </div>
    </li>
  )
}

function ProductButton(props: IProduct) {
  const item = useStore($cart, (cart) =>
    cart.some((item) => item.id === props.id),
  )
  if (!item)
    return (
      <button
        type="button"
        onClick={() => {
          cartActions.addItem({
            id: props.id,
            title: props.title,
            price: props.price,
          })
        }}
      >
        Add to cart
      </button>
    )
  return (
    <button type="button" onClick={() => $cartModal.actions.open()}>
      ✅ View Cart
    </button>
  )
}

function Cart() {
  const cart = useStore($cart)
  let total = 0
  let length = 0
  for (const item of cart) {
    total += item.price * item.count
    length += item.count
  }
  const open = useStore($cartModal.store)
  return (
    <div style={{ position: 'fixed', right: 10, bottom: 10 }}>
      {open && <ShowCart />}
      <button
        style={{ fontSize: 20, width: '100%' }}
        type="button"
        onClick={() => $cartModal.actions.toggle()}
      >
        {open ? 'Close' : 'Open'} Cart 👜
      </button>
      <div style={{ background: '#000', color: '#fff', padding: '1rem' }}>
        Added : {length}
        <br />
        Total: ${total.toFixed(2)}
      </div>
    </div>
  )
}

function ShowCart() {
  const cart = useStore($cart)
  return (
    <div
      style={{
        color: '#000',
        background: '#fff',
        padding: '1rem',
        maxHeight: '60vh',
        overflow: 'auto',
      }}
    >
      {cart.length === 0 && <div>Cart is empty</div>}
      {cart.length > 0 && <ClearButton />}
      <hr />
      {cart.map((item) => (
        <div key={item.id}>
          <span style={{ fontSize: 20, marginRight: 10 }}>{item.count}</span>
          <b>{item.title}</b>
          <span style={{ marginLeft: 10, fontFamily: 'monospace' }}>
            ${item.price}
          </span>
          <Controls id={item.id} />
        </div>
      ))}
    </div>
  )
}

function ClearButton() {
  return (
    <div style={{ marginTop: 10 }}>
      <button type="button" onClick={() => cartActions.clearCart()}>
        Clear 🙀
      </button>
    </div>
  )
}

function Controls({ id }: { id: number }) {
  return (
    <div>
      <button type="button" onClick={() => cartActions.incItem(id)}>
        +1
      </button>
      <button type="button" onClick={() => cartActions.decItem(id)}>
        -1
      </button>
      <button type="button" onClick={() => cartActions.removeItem(id)}>
        Delete
      </button>
    </div>
  )
}

function DetailsButton(props: IProduct) {
  return (
    <button
      style={{ marginLeft: 20 }}
      type="button"
      onClick={() => $detailsModal.actions.open(props)}
    >
      See Details
    </button>
  )
}

function DetailsModal() {
  const modal = useStore($detailsModal.store)
  if (!modal.open) return null
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        background: '#00000080',
        padding: 20,
      }}
    >
      {!modal.item && <h2>Loading...</h2>}
      {modal.item && (
        <div
          style={{
            background: '#fff',
            padding: 20,
            border: '1px solid #000',
            color: '#000',
            borderRadius: 10,
            maxWidth: 640,
          }}
        >
          <h2>
            {modal.item.title}{' '}
            <data style={{ color: 'indigo' }}>${modal.item.price}</data>
          </h2>
          <p style={{ textTransform: 'capitalize' }}>
            {modal.item.description}
          </p>
          <span style={{ background: '#000', color: '#fff', padding: 10 }}>
            {modal.item.category}
          </span>
          <br />
          <br />
          <a href={modal.item.image} target="_blank" style={{ color: '#d00' }}>
            See Full Image
          </a>
          <p style={{ fontSize: 20 }}>
            ⭐ {modal.item.rating.rate}{' '}
            <small>({modal.item.rating.count}) reviews</small>
          </p>
          <hr />
          <button type="button" onClick={() => $detailsModal.actions.close()}>
            Close
          </button>
        </div>
      )}
    </div>
  )
}
