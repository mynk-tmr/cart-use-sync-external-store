import { Modal } from '../stores/modal';
import { useStore } from '../stores/sync';

export function DetailsModal() {
  const modal = useStore(Modal.Details.store);
  if (!modal.open || !modal.item) return null;

  return (
    <div className="fixed inset-0 grid place-items-center bg-black/70 p-5">
      <div className="bg-white relative p-6 border  text-black rounded-xl max-w-xl">
        <h2 className="text-2xl font-bold mb-2">
          {modal.item.title}{' '}
          <data className="font-medium text-sm bg-green-600 text-white px-3 py-1 rounded-full">
            ${modal.item.price}
          </data>
        </h2>
        <p className="capitalize mb-3 text-sm">{modal.item.description}</p>
        <div className="flex flex-wrap-reverse gap-y-4 justify-between items-center font-medium text-sm">
          <span className="bg-black text-white px-2 py-1">
            {modal.item.category}
          </span>
          <p>
            ⭐ {modal.item.rating.rate}{' '}
            <i className="text-gray-500">({modal.item.rating.count}) reviews</i>
          </p>
          <a href={modal.item.image} target="_blank" className="text-pink-900">
            See Full Image 🔗
          </a>
        </div>
        <button
          type="button"
          className="bg-red-600 text-white px-3 py-1 rounded-full absolute top-2 right-2 text-sm"
          onClick={Modal.Details.close}
        >
          Exit
        </button>
      </div>
    </div>
  );
}
