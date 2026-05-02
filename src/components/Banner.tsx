import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../lib/utils';

const Banner = () => {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-black mt-16">
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern Electronics" 
          className="w-full h-full object-cover grayscale brightness-50"
        />
      </motion.div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-start">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="text-orange-500 uppercase tracking-[0.3em] font-bold text-sm mb-4 block">
            Digital Collective 2026
          </span>
          <h1 className="text-6xl md:text-8xl font-light text-white leading-tight mb-8 tracking-tighter">
            NEXT GEN <br />
            <span className="font-bold italic text-orange-500">LIFESTYLE</span>
          </h1>
          <p className="text-white/40 max-w-lg mb-10 text-lg leading-relaxed font-light">
            Merging state-of-the-art tech with ultimate luxury. 
            Experience the future of comfort and connectivity through our curated essentials.
          </p>
          <Link 
            to="/products"
            className="group flex items-center space-x-3 bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-orange-500 hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-orange-500/40"
          >
            <span>Enter Studio</span>
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-10 right-10 hidden lg:block">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-white/30 text-xs tracking-[0.5em] uppercase vertical-text flex flex-col items-center space-y-4"
          style={{ writingMode: 'vertical-rl' }}
        >
          <span>SCROLL TO DISCOVER</span>
          <div className="w-[1px] h-20 bg-white/30"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
