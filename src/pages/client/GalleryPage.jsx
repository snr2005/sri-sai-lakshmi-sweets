import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { ChevronRight } from 'lucide-react';
import { useGallery } from '../../hooks/useGallery';
import GalleryCard from '../../components/ui/GalleryCard';
import CategoryFilter from '../../components/ui/CategoryFilter';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { GALLERY_CATEGORIES } from '../../utils/constants';

export const GalleryPage = () => {
  const { gallery, loading } = useGallery();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filterCategories = [
    'All',
    ...GALLERY_CATEGORIES.filter(cat => gallery.some(item => item.category === cat))
  ];

  // Filter gallery items by category
  const filteredGallery = gallery.filter((item) => {
    return selectedCategory === 'All' || item.category === selectedCategory;
  });

  // Split filteredGallery into 3 columns round-robin
  const col1 = [];
  const col2 = [];
  const col3 = [];
  
  filteredGallery.forEach((item, index) => {
    if (index % 3 === 0) col1.push(item);
    else if (index % 3 === 1) col2.push(item);
    else col3.push(item);
  });

  // Duplicate arrays to make sure infinite loop is seamless
  const extendItems = (arr) => {
    if (arr.length === 0) return [];
    if (arr.length < 3) {
      return [...arr, ...arr, ...arr, ...arr];
    }
    return [...arr, ...arr];
  };

  const col1Extended = extendItems(col1);
  const col2Extended = extendItems(col2);
  const col3Extended = extendItems(col3);



  return (
    <div className="font-body select-none">
      
      {/* 1. COMPACT HERO STRIP */}
      <section className="bg-choco-footer text-white py-16 px-4 border-b border-gold relative overflow-hidden">
        {/* Background Image + Blur & Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none select-none blur-[3px] scale-105"
          style={{ backgroundImage: "url('/sweets_header.png')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-choco-footer/90 via-choco-footer/80 to-choco-footer/95 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-cream-dark tracking-wide" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.75))' }}>
              Traditional Photo Gallery
            </h1>
            <p className="text-gold-light/95 text-xs md:text-sm mt-1.5 font-medium" style={{ textShadow: '0px 1px 3px rgba(0, 0, 0, 0.9)' }}>
              Scroll through images of our preparation kitchen, catering counters, and beloved sweets.
            </p>
          </div>
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 text-xs text-cream-dark font-semibold uppercase tracking-wider bg-black/30 px-4 py-2 rounded-full border border-gold/20 backdrop-blur-sm shadow-md self-start md:self-auto">
            <a href="/" className="hover:text-gold-light transition-colors">Home</a>
            <ChevronRight size={12} className="text-gold" />
            <span className="text-gold-light font-bold">Gallery</span>
          </div>
        </div>
      </section>

      {/* 2. FILTER STRIP */}
      <section className="bg-cream-dark/40 py-4 px-4 border-b border-gold-pale">
        <div className="max-w-7xl mx-auto">
          <CategoryFilter
            categories={filterCategories}
            activeCategory={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>
      </section>

      {/* 3. DYNAMIC LIVE SCROLLING GALLERY GRID */}
      <section className="py-12 md:py-16 px-4 max-w-7xl mx-auto select-none">
        {loading ? (
          <div className="py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredGallery.length > 0 ? (
            /* Vertical 3-Column scrolling layout */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[75vh] min-h-[550px] max-h-[750px] overflow-hidden relative rounded-2xl border border-gold-pale/60 bg-cream-dark/5 p-4 shadow-card">
              
              {/* Ambient gradients at top and bottom to fade images out softly */}
              <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-cream to-transparent pointer-events-none z-10"></div>
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-cream to-transparent pointer-events-none z-10"></div>

              {/* Column 1: Scrolls Downwards */}
              <div className="h-full overflow-hidden pause-on-hover flex flex-col">
                <div className="flex flex-col gap-5 animate-marquee-down py-2">
                  {col1Extended.map((item, idx) => (
                    <GalleryCard
                      key={`col1-${item.id}-${idx}`}
                      item={item}
                      onOpenLightbox={() => setLightboxIndex(filteredGallery.indexOf(item))}
                    />
                  ))}
                </div>
              </div>

              {/* Column 2: Scrolls Upwards */}
              <div className="hidden md:flex h-full overflow-hidden pause-on-hover flex-col">
                <div className="flex flex-col gap-5 animate-marquee-up py-2">
                  {col2Extended.map((item, idx) => (
                    <GalleryCard
                      key={`col2-${item.id}-${idx}`}
                      item={item}
                      onOpenLightbox={() => setLightboxIndex(filteredGallery.indexOf(item))}
                    />
                  ))}
                </div>
              </div>

              {/* Column 3: Scrolls Downwards */}
              <div className="hidden md:flex h-full overflow-hidden pause-on-hover flex-col">
                <div className="flex flex-col gap-5 animate-marquee-down py-2">
                  {col3Extended.map((item, idx) => (
                    <GalleryCard
                      key={`col3-${item.id}-${idx}`}
                      item={item}
                      onOpenLightbox={() => setLightboxIndex(filteredGallery.indexOf(item))}
                    />
                  ))}
                </div>
              </div>

            </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center text-center py-20 bg-beige-card/30 rounded-lg border border-dashed border-gold-pale/50 p-6">
            <div className="w-16 h-16 rounded-full bg-gold-pale/30 text-gold flex items-center justify-center text-3xl mb-4">
              🖼️
            </div>
            <h3 className="font-display font-bold text-xl text-brown-deep mb-2">
              No Images Found!
            </h3>
            <p className="text-brown-mid text-sm max-w-md">
              We don't have any images matching the selected category. Check back soon for fresh snapshots!
            </p>
          </div>
        )}
      </section>

      {/* 4. LIGHTBOX VIEWER INTEGRATION */}
      {lightboxIndex >= 0 && (
        <Lightbox
          index={lightboxIndex}
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          slides={filteredGallery.map((item) => ({ 
            src: item.image_url, 
            alt: item.title,
            title: item.title 
          }))}
        />
      )}

    </div>
  );
};
export default GalleryPage;
