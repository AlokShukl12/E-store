import { useState } from 'react';
import { Product } from '../types/types';
// import ProductCard from './ProductCard';

export default function Categories() {
  const [products] = useState<Product[]>([
  
  ]);
  const categories = ['all', 'audio', 'computers', 'tv', 'accessories'];
  // function handleBuyProduct(product: Product, quantity: number): void {
  //   throw new Error('Function not implemented.');
  // }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Categories</h2>
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <div 
              key={category}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex-1 min-w-[200px] hover:bg-white/20 transition-colors cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-gray-200 capitalize">{category}</h3>
              <p className="text-gray-400 mt-2">
                {products.filter(p => category === 'all' || p.category === category).length} Products
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* <ProductCard 
              product={product}
              // onBuy={handleBuyProduct}
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
} 