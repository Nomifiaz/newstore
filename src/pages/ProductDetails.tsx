import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Product } from '../types';
import { Star, ShoppingBag, ArrowLeft, Shield, Truck, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../components/AuthProvider';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const data = await api.products.get(parseInt(id));
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    if (!product) return;
    
    setIsAdding(true);
    try {
      await api.cart.add(product.id, quantity);
      alert('Added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleRatingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    try {
      await api.rating.submit(product.id, rating, comment);
      alert('Rating submitted!');
      setShowRatingForm(false);
      setComment('');
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white animate-pulse tracking-[0.5em] font-bold uppercase">Loading...</div></div>;
  if (!product) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Product not found</div>;

  return (
    <main className="bg-black min-h-screen pt-32 pb-20 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-white/50 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Collection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="aspect-[3/4] overflow-hidden bg-zinc-900 rounded-sm">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Mock thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-zinc-900 rounded-sm overflow-hidden opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                  <img src={product.image} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <span className="text-orange-500 uppercase tracking-[0.3em] font-bold text-xs mb-4 block">
                {product.categoryName}
              </span>
              <h1 className="text-5xl font-light tracking-tighter mb-6">{product.name}</h1>
              <div className="flex items-center space-x-6 pb-6 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-orange-500 text-orange-500" : "text-white/20"} />
                    ))}
                  </div>
                  <span className="text-xs text-white/60">({product.rating_count} reviews)</span>
                </div>
                <div className="w-[1px] h-4 bg-white/10"></div>
                <span className="text-xs text-green-500 font-bold uppercase tracking-widest">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-baseline space-x-4 mb-2">
                <span className="text-4xl font-bold tracking-tighter">Rs. {product.finalPrice.toLocaleString()}</span>
                {product.price > product.finalPrice && (
                  <span className="text-white/30 text-xl line-through">Rs. {product.price.toLocaleString()}</span>
                )}
              </div>
              <p className="text-white/50 text-sm">Inclusive of all taxes</p>
            </div>

            <div className="space-y-8 mb-12">
              <div className="flex items-center space-x-6">
                <div className="flex items-center border border-white/10 rounded-full h-12">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-6 h-full text-white/50 hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-6 h-full text-white/50 hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 h-12 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full flex items-center justify-center space-x-3 hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50"
                >
                  <ShoppingBag size={18} />
                  <span>{isAdding ? 'Adding...' : 'Add to Bag'}</span>
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-zinc-900/50 rounded-lg border border-white/5 mb-12">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-white/5 rounded-full"><Truck size={18} className="text-orange-500" /></div>
                <span className="text-[10px] uppercase font-bold tracking-wider">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-white/5 rounded-full"><RotateCcw size={18} className="text-orange-500" /></div>
                <span className="text-[10px] uppercase font-bold tracking-wider">Easy Returns</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-white/5 rounded-full"><Shield size={18} className="text-orange-500" /></div>
                <span className="text-[10px] uppercase font-bold tracking-wider">Secure Payment</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-auto">
              <div className="flex space-x-8 border-b border-white/10 mb-8">
                {['description', 'reviews'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-xs font-bold uppercase tracking-[0.2em] relative transition-colors ${activeTab === tab ? 'text-white' : 'text-white/40 hover:text-white'}`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500" />
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[150px]">
                {activeTab === 'description' ? (
                  <p className="text-white/50 leading-relaxed text-sm italic">
                    {product.description}
                  </p>
                ) : (
                  <div className="space-y-6">
                    <button 
                      onClick={() => setShowRatingForm(!showRatingForm)}
                      className="text-xs font-bold uppercase text-orange-500 hover:underline"
                    >
                      {showRatingForm ? 'Cancel Review' : 'Write a Review'}
                    </button>

                    <AnimatePresence>
                      {showRatingForm && (
                        <motion.form
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          onSubmit={handleRatingSubmit}
                          className="bg-zinc-900 p-6 rounded-lg space-y-4 overflow-hidden"
                        >
                          <div className="flex flex-col space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/50">Rating</label>
                            <div className="flex space-x-2">
                              {[1, 2, 3, 4, 5].map(val => (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => setRating(val)}
                                  className="focus:outline-none"
                                >
                                  <Star size={20} className={val <= rating ? "fill-orange-500 text-orange-500" : "text-white/20"} />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/50">Comment</label>
                            <textarea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              className="bg-black border border-white/10 rounded-lg p-3 text-sm focus:border-orange-500 outline-none h-24"
                              placeholder="Share your thoughts..."
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-white text-black font-bold uppercase tracking-widest text-xs py-3 rounded-full hover:bg-orange-500 hover:text-white transition-all underline-offset-4"
                          >
                            Submit Review
                          </button>
                        </motion.form>
                      )}
                    </AnimatePresence>

                    <div className="text-white/40 italic text-sm py-10 text-center border border-dashed border-white/10 rounded-lg">
                      No reviews yet. Be the first to share your experience!
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
