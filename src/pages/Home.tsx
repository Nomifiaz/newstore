import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import { api } from '../services/api';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { motion } from 'motion/react';
import { Filter } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(30000);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pData, cData] = await Promise.all([
          api.products.list(),
          api.categories.list()
        ]);
        setProducts(pData);
        setCategories(['All', ...cData]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(p => {
    const catMatch = selectedCategory === 'All' || p.Category.name === selectedCategory;
    const priceMatch = p.finalPrice <= priceRange;
    return catMatch && priceMatch;
  });

  return (
    <main className="bg-black min-h-screen text-white">
      <Banner />

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-6 md:space-y-0">
          <div>
            <h2 className="text-4xl font-light tracking-tighter mb-2">CURATED <span className="font-bold">SELECTIONS</span></h2>
            <p className="text-white/40 text-sm tracking-widest uppercase">Explore our finest collections</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Category Filter */}
            <div className="flex bg-zinc-900 p-1 rounded-full border border-white/5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                    selectedCategory === cat ? 'bg-white text-black' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Price Slider */}
        <div className="mb-12 max-w-xs">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Max Price: Rs. {priceRange.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="30000" 
            value={priceRange} 
            onChange={(e) => setPriceRange(parseInt(e.target.value))}
            className="w-full accent-orange-500 bg-zinc-800 h-1 rounded-full appearance-none cursor-pointer"
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-[3/4] bg-zinc-900 rounded-sm"></div>
                <div className="h-4 bg-zinc-900 w-3/4"></div>
                <div className="h-4 bg-zinc-900 w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-40 border border-dashed border-white/10 rounded-lg">
            <Filter size={48} className="text-white/20 mb-4" />
            <p className="text-white/40 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
