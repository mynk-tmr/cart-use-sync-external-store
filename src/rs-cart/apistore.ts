import { Store, useStore } from './syncjs'

const products = new Store<{
  data: IProduct[] | null
  loading: boolean
  error: string
}>({
  data: null,
  loading: false,
  error: '',
})

products.update((state) => ({ ...state, loading: true }))
products.update$(async (state) => {
  try {
    const res = await fetch('https://fakestoreapi.com/products')
    const data = await res.json()
    return { ...state, data, loading: false }
  } catch (err) {
    return { ...state, error: (err as Error).message, loading: false }
  }
})

export function useProducts() {
  return useStore(products)
}

export type IProduct = {
  id: number
  title: string
  price: number
  image: string
  rating: {
    rate: number
    count: number
  }
  category: string
  description: string
}
