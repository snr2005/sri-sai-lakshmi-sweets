import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Plus, Trash2, Image, Filter } from 'lucide-react';
import { useGallery } from '../../hooks/useGallery';
import { addGalleryItem, deleteGalleryItem } from '../../services/galleryService';
import GalleryUpload from '../../components/admin/GalleryUpload';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { GALLERY_CATEGORIES } from '../../utils/constants';

const CATEGORY_META = {
  'Sweets':          { emoji: '🍬', color: 'text-saffron',     bg: 'bg-saffron/10' },
  'Hot Items':       { emoji: '🔥', color: 'text-danger',      bg: 'bg-red-50' },
  'Cakes & Bakery':  { emoji: '🎂', color: 'text-pink-600',    bg: 'bg-pink-50' },
};

export const GalleryManagePage = () => {
  const { gallery, loading } = useGallery();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  const handleUploadItem = async (galleryData, file) => {
    try {
      await addGalleryItem(galleryData, file);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const handleDeleteItem = async (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      try {
        await deleteGalleryItem(item.id, item.image_url);
        toast.success('Gallery item deleted successfully.');
      } catch (e) {
        toast.error('Failed to delete gallery item.');
      }
    }
  };

  const tabs = ['All', ...GALLERY_CATEGORIES];

  const filteredGallery = activeTab === 'All'
    ? gallery
    : gallery.filter(item => item.category === activeTab);

  // Category count summary
  const categoryCounts = GALLERY_CATEGORIES.reduce((acc, cat) => {
    acc[cat] = gallery.filter(item => item.category === cat).length;
    return acc;
  }, {});

  return (
    <div className="p-6 font-body text-sm select-none">

      {/* Category Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {GALLERY_CATEGORIES.map(cat => {
          const meta = CATEGORY_META[cat] || { emoji: '🖼️', color: 'text-brown-mid', bg: 'bg-cream' };
          return (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all text-center ${
                activeTab === cat
                  ? 'border-gold bg-gold-pale/30 shadow-sm'
                  : `border-brown-light/10 ${meta.bg} hover:border-gold/40`
              }`}
            >
              <span className="text-2xl mb-1">{meta.emoji}</span>
              <span className={`font-bold text-base leading-none ${meta.color}`}>{categoryCounts[cat] || 0}</span>
              <span className="text-[9px] font-semibold text-brown-light uppercase tracking-wider mt-0.5 leading-tight">{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        {/* Tab Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-brown-light flex-shrink-0" />
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border transition-all ${
                activeTab === tab
                  ? 'bg-gold text-brown-deep border-gold shadow-sm'
                  : 'bg-white text-brown-mid border-brown-light/20 hover:bg-cream-dark/30'
              }`}
            >
              {tab === 'All'
                ? `All (${gallery.length})`
                : `${CATEGORY_META[tab]?.emoji || ''} ${tab} (${categoryCounts[tab] || 0})`
              }
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="bg-gold hover:bg-gold-light text-brown-deep font-bold uppercase tracking-wider text-xs px-5 py-3 rounded-md flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
        >
          <Plus size={16} />
          Upload Image
        </button>
      </div>



      {/* Grid Display */}
      {loading ? (
        <LoadingSpinner />
      ) : filteredGallery.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item) => {
            const meta = CATEGORY_META[item.category] || { emoji: '🖼️', color: 'text-brown-mid' };
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gold-pale overflow-hidden shadow-sm flex flex-col justify-between group relative"
              >
                {/* Image Preview */}
                <div className="h-44 bg-cream overflow-hidden border-b border-gold-pale relative">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Delete Button */}
                  <div className="absolute top-2.5 right-2.5">
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="p-2 bg-white/95 text-brown-light hover:text-danger rounded-full shadow-md hover:scale-105 transition-transform"
                      title="Delete image"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Category Pill */}
                  <span className="absolute bottom-2.5 left-2.5 bg-choco-footer/80 text-gold-light text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
                    {meta.emoji} {item.category}
                  </span>
                </div>

                {/* Title */}
                <div className="p-4">
                  <h4 className="font-display font-bold text-sm text-brown-deep line-clamp-2 leading-tight">
                    {item.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-14 bg-white rounded-xl border border-gold-pale text-center text-brown-light flex flex-col items-center justify-center">
          <Image size={36} className="text-gold mb-3" />
          <p className="font-semibold text-brown-deep">
            {activeTab === 'All' ? 'Gallery Empty' : `No ${activeTab} Images`}
          </p>
          <p className="text-xs text-brown-light mt-1">
            {activeTab === 'All'
              ? 'Upload images of sweets, catering, or operations.'
              : `Upload images tagged as "${activeTab}" and they will appear on the client Gallery page.`
            }
          </p>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <GalleryUpload
          onUpload={handleUploadItem}
          onClose={() => setIsUploadOpen(false)}
          defaultCategory={activeTab !== 'All' ? activeTab : undefined}
        />
      )}
    </div>
  );
};
export default GalleryManagePage;
