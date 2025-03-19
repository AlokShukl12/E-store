import { useCart } from '../context/CartContext';

export default function CartDropdown() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl p-4">
        <p className="text-gray-500 text-center">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl p-4">
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.product.id} className="flex items-center gap-4">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="text-sm font-medium">{item.product.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <select
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}
                  className="text-sm border rounded px-1"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <span className="text-sm text-gray-500">
                  × ${item.product.dealPrice || item.product.price}
                </span>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.product.id)}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between font-medium">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Checkout
        </button>
      </div>
    </div>
  );
} 