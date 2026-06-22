import React from 'react';

export const SectionTitle = ({ label, title, subtitle, align = 'center' }) => {
  const isCenter = align === 'center';
  return (
    <div className={`mb-12 flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'}`}>
      {label && (
        <div className="flex items-center gap-3 text-gold font-accent italic text-base md:text-lg mb-2 select-none">
          <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-gold"></span>
          {label}
          <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-gold"></span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brown-deep tracking-wide leading-tight mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-brown-mid text-sm md:text-base leading-relaxed font-body">
          {subtitle}
        </p>
      )}
      
      {/* Decorative Gold Flourish */}
      <div className="relative flex items-center justify-center w-36 h-4 mt-3">
        <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        <div className="absolute w-2.5 h-2.5 rotate-45 border border-gold bg-cream"></div>
      </div>
    </div>
  );
};
export default SectionTitle;
