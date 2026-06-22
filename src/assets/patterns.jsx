import React from 'react';

export const PaisleyPattern = () => (
  <svg 
    className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none fill-current text-gold" 
    xmlns="http://www.w3.org/2000/svg" 
    width="100%" 
    height="100%"
  >
    <defs>
      <pattern id="paisley" width="80" height="80" patternUnits="userSpaceOnUse">
        {/* Main Paisley Shape */}
        <path d="M40,5 C47,20 60,25 60,40 C60,55 48,68 35,68 C22,68 15,55 15,40 C15,25 28,20 40,5 Z M40,20 C36,28 27,32 27,40 C27,47 33,53 40,53 C47,53 53,47 53,40 C53,32 44,28 40,20 Z" />
        
        {/* Accenting Dots */}
        <circle cx="10" cy="10" r="2" />
        <circle cx="70" cy="10" r="2" />
        <circle cx="70" cy="70" r="2" />
        <circle cx="10" cy="70" r="2" />
        
        {/* Small Flower motif */}
        <path d="M40,73 L42,75 L40,77 L38,75 Z" />
        <path d="M5,40 L7,42 L9,40 L7,38 Z" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#paisley)" />
  </svg>
);

export const MandalaPattern = () => (
  <svg 
    className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none fill-none stroke-current text-gold" 
    xmlns="http://www.w3.org/2000/svg" 
    width="100%" 
    height="100%"
  >
    <defs>
      <pattern id="mandala" width="120" height="120" patternUnits="userSpaceOnUse">
        <circle cx="60" cy="60" r="45" strokeWidth="1" />
        <circle cx="60" cy="60" r="30" strokeWidth="0.8" strokeDasharray="2,2" />
        <circle cx="60" cy="60" r="15" strokeWidth="0.8" />
        
        {/* Spokes */}
        <path d="M60,15 L60,105 M15,60 L105,60" strokeWidth="0.8" />
        <path d="M28,28 L92,92 M28,92 L92,28" strokeWidth="0.8" strokeDasharray="1,2" />
        
        {/* Surrounding accents */}
        <circle cx="10" cy="10" r="1" />
        <circle cx="110" cy="10" r="1" />
        <circle cx="110" cy="110" r="1" />
        <circle cx="10" cy="110" r="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#mandala)" />
  </svg>
);
