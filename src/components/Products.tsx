import { useState } from 'react';
import { Product } from '../types/types';
// import ProductCard from './ProductCard';

export default function Products() {
  const [products] = useState<Product[]>([
  ]);

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-200">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* <ProductCard 
              product={product}
              onBuy={handleBuyProduct}
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
} 