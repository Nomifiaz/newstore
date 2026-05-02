import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search, Menu } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-light tracking-tighter text-white">LUXURY<span className="font-bold text-orange-500">STORE</span></span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest font-medium text-white/70">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/products" className="hover:text-white transition-colors">Shop</Link>
            <Link to="/orders" className="hover:text-white transition-colors">Orders</Link>
          </div>

          <div className="flex items-center space-x-5">
            <button className="p-2 text-white/70 hover:text-white transition-colors">
              <Search size={20} />
            </button>
            <Link to="/cart" className="p-2 text-white/70 hover:text-white transition-colors relative">
              <ShoppingCart size={20} />
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-white/70 hidden lg:block">Hello, {user.name}</span>
                <button 
                  onClick={() => { logout(); navigate('/auth'); }}
                  className="p-2 text-white/70 hover:text-white transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                <User size={16} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
