import React from 'react';

export const LoadingSpinner = ({ size = 'md' }) => {
  const dimensions = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  }[size];

  return (
    <div className="flex flex-col items-center justify-center py-12 select-none">
      <div className={`relative ${dimensions} animate-spin`}>
        <svg 
          className="w-full h-full text-gold" 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="6,6" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="3" strokeDasharray="15,8" />
          <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" />
          <path d="M50,10 L50,90 M10,50 L90,50" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      <p className="mt-4 font-accent italic text-gold text-sm animate-pulse">
        Relishing Traditional Taste...
      </p>
    </div>
  );
};
export default LoadingSpinner;
