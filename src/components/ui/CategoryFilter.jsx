import React from 'react';

export const CategoryFilter = ({ categories, activeCategory, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center py-4 select-none">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`px-4 py-2 text-xs md:text-sm font-body font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
              isActive
                ? 'bg-gold text-white shadow-gold border border-gold'
                : 'bg-cream-dark text-brown-mid hover:bg-gold-pale border border-transparent'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};
export default CategoryFilter;
