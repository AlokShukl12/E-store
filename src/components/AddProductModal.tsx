import { useState } from 'react';
import { Product } from '../types/types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Omit<Product, 'id'>) => void;
}

export default function AddProductModal({ isOpen, onClose, onAdd }: AddProductModalProps) {
  const [product, setProduct] = useState({
    name: '',
    inventory: 0,
    price: 0,
    image: '',
    description: '',
    category: 'all',
    disease: '',
  HowItWork: '',
  });
  

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(product);
    setProduct({
      name: '',
      inventory: 0,
      price: 0,
      image: '',
      description: '',
      category: 'all',
      disease:'',
      HowItWork:'',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center animate-fadeIn">
      <div className="bg-white rounded-lg p-6 w-full max-w-md animate-slideInUp">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Add New Product</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={product.name}
              onChange={e => setProduct({ ...product, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={product.price}
              onChange={e => setProduct({ ...product, price: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Inventory</label>
            <input
              type="number"
              value={product.inventory}
              onChange={e => setProduct({ ...product, inventory: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              value={product.image}
              onChange={e => setProduct({ ...product, image: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
              value={product.description}
              onChange={e => setProduct({ ...product, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Disease</label>
            <textarea
              value={product.disease}
              onChange={e => setProduct({ ...product, disease: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">How It Work</label>
            <textarea
              value={product.HowItWork}
              onChange={e => setProduct({ ...product, HowItWork: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 