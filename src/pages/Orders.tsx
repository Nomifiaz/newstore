import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Order } from '../types';
import { motion } from 'motion/react';
import { Package, Clock, MapPin, Phone } from 'lucide-react';
import { getImageUrl } from '../lib/utils';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.orders.list();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white animate-pulse tracking-[0.5em] font-bold uppercase">Loading...</div></div>;

  return (
    <main className="bg-black min-h-screen pt-32 pb-20 text-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-16">
          <h1 className="text-5xl font-light tracking-tighter mb-4">PURCHASE <span className="font-bold">HISTORY</span></h1>
          <p className="text-white/40 text-xs tracking-[0.3em] uppercase">Manage and track your luxury orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-40 border border-dashed border-white/10 rounded-2xl bg-zinc-900/20">
            <Package size={60} className="text-white/5 mx-auto mb-6" />
            <p className="text-white/20 uppercase tracking-[0.2em] text-sm font-bold">No orders found yet</p>
          </div>
        ) : (
          <div className="space-y-12">
            {orders.map((order, idx) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden"
              >
                <div className="p-6 md:p-8 bg-zinc-900 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">Order ID</span>
                      <span className="text-sm font-mono tracking-tighter text-orange-500 font-bold">#ORD-2026-{String(order.id).padStart(4, '0')}</span>
                    </div>
                    <div className="w-[1px] h-8 bg-white/5"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">Status</span>
                      <span className="text-[10px] px-3 py-1 bg-white/5 text-green-500 rounded-full border border-green-500/20 font-bold uppercase tracking-widest">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8">
                     <div className="text-right">
                        <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1 block">Total Paid</span>
                        <span className="text-xl font-bold tracking-tighter">Rs. {parseFloat(order.totalAmount).toLocaleString()}</span>
                     </div>
                  </div>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-white/20 mb-6">Delivery Information</h3>
                      <div className="flex items-start space-x-4">
                        <MapPin size={18} className="text-white/20 mt-1" />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium leading-relaxed">{order.shippingAddress}, {order.city}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Phone size={18} className="text-white/20" />
                        <span className="text-sm font-medium">{order.phoneNumber}</span>
                      </div>
                      <div className="flex items-center space-x-4 pt-4 text-white/40">
                         <Clock size={16} />
                         <span className="text-[10px] uppercase font-bold tracking-widest">Placed on {new Date(order.orderDate).toLocaleDateString()}</span>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-white/20 mb-6 font-italix">Line Items</h3>
                      <div className="space-y-4">
                        {order.OrderItems.map((item, i) => (
                          <div key={i} className="flex items-center space-x-4 p-4 bg-black/40 rounded-xl border border-white/5">
                            <div className="w-12 h-16 bg-zinc-900 rounded overflow-hidden flex-shrink-0">
                               <img src={getImageUrl(item.Product.images[0])} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex justify-between items-center">
                              <div className="flex flex-col">
                                <span className="text-xs font-bold uppercase tracking-wide mb-1">{item.productName}</span>
                                <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">QTY: {item.quantity} × Rs. {parseFloat(item.price).toLocaleString()}</span>
                              </div>
                              <span className="text-sm font-bold tracking-tighter">Rs. {parseFloat(item.total).toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Orders;
