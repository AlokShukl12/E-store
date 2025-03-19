import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CartDropdown from './CartDropdown';
import SideMenu from './SideMenu';

export default function Layout() {
  const { logout, preferences } = useAuth();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart();

  useEffect(() => {
    // Redirect to last visited menu on initial load
    navigate(preferences.lastVisitedMenu);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/src/components/Dashboard.tsx', name: 'Products' },
    { path: '/src/components/Dashboard.tsx', name: 'Categories' },
    { path: '/src/components/BuyPage.tsx', name: 'Deals' }
  ];

  return (
    <div className="min-h-screen bg-[#8dfafa]">
      <header className=" bg-[#5954e7] shadow-md border-b border-gray-200 text-slate-950">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-3xl font-bold text-[#232f3e] hover:scale-105 transition-transform">
                E-Store
              </h1>
              <nav className="hidden md:flex space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-gray-600 hover:text-[#ff9900] px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="text-gray-600 hover:text-[#ff9900] relative transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </button>
                {isCartOpen && <CartDropdown />}
              </div>
              <button 
                onClick={handleLogout}
                className="bg-[#ff9900] hover:bg-[#ffac31] text-white px-6 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <aside className="w-64 flex-shrink-0">
            <SideMenu />
          </aside>
          <main className="flex-1 bg-white rounded-xl shadow-md p-6">
            <Outlet />
          </main>
        </div>
      </div>

      <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-sm">Your trusted source for tech products and solutions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">Products</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>Email: E-Store@gmail.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 E-Store Street</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4 ">
                <a href="#" className="hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-center">
            <p>&copy; 2025 E-Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 