import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Cart as CartType } from '../types';
import { Trash2, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState<CartType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const data = await api.cart.get();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (productId: number, newQty: number) => {
    if (newQty < 1) return;
    try {
      await api.cart.update(productId, newQty);
      await fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemove = async (productId: number) => {
    try {
      await api.cart.remove(productId);
      await fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleClear = async () => {
    try {
      await api.cart.clear();
      await fetchCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white animate-pulse tracking-[0.5em] font-bold uppercase">Loading...</div></div>;

  if (!cart || cart.items.length === 0) {
    return (
      <main className="bg-black min-h-screen flex flex-col items-center justify-center pt-20 px-4 text-center">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="bg-zinc-900 border border-white/5 p-12 rounded-full mb-8"
        >
          <ShoppingBag size={80} className="text-white/10" />
        </motion.div>
        <h2 className="text-4xl font-light tracking-tighter text-white mb-4">YOUR BAG IS <span className="font-bold">EMPTY</span></h2>
        <p className="text-white/40 mb-10 max-w-sm mx-auto">Looks like you haven't added anything to your bag yet. Explore our collections and find something special.</p>
        <Link 
          to="/products"
          className="bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-orange-500 hover:text-white transition-all transform hover:scale-105"
        >
          Start Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-black min-h-screen pt-32 pb-20 text-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-light tracking-tighter mb-2">MY <span className="font-bold">SHOPPING BAG</span></h1>
            <p className="text-white/40 text-xs tracking-widest uppercase font-bold">{cart.items.length} items in bag</p>
          </div>
          <button 
            onClick={handleClear}
            className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-orange-500 transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence>
              {cart.items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col sm:flex-row items-center sm:space-x-8 p-6 bg-zinc-900/50 rounded-lg border border-white/5 relative group"
                >
                  <div className="w-32 aspect-[3/4] rounded-sm overflow-hidden bg-zinc-800 mb-4 sm:mb-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] text-orange-500 uppercase tracking-widest font-bold mb-1 block">{item.categoryName}</span>
                        <h3 className="text-xl font-light tracking-tight">{item.name}</h3>
                      </div>
                      <button 
                        onClick={() => handleRemove(item.id)}
                        className="text-white/20 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-white/10 rounded-full h-10">
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-4 h-full text-white/50 hover:text-white"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-4 h-full text-white/50 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold tracking-tight">Rs. {item.total.toLocaleString()}</p>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest">Rs. {item.finalPrice.toLocaleString()} each</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link 
              to="/products"
              className="inline-flex items-center space-x-2 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-white/5 p-8 rounded-lg sticky top-32">
              <h2 className="text-xl font-bold tracking-widest uppercase mb-8 pb-4 border-b border-white/5">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Subtotal</span>
                  <span>Rs. {cart.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Shipping</span>
                  <span className="text-green-500 font-bold uppercase tracking-widest">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-white/10 pt-6 mb-10">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-white/40">Total</span>
                <span className="text-3xl font-bold tracking-tighter">Rs. {cart.totalAmount.toLocaleString()}</span>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-white text-black py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-3 hover:bg-orange-500 hover:text-white transition-all transform hover:scale-[1.02]"
              >
                <span>Checkout</span>
                <ArrowRight size={18} />
              </button>

              <div className="mt-8 flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-2 grayscale opacity-40">
                  <div className="w-8 h-5 bg-zinc-700 rounded-sm"></div>
                  <div className="w-8 h-5 bg-zinc-700 rounded-sm"></div>
                  <div className="w-8 h-5 bg-zinc-700 rounded-sm"></div>
                </div>
                <p className="text-[9px] text-white/20 uppercase tracking-widest text-center italic">
                  100% SECURE CHECKOUT GUARANTEED
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
