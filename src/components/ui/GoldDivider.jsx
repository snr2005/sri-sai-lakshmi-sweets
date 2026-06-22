import React from 'react';

export const GoldDivider = ({ className = '' }) => (
  <div className={`w-full py-2 flex items-center justify-center ${className}`} role="separator">
    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-80"></div>
  </div>
);
export default GoldDivider;
