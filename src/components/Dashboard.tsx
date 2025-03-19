import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types/types';
import AddProductModal from './AddProductModal';
import InventoryTable from './InventoryTable';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { updatePreferences } = useAuth();

  useEffect(() => {
    updatePreferences({ lastVisitedMenu: 'dashboard' });
    const mockProducts: Product[] = [
      {
       id: 1,
        name: 'Premium Wireless Headphones',
        inventory: 100,
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
        description: 'High-quality wireless headphones with noise cancellation',
        category: 'audio',
       disease:'',
         HowItWork:'',
      },
      {
        id: 2,
        name: 'Gaming Laptop Pro',
        inventory: 50,
        price: 1299.99,
        image: 'https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf',
        description: 'Powerful gaming laptop with RTX 4080',
        category: 'computers',
         disease:'',
         HowItWork:'',
      },
      {
        id: 3,
        name: '4K Smart TV',
        inventory: 30,
        price: 699.99,
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6',
        description: '55-inch 4K Smart TV with HDR',
        category: 'tv',
         disease:'',
         HowItWork:'',
      },
      {
        id: 3,
        name: 'Lg Ultra Hd 4k Led Smart Webos Tv',
        inventory: 50,
        price: 7799.99,
        image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT-t1BsnUEaE5bOg0yMpcq7iNnUV3sS-hODXLIUHoHr8ifnZkJySAa3dMjWJuD-7VMT_3cwkw7uvNTlxsrU8-cN040WBD-tdLQTa5yHShCzKjYRQzOyx90WVg',
        description: '85-inch 4K Smart TV with HDR',
        category: 'tv',
         disease:'',
         HowItWork:'',
      },
      
    ];
    setProducts(mockProducts);
  }, []);

  useEffect(() => {
    // Filter products based on selected category
    const categoryFiltered = selectedCategory === 'all' 
      ? products 
      : products.filter(product => product.category === selectedCategory);
    setFilteredProducts(categoryFiltered);
  }, [selectedCategory, products]);

  const handleSearch = (searchTerm: string) => {
    const searchLower = searchTerm.toLowerCase();
    const filtered = products.filter(product => 
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      (product.name.toLowerCase().includes(searchLower) ||
       product.description.toLowerCase().includes(searchLower) ||
       product.category.toLowerCase().includes(searchLower) ||
       product.disease.toLowerCase().includes(searchLower))
    );
    setFilteredProducts(filtered);
  };

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleBuyProduct = (product: Product, quantity: number) => {
    if (product.inventory >= quantity) {
      setProducts(products.map(p => 
        p.id === product.id 
          ? { ...p, inventory: p.inventory - quantity }
          : p
      ));
    }
  };

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const id = Math.max(...products.map(p => p.id)) + 1;
    setProducts([...products, { ...newProduct, id }]);
    setIsAddModalOpen(false);
  };

  const handleUpdateInventory = (productId: number, newInventory: number) => {
    setProducts(products.map(p => 
      p.id === productId 
        ? { ...p, inventory: newInventory }
        : p
    ));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative h-80 rounded-xl overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://img.freepik.com/premium-photo/photocomposition-horizontal-shopping-banner-with-woman-big-smartphone_23-2151201773.jpg?w=1380"
            alt="AgroAim Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center px-8">
          <h1 className="text-4xl font-bold text-white mb-4 animate-slideInLeft">
            Welcome to E-Store
          </h1>
          {/* <p className="text-xl text-white/90 max-w-xl animate-slideInRight">
            Discover the latest amazing deals on products with the AgroAim.
          </p> */}
        </div>
      </div>

      {/* Search and Categories */}
      <div className="space-y-4">
        <div className="max-w-2xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {['all', 'audio', 'computers', 'tv', 'accessories'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Add Product Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
        >
          <span className="text-xl">+</span>
          Add Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProductCard 
              product={product} 
              onBuy={handleBuyProduct}
            />
          </div>
        ))}
      </div>

      {/* Show "No results found" message when search yields no results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No products found matching your search criteria</p>
        </div>
      )}

      {/* Inventory Management Section */}
      <InventoryTable 
        products={filteredProducts}
        onUpdateInventory={handleUpdateInventory}
        onDelete={handleDeleteProduct}
      />

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProduct}
      />
    </div>
  );
} 