import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Categories from './components/Categories';
import Dashboard from './components/Dashboard';
import Graph from './components/Graph';
import Layout from './components/Layout';
import Login from './components/Login';
import Products from './components/Products';
import SignUp from './components/SignUp';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="graph" element={<Graph />} />
              <Route path="products" element={<Products />} />
              <Route path="categories" element={<Categories />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
