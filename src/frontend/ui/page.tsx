import { $products } from '../stores/products';
import { useStore } from '../stores/sync';
import CartDisplay from './CartDisplay';
import { DetailsModal } from './DetailsModal';
import Product from './Product';

export default function CartPage() {
  return (
    <div className="px-4 pb-20 grid bg-zinc-900">
      <div className="sticky top-0 py-4 bg-zinc-900 text-white border-b">
        <h1 className="text-3xl font-bold mb-2">Cart 🛒</h1>
      </div>
      <ProductsDisplay />
      <CartDisplay />
      <DetailsModal />
    </div>
  );
}

function ProductsDisplay() {
  const { data, loading, error } = useStore($products);
  if (loading) return <h2 className="text-xl">Loading...</h2>;
  if (error) return <h2 className="text-xl text-red-500">{error.message}</h2>;
  if (!data) return null;
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5 mt-6">
      {data.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </ul>
  );
}
