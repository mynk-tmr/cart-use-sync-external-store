import { addPersistor, Store } from './syncjs'

type CartItem = {
  id: number
  title: string
  price: number
  count: number
}

export const $cart = new Store<CartItem[]>([])
addPersistor($cart, 'cart')

const addItem = (item: Omit<CartItem, 'count'>) => {
  $cart.update((cart) => [...cart, { ...item, count: 1 }])
}

const removeItem = (id: number) => {
  $cart.update((cart) => cart.filter((item) => item.id !== id))
}

const incItem = (id: number) => {
  $cart.update((cart) =>
    cart.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : item,
    ),
  )
}

const decItem = (id: number) => {
  const item = $cart.snapshot.find((item) => item.id === id)
  if (!item) return
  if (item.count === 1) return removeItem(id)
  $cart.update((cart) =>
    cart.map((item) =>
      item.id === id ? { ...item, count: item.count - 1 } : item,
    ),
  )
}

const clearCart = () => {
  $cart.update(() => [])
}

export const cartActions = {
  addItem,
  removeItem,
  incItem,
  decItem,
  clearCart,
}
