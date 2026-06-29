import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { getProductInquiryLink } from '../../utils/whatsapp';
import { truncateText } from '../../utils/formatters';

export const ProductCard = ({ product }) => {
  const { name, category, description, image_url, is_featured, is_available } = product;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="bg-beige-card rounded-lg overflow-hidden shadow-card hover:shadow-hover border border-gold-pale flex flex-col h-full relative gold-corners"
    >
      {/* Featured Badge */}
      {is_featured && (
        <span className="absolute top-4 left-4 z-10 bg-gold text-white font-body font-semibold uppercase text-[10px] tracking-widest px-2.5 py-1 rounded-sm shadow-md">
          Featured
        </span>
      )}

      {/* Product Image — Fixed height of 240px */}
      <div className="h-[240px] overflow-hidden bg-cream-dark relative">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={image_url || 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600&auto=format&fit=crop'}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {is_available === false && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-danger text-white font-body font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-sm">
              Unavailable Today
            </span>
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category Label */}
        <span className="text-[10px] md:text-xs font-body font-bold text-gold uppercase tracking-widest bg-gold-pale px-2.5 py-1 rounded-full self-start mb-3">
          {category}
        </span>

        {/* Product Name */}
        <h3 className="text-xl font-display font-bold text-brown-deep mb-2 line-clamp-1">
          {name}
        </h3>

        {/* Product Description */}
        <p className="text-brown-mid text-sm mb-4 line-clamp-2 leading-relaxed flex-grow">
          {truncateText(description, 120)}
        </p>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-gold-pale via-gold/25 to-gold-pale my-4"></div>

        {/* Details and Actions */}
        <div className="flex flex-col gap-3 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${is_available !== false ? 'bg-success' : 'bg-danger'}`}></span>
              <span className="text-xs font-semibold text-brown-mid font-body uppercase">
                {is_available !== false ? 'Available' : 'Unavailable'}
              </span>
            </div>
            <span className="text-sm font-accent italic text-gold font-bold">
              Contact for Price
            </span>
          </div>
 
          <a
            href={is_available !== false ? getProductInquiryLink(name) : '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-3 px-4 font-body font-bold uppercase tracking-wider rounded-md text-xs flex items-center justify-center gap-2 transition-all duration-300 ${
              is_available !== false
                ? 'bg-saffron text-white hover:bg-saffron/90 shadow-md hover:shadow-lg'
                : 'bg-brown-light/40 text-brown-mid/50 cursor-not-allowed pointer-events-none'
            }`}
          >
            <MessageCircle size={15} />
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
};
export default ProductCard;
