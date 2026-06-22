import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { X, Upload } from 'lucide-react';
import { CATEGORIES } from '../../utils/constants';

export const ProductForm = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: CATEGORIES[0],
    description: '',
    is_featured: false,
    is_available: true,
    image_url: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || CATEGORIES[0],
        description: product.description || '',
        is_featured: !!product.is_featured,
        is_available: product.is_available !== false,
        image_url: product.image_url || ''
      });
      setImagePreview(product.image_url || '');
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!product && !imageFile) {
      toast.error("Please select a product image.");
      return;
    }

    setSubmitting(true);
    try {
      await onSave(formData, imageFile);
      toast.success(product ? "Product updated successfully!" : "Product added successfully!");
      onClose();
    } catch (error) {
      console.error("Save product error:", error);
      toast.error("Failed to save product.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brown-deep/60 backdrop-blur-sm flex items-center justify-center p-4 font-body text-sm select-none">
      
      <div className="bg-white w-full max-w-lg rounded-2xl border border-gold-pale shadow-hover overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-cream-dark/50 px-6 py-4 flex items-center justify-between border-b border-gold-pale">
          <h3 className="text-lg font-display font-bold text-brown-deep">
            {product ? 'Edit Sweets Product' : 'Add New Product'}
          </h3>
          <button onClick={onClose} className="text-brown-light hover:text-gold">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[75vh]">
          
          {/* Product Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="prod-name" className="font-semibold text-brown-deep">
              Product Name <span className="text-saffron">*</span>
            </label>
            <input
              type="text"
              id="prod-name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Kaju Katli"
              className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/35 text-brown-deep focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>

          {/* Category Select */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="prod-category" className="font-semibold text-brown-deep">
              Category <span className="text-saffron">*</span>
            </label>
            <select
              id="prod-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/35 text-brown-deep focus:outline-none focus:ring-1 focus:ring-gold"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description (max 200 chars) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="prod-desc" className="font-semibold text-brown-deep">
                Description <span className="text-saffron">*</span>
              </label>
              <span className={`text-[11px] ${formData.description.length > 200 ? 'text-danger font-bold' : 'text-brown-light'}`}>
                {formData.description.length} / 200 chars
              </span>
            </div>
            <textarea
              id="prod-desc"
              name="description"
              required
              maxLength="200"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              placeholder="Silky smooth cashew sweets made with pure ghee..."
              className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/35 text-brown-deep focus:outline-none focus:ring-1 focus:ring-gold resize-none"
            ></textarea>
          </div>

          {/* Image Uploader & Preview */}
          <div className="flex flex-col gap-1.5">
            <span className="font-semibold text-brown-deep">
              Product Image <span className="text-saffron">*</span>
            </span>
            <div className="flex items-center gap-4">
              {/* Preview */}
              <div className="w-24 h-24 rounded-lg bg-cream border border-gold-pale overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-brown-light italic">No Image</span>
                )}
              </div>
              {/* Uploader Input */}
              <label className="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-gold-pale/60 bg-cream/20 hover:bg-gold-pale/10 rounded-lg p-4 cursor-pointer transition-all">
                <Upload size={22} className="text-gold mb-1" />
                <span className="text-xs font-semibold text-brown-deep uppercase tracking-wider">Upload File</span>
                <span className="text-[10px] text-brown-light mt-0.5">JPG, PNG up to 5MB</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Toggles (Featured & Available) */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            
            {/* Is Featured */}
            <label className="flex items-center gap-3 p-3 bg-cream/30 rounded-lg border border-gold-pale/30 cursor-pointer">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="w-4 h-4 text-gold border-brown-light/30 focus:ring-gold rounded"
              />
              <div>
                <span className="font-semibold text-brown-deep text-xs block">Is Featured</span>
                <span className="text-[10px] text-brown-light">Displays on homepage list</span>
              </div>
            </label>

            {/* Is Available */}
            <label className="flex items-center gap-3 p-3 bg-cream/30 rounded-lg border border-gold-pale/30 cursor-pointer">
              <input
                type="checkbox"
                name="is_available"
                checked={formData.is_available}
                onChange={handleChange}
                className="w-4 h-4 text-gold border-brown-light/30 focus:ring-gold rounded"
              />
              <div>
                <span className="font-semibold text-brown-deep text-xs block">Is Available</span>
                <span className="text-[10px] text-brown-light">Set availability status</span>
              </div>
            </label>

          </div>

          {/* Save / Cancel Buttons */}
          <div className="flex items-center justify-end gap-3 mt-6 border-t border-gold-pale/30 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-md border border-brown-light/20 text-brown-deep hover:bg-cream-dark/20 uppercase font-semibold text-xs tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-md bg-gold hover:bg-gold-light text-brown-deep disabled:bg-brown-light/40 disabled:cursor-not-allowed uppercase font-bold text-xs tracking-wider shadow-sm hover:shadow"
            >
              {submitting ? 'Saving...' : 'Save Product'}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
export default ProductForm;
