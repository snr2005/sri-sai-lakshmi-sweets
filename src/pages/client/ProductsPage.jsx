import React, { useState } from 'react';
import { Search, ChevronRight, UtensilsCrossed, ShoppingBag, Package } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/ui/ProductCard';
import CategoryFilter from '../../components/ui/CategoryFilter';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import SectionTitle from '../../components/ui/SectionTitle';
import { CATEGORIES } from '../../utils/constants';
import { getCateringInquiryLink } from '../../utils/whatsapp';

// Categories shown in the regular product grid (NOT catering/bulk — those get own sections)
const REGULAR_CATEGORIES = CATEGORIES.filter(
  c => c !== 'Catering Items' && c !== 'Bulk Order Items'
);

export const ProductsPage = () => {
  const { products, loading } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Separate products into groups
  const regularProducts = products.filter(
    p => p.category !== 'Catering Items' && p.category !== 'Bulk Order Items'
  );
  const cateringItems = products.filter(p => p.category === 'Catering Items' && p.is_available !== false);
  const bulkItems = products.filter(p => p.category === 'Bulk Order Items' && p.is_available !== false);

  // Build category filter list from regular products only
  const filterCategories = [
    'All',
    ...REGULAR_CATEGORIES.filter(cat => regularProducts.some(p => p.category === cat))
  ];

  // Filter regular products by category and search
  const filteredProducts = regularProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="font-body select-none">

      {/* 1. COMPACT HERO STRIP */}
      <section className="bg-choco-footer text-white py-16 px-4 border-b border-gold relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none select-none blur-[3px] scale-105"
          style={{ backgroundImage: "url('/sweets_header.png')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-choco-footer/90 via-choco-footer/80 to-choco-footer/95 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-cream-dark tracking-wide" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.75))' }}>
              Our Sweets &amp; Hot Items
            </h1>
            <p className="text-gold-light/95 text-xs md:text-sm mt-1.5 font-medium" style={{ textShadow: '0px 1px 3px rgba(0, 0, 0, 0.9)' }}>
              Explore our fresh daily catalog of handcrafted Indian treats.
            </p>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-xs text-cream-dark font-semibold uppercase tracking-wider bg-black/30 px-4 py-2 rounded-full border border-gold/20 backdrop-blur-sm shadow-md self-start md:self-auto">
            <a href="/" className="hover:text-gold-light transition-colors">Home</a>
            <ChevronRight size={12} className="text-gold" />
            <span className="text-gold-light font-bold">Sweets Menu</span>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH BAR */}
      <section className="bg-cream-dark/40 py-6 px-4 border-b border-gold-pale">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-grow">
            <CategoryFilter
              categories={filterCategories}
              activeCategory={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-brown-light pointer-events-none">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search sweets or snacks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-brown-light/20 bg-cream text-brown-deep placeholder-brown-light/50 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold text-sm shadow-sm transition-all"
            />
          </div>
        </div>
      </section>

      {/* 3. REGULAR PRODUCT GRID */}
      <section className="py-12 md:py-16 px-4 max-w-7xl mx-auto min-h-[45vh]">
        {loading ? (
          <div className="py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-beige-card/30 rounded-lg border border-dashed border-gold-pale/50 p-6">
            <div className="w-16 h-16 rounded-full bg-gold-pale/30 text-gold flex items-center justify-center text-3xl mb-4">🍬</div>
            <h3 className="font-display font-bold text-xl text-brown-deep mb-2">No Mithai Found!</h3>
            <p className="text-brown-mid text-sm max-w-md">
              We couldn't find any items matching your filter or search. Please try checking another category or refining your spelling.
            </p>
          </div>
        )}
      </section>
      {/* ═══════════════════════════════════════════════════════════
          4. CATERING ITEMS SECTION — Dynamic from Admin Dashboard
      ══════════════════════════════════════════════════════════════ */}
      {!loading && cateringItems.length > 0 && (
        <section className="py-14 px-4 bg-gradient-to-b from-cream to-beige-card/40 border-t border-gold-pale">
          <div className="max-w-7xl mx-auto">

            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-saffron/15 border border-saffron/30 flex items-center justify-center">
                  <UtensilsCrossed size={22} className="text-saffron" />
                </div>
                <div>
                  <p className="text-saffron font-accent italic text-sm">For Weddings, Functions &amp; Events</p>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-brown-deep">Catering Items</h2>
                </div>
              </div>
              <a
                href={getCateringInquiryLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start md:self-auto bg-saffron hover:bg-saffron/90 text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-md shadow-sm flex items-center gap-2 transition-transform hover:scale-105"
              >
                <UtensilsCrossed size={14} />
                Book Catering
              </a>
            </div>

            {/* Catering Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cateringItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          5. BULK ORDER ITEMS SECTION — Dynamic from Admin Dashboard
      ══════════════════════════════════════════════════════════════ */}
      {!loading && bulkItems.length > 0 && (
        <section className="py-14 px-4 bg-gradient-to-b from-beige-card/40 to-cream border-t border-gold-pale">
          <div className="max-w-7xl mx-auto">

            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold-pale/60 border border-gold/30 flex items-center justify-center">
                  <Package size={22} className="text-gold" />
                </div>
                <div>
                  <p className="text-gold font-accent italic text-sm">Corporate Gifts, Festival Boxes &amp; More</p>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-brown-deep">Bulk Order Items</h2>
                </div>
              </div>
              <a
                href={getCateringInquiryLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start md:self-auto bg-gold hover:bg-gold-light text-brown-deep font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-md shadow-sm flex items-center gap-2 transition-transform hover:scale-105"
              >
                <ShoppingBag size={14} />
                Inquire for Bulk
              </a>
            </div>

            {/* Bulk Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bulkItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};
export default ProductsPage;
