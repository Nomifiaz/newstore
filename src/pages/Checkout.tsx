import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Cart } from '../types';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { getImageUrl } from '../lib/utils';

const Checkout = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [formData, setFormData] = useState({ shippingAddress: '', city: '', phoneNumber: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await api.cart.get();
        setCart(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.orders.checkout(formData);
      if (res.success) {
        setIsSuccess(true);
        setTimeout(() => navigate('/orders'), 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="bg-black min-h-screen flex items-center justify-center text-center p-4">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="space-y-8"
        >
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.4)]">
            <CheckCircle2 size={48} className="text-white" />
          </div>
          <h2 className="text-5xl font-light tracking-tighter text-white">ORDER <span className="font-bold">CONFIRMED</span></h2>
          <p className="text-white/40 max-w-sm mx-auto uppercase tracking-widest text-xs">Your luxurious picks are on their way. Redirecting to your orders...</p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-black min-h-screen pt-32 pb-20 text-white">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-5xl font-light tracking-tighter mb-16">SECURE <span className="font-bold italic underline decoration-orange-500 underline-offset-8">CHECKOUT</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-2 bg-orange-500 rounded-lg text-white">
                  <MapPin size={20} />
                </div>
                <h2 className="text-xl font-bold tracking-widest uppercase">Shipping Details</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Full Shipping Address</label>
                  <textarea
                    required
                    value={formData.shippingAddress}
                    onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl p-4 text-sm focus:border-orange-500 outline-none h-24 placeholder:text-white/10 transition-all font-medium"
                    placeholder="Street address, apartment, suite, etc."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">City / Region</label>
                    <input
                      required
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded-full px-6 py-4 text-xs font-bold tracking-widest uppercase focus:border-orange-500 outline-none placeholder:text-white/10"
                      placeholder="ENTER CITY"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Phone Number</label>
                    <input
                      required
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded-full px-6 py-4 text-xs font-bold tracking-widest uppercase focus:border-orange-500 outline-none placeholder:text-white/10"
                      placeholder="0000-0000000"
                    />
                  </div>
                </div>

                <div className="pt-8 space-y-4">
                   <div className="flex items-center space-x-3 text-white/40 p-4 border border-dashed border-white/10 rounded-xl">
                      <Truck size={18} />
                      <span className="text-[10px] uppercase font-bold tracking-widest">Standard Shipping (3-5 Business Days) — <span className="text-green-500">FREE</span></span>
                   </div>
                   
                   <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-white text-black py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-3 hover:bg-orange-500 hover:text-white transition-all transform active:scale-95 shadow-xl"
                  >
                    <CreditCard size={18} />
                    <span>{isLoading ? 'PROCESSING ORDER...' : 'COMPLETE ORDER'}</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:pl-10"
          >
            <div className="bg-zinc-950 border border-white/10 p-8 rounded-2xl">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-10 pb-4 border-b border-white/5 flex justify-between items-center text-white/40">
                <span>ORDER RECAP</span>
                <span>{cart?.items.length || 0} ITEMS</span>
              </h2>
              
              <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart?.items.map(item => (
                  <div key={item.id} className="flex space-x-4">
                    <div className="w-16 h-20 bg-zinc-900 rounded overflow-hidden flex-shrink-0">
                      <img src={getImageUrl(item.image)} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 py-1">
                      <h4 className="text-[11px] font-bold uppercase tracking-wide line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">QTY: {item.quantity}</p>
                      <p className="text-xs font-bold mt-2">Rs. {item.total.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center bg-zinc-900/50 p-4 rounded-xl">
                  <span className="text-xs uppercase tracking-widest font-bold text-white/40">Grand Total</span>
                  <span className="text-2xl font-bold tracking-tighter">Rs. {cart?.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
