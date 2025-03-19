export interface User {
  username: string;
  password: string;
}

export interface Product {
  id: number;
  name: string;
  inventory: number;
  price: number;
  image: string;
  description: string;
  category: string;
  dealPrice?: number;
  disease:string;
  HowItWork:string;
}

export interface UserPreferences {
  lastVisitedMenu: 'dashboard' | 'graph';
  selectedGraphType: 'bar' | 'line';
}

export interface CartItem {
  product: Product;
  quantity: number;
} 