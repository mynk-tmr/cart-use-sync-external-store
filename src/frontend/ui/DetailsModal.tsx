import { Modal } from '../stores/modal';
import { useStore } from '../stores/sync';

export function DetailsModal() {
  const modal = useStore(Modal.Details.store);
  if (!modal.open) return null;

  return (
    <div className="fixed inset-0 grid place-items-center bg-black/70 p-5">
      {!modal.item && <h2 className="text-xl text-white">Loading...</h2>}

      {modal.item && (
        <div className="bg-white relative p-6 border border-black text-black rounded-xl max-w-xl shadow-xl">
          <h2 className="text-2xl font-bold mb-2">
            {modal.item.title}{' '}
            <data className="font-medium text-sm bg-green-600 text-white px-3 py-1 rounded-full">
              ${modal.item.price}
            </data>
          </h2>
          <p className="capitalize mb-3 text-sm p-2">
            {modal.item.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="bg-black text-white px-2 py-1 text-sm">
              {modal.item.category}
            </span>
            <a
              href={modal.item.image}
              target="_blank"
              className="text-pink-900 font-medium text-sm"
            >
              See Full Image
            </a>
          </div>
          <p className="text-xl mt-3">
            ⭐ {modal.item.rating.rate}{' '}
            <small className="text-gray-500">
              ({modal.item.rating.count}) reviews
            </small>
          </p>
          <button
            type="button"
            className="size-8 text-xl absolute -top-2 -right-2 bg-red-600 text-white rounded-full cursor-pointer"
            onClick={Modal.Details.close}
          >
            x
          </button>
        </div>
      )}
    </div>
  );
}
