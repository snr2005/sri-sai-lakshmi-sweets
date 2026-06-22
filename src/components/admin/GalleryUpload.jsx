import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { X, Upload, CheckCircle } from 'lucide-react';
import { GALLERY_CATEGORIES } from '../../utils/constants';

export const GalleryUpload = ({ onUpload, onClose, defaultCategory }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(defaultCategory || GALLERY_CATEGORIES[0]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !imageFile) {
      toast.error("Please fill in title and choose a file.");
      return;
    }

    setUploading(true);
    setProgress(20);

    try {
      // Simulate progress bar movement
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 15;
        });
      }, 100);

      await onUpload({ title, category, is_featured: false }, imageFile);
      
      clearInterval(interval);
      setProgress(100);
      toast.success("Gallery item uploaded successfully!");
      onClose();
    } catch (e) {
      console.error("Gallery upload error:", e);
      toast.error("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brown-deep/60 backdrop-blur-sm flex items-center justify-center p-4 font-body text-sm select-none">
      
      <div className="bg-white w-full max-w-md rounded-2xl border border-gold-pale shadow-hover overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-cream-dark/50 px-6 py-4 flex items-center justify-between border-b border-gold-pale">
          <h3 className="text-lg font-display font-bold text-brown-deep">
            Upload to Gallery
          </h3>
          <button onClick={onClose} className="text-brown-light hover:text-gold" disabled={uploading}>
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="gall-title" className="font-semibold text-brown-deep">
              Image Title <span className="text-saffron">*</span>
            </label>
            <input
              type="text"
              id="gall-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Wedding Sweet Setup Gannavaram"
              className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/35 text-brown-deep focus:outline-none focus:ring-1 focus:ring-gold"
              required
              disabled={uploading}
            />
          </div>

          {/* Category Select */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="gall-category" className="font-semibold text-brown-deep">
              Category <span className="text-saffron">*</span>
            </label>
            <select
              id="gall-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/35 text-brown-deep focus:outline-none focus:ring-1 focus:ring-gold"
              disabled={uploading}
            >
              {GALLERY_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Image Uploader & Preview */}
          <div className="flex flex-col gap-1.5 mt-1">
            <span className="font-semibold text-brown-deep">
              Choose File <span className="text-saffron">*</span>
            </span>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-cream border border-gold-pale overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-brown-light italic">No File</span>
                )}
              </div>
              <label className="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-gold-pale/60 bg-cream/20 hover:bg-gold-pale/10 rounded-lg p-3 cursor-pointer transition-all">
                <Upload size={20} className="text-gold mb-1" />
                <span className="text-[11px] font-semibold text-brown-deep uppercase">Select Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
          </div>

          {/* Progress Bar */}
          {uploading && (
            <div className="w-full mt-2">
              <div className="flex justify-between text-xs text-brown-light font-semibold mb-1">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 bg-cream-dark rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gold transition-all duration-200" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 mt-6 border-t border-gold-pale/30 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-md border border-brown-light/20 text-brown-deep hover:bg-cream-dark/20 uppercase font-semibold text-xs tracking-wider"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-2.5 rounded-md bg-gold hover:bg-gold-light text-brown-deep disabled:bg-brown-light/40 disabled:cursor-not-allowed uppercase font-bold text-xs tracking-wider shadow-sm hover:shadow"
            >
              {uploading ? 'Processing...' : 'Upload Image'}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
export default GalleryUpload;
