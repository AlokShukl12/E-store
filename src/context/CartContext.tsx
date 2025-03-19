import { createContext, useContext, useState } from 'react';
import { CartItem, Product } from '../types/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  total: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setItems(current => {
      const existingItem = current.find(item => item.product.id === product.id);
      if (existingItem) {
        return current.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems(items.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setItems(items.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    ));
  };

  const total = items.reduce((sum, item) => 
    sum + (item.product.dealPrice || item.product.price) * item.quantity, 0
  );

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 