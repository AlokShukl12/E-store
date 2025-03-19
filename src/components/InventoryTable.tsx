import { Product } from '../types/types';
import { useCart } from '../context/CartContext';

interface InventoryTableProps {
  products: Product[];
  onUpdateInventory: (productId: number, newInventory: number) => void;
  onDelete: (productId: number) => void;
}

export default function InventoryTable({ products, onUpdateInventory, onDelete }: InventoryTableProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 animate-slideInUp">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Inventory Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cart</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onDelete(product.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img src={product.image} alt={product.name} className="h-10 w-10 rounded-full object-cover" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₹{product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    min="0"
                    value={product.inventory}
                    onChange={(e) => onUpdateInventory(product.id, parseInt(e.target.value))}
                    className="w-20 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                  {product.inventory < 10 && (
                    <span className="ml-2 text-red-600 font-medium animate-pulse">Low Stock!</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => product.inventory > 0 && addToCart(product)}
                    disabled={product.inventory === 0}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      product.inventory > 0
                        ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 