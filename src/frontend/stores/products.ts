import { Store } from './sync';

export interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  category: string;
  description: string;
}

export const $products = new Store({
  data: null as IProduct[] | null,
  loading: true,
  error: null as Error | null,
});

try {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  $products.set({ data, loading: false, error: null });
} catch (err) {
  $products.set({ data: null, loading: false, error: err as Error });
}
