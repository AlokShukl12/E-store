import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/types';

interface BuyPageProps {
  product: Product;
  quantity: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function BuyPage({ product, quantity, onConfirm, onCancel }: BuyPageProps) {
  const [stage, setStage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    setStage(2);
    setTimeout(() => {
      onConfirm();
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 transform transition-all duration-500 ease-out animate-fadeInUp">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Order</h2>
            <p className="text-gray-600">Please review your order details</p>
          </div>

          {/* Product Details */}
          <div className={`flex gap-6 transition-all duration-500 transform ${stage >= 1 ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <img 
              src={product.image} 
              alt={product.name}
              className="w-32 h-32 object-cover rounded-lg shadow-md"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mt-1">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Quantity: {quantity}</p>
                    <p className="text-sm text-gray-500">Price per unit: ₹{product.price}</p>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  Total: ₹{(product.price * quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className={`bg-gray-50 p-4 rounded-lg transition-all duration-500 delay-100 transform ${stage >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h4 className="font-semibold text-gray-700 mb-2">Order Summary</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{(product.price * quantity).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-800 pt-2 border-t">
                <span>Total</span>
                <span>₹{(product.price * quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {stage === 2 && (
            <div className="absolute inset-0 bg-white bg-opacity-90 rounded-2xl flex items-center justify-center animate-fadeIn">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Purchase Successful!</h3>
                <p className="text-gray-600">Thank you for your purchase</p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className={`flex gap-4 justify-end transition-all duration-500 delay-200 transform ${stage >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <button
              onClick={onCancel}
              className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Confirm Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 