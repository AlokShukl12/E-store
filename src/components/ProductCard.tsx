import { useState } from 'react';
import { Product } from '../types/types';
import BuyPage from './BuyPage';

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product, quantity: number) => void;
}

export default function ProductCard({ product, onBuy }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const isOnSale = product.dealPrice && product.dealPrice < product.price;
  const [showBuyPage, setShowBuyPage] = useState(false);

  const handleBuy = () => {
    setShowBuyPage(true);
  };

  const handleConfirmPurchase = () => {
    onBuy(product, quantity);
    setShowBuyPage(false);
    setQuantity(1);
  };

  return (
    <>
      <div 
        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-[450px] w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48">
          <img 
            src={product.image} 
            alt={product.name} 
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
            {isOnSale ? (
              <div className="flex flex-col items-end">
                <span className="line-through text-xs opacity-75">₹{product.price}</span>
                <span className="font-bold">₹{product.dealPrice}</span>
              </div>
            ) : (
                <span>₹{product.price}</span>
            )}
          </div>
          {product.inventory < 10 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs animate-pulse">
              Only {product.inventory} left!
            </div>
          )}
          {isOnSale && (
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
              Buy!
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col h-[calc(450px-192px)]">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Qty:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded px-2 py-1 text-sm"
                disabled={product.inventory === 0}
              >
                {[...Array(Math.min(10, product.inventory))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleBuy}
              disabled={product.inventory === 0}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                product.inventory > 0
                  ? 'bg-green-600 text-white hover:bg-green-700 transform hover:scale-105'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.inventory > 0 ? 'Buy Now' : 'Sold Out'}
            </button>
          </div>
        </div>
      </div>

      {/* Buy Page Modal */}
      {showBuyPage && (
        <BuyPage
          product={product}
          quantity={quantity}
          onConfirm={handleConfirmPurchase}
          onCancel={() => setShowBuyPage(false)}
        />
      )}
    </>
  );
} 