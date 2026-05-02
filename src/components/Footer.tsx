import React from 'react';
import { Mail, Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <h2 className="text-2xl font-light tracking-tighter">LUXURY<span className="font-bold text-orange-500">STORE</span></h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              Defining the future of luxury shopping. Curated collections, exquisite craftsmanship, and a seamless digital experience.
            </p>
            <div className="flex space-x-6">
              <Instagram size={20} className="text-white/40 hover:text-white cursor-pointer transition-colors" />
              <Twitter size={20} className="text-white/40 hover:text-white cursor-pointer transition-colors" />
              <Facebook size={20} className="text-white/40 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-10 text-orange-500">Shop</h3>
            <ul className="space-y-4 text-sm text-white/40 font-medium uppercase tracking-widest text-[10px]">
              <li><Link to="/products" className="hover:text-white transition-colors">Embroidered Lawn</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Silk Collection</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Luxury Bedding</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-10 text-orange-500">Company</h3>
            <ul className="space-y-4 text-sm text-white/40 font-medium uppercase tracking-widest text-[10px]">
              <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-10 text-orange-500">Newsletter</h3>
            <div className="space-y-6">
              <p className="text-white/40 text-xs tracking-widest uppercase font-bold">Subscribe for early access and seasonal exclusives.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xs font-bold tracking-widest outline-none focus:border-white transition-colors"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-orange-500">
                  <ArrowUpRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 text-[10px] uppercase font-bold tracking-widest text-white/20 space-y-4 md:space-y-0">
          <p>© 2026 LUXURY STORE. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-12">
            <span>DESIGNED BY ASIA</span>
            <span>POWERED BY GS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
