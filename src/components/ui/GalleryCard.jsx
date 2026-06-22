import React from 'react';
import { Maximize2 } from 'lucide-react';

export const GalleryCard = ({ item, onOpenLightbox }) => {
  const { title, category, image_url } = item;

  return (
    <div 
      onClick={onOpenLightbox}
      className="group relative overflow-hidden rounded-lg shadow-card hover:shadow-hover border border-gold-pale cursor-pointer bg-cream-dark mb-4 break-inside-avoid select-none"
    >
      <img
        src={image_url}
        alt={title}
        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      {/* Overlay on Hover */}
      <div className="absolute inset-0 bg-brown-deep/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
        <div className="absolute top-4 right-4 text-gold-light bg-cream-dark/10 p-2 rounded-full backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <Maximize2 size={16} />
        </div>
        <span className="text-[10px] font-body font-bold text-gold-light uppercase tracking-widest bg-gold/25 px-2.5 py-1 rounded-full self-start mb-2">
          {category}
        </span>
        <h3 className="text-lg font-display font-bold text-white leading-tight">
          {title}
        </h3>
      </div>
    </div>
  );
};
export default GalleryCard;
