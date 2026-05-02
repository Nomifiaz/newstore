import React from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { cn, getImageUrl } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 rounded-sm">
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Discount Badge */}
        {product.discountValue > 0 && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-10">
            {product.discountValue}% OFF
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <Link
            to={`/products/${product.id}`}
            className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-full hover:bg-orange-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500"
          >
            <Eye size={20} />
          </Link>
          <button
            className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-full hover:bg-orange-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between items-start">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
            {product.Category.name}
          </span>
          <div className="flex items-center space-x-1">
            <Star size={10} className="fill-orange-500 text-orange-500" />
            <span className="text-[10px] text-white/60">{product.averageRating}</span>
          </div>
        </div>
        
        <h3 className="text-white text-sm font-medium tracking-tight group-hover:text-orange-500 transition-colors line-clamp-1">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="flex items-center space-x-3">
          <span className="text-white font-bold tracking-tight">
            Rs. {product.finalPrice.toLocaleString()}
          </span>
          {product.price > product.finalPrice && (
            <span className="text-white/30 text-xs line-through">
              Rs. {product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
