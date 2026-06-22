import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Plus, Edit2, Trash2, Search, Candy } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { addProduct, updateProduct, deleteProduct } from '../../services/productService';
import ProductForm from '../../components/admin/ProductForm';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export const ProductsManagePage = () => {
  const { products, loading } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Search filter - exclude Catering Items and Bulk Order Items since they are managed on their own page
  const filteredProducts = products
    .filter(p => p.category !== 'Catering Items' && p.category !== 'Bulk Order Items')
    .filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSaveProduct = async (formData, file) => {
    try {
      if (selectedProduct) {
        // Edit Mode
        await updateProduct(selectedProduct.id, formData, file);
      } else {
        // Add Mode
        await addProduct(formData, file);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const handleToggleFeatured = async (product) => {
    try {
      await updateProduct(product.id, {
        ...product,
        is_featured: !product.is_featured
      });
      toast.success(`${product.name} featured state updated!`);
    } catch (e) {
      toast.error("Failed to update featured state.");
    }
  };

  const handleToggleAvailable = async (product) => {
    try {
      await updateProduct(product.id, {
        ...product,
        is_available: !product.is_available
      });
      toast.success(`${product.name} availability updated!`);
    } catch (e) {
      toast.error("Failed to update availability.");
    }
  };

  const handleDeleteProduct = async (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
      try {
        await deleteProduct(product.id, product.image_url);
        toast.success(`Deleted ${product.name} successfully.`);
      } catch (e) {
        toast.error("Failed to delete product.");
      }
    }
  };

  const openAddModal = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  return (
    <div className="p-6 font-body text-sm select-none">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-brown-light pointer-events-none">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-md border border-brown-light/20 bg-white text-brown-deep placeholder-brown-light/40 focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        {/* Add Button */}
        <button
          onClick={openAddModal}
          className="bg-gold hover:bg-gold-light text-brown-deep font-bold uppercase tracking-wider text-xs px-5 py-3 rounded-md flex items-center justify-center gap-2 shadow-sm"
        >
          <Plus size={16} />
          Add Product
        </button>

      </div>

      {/* Products Table container */}
      <div className="bg-white rounded-xl border border-gold-pale shadow-sm overflow-hidden">
        {loading ? (
          <LoadingSpinner />
        ) : filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gold-pale bg-cream-dark/20 text-brown-light font-semibold uppercase text-xs tracking-wider">
                  <th className="p-4 w-20">Image</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4 text-center">Featured</th>
                  <th className="p-4 text-center">Available</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-pale/20 text-brown-deep">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-cream/10">
                    {/* Thumbnail */}
                    <td className="p-4">
                      <div className="w-12 h-12 rounded bg-cream border border-gold-pale overflow-hidden flex items-center justify-center">
                        <img 
                          src={p.image_url || 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=1200&auto=format&fit=crop'} 
                          alt={p.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    
                    {/* Product Details */}
                    <td className="p-4">
                      <p className="font-bold text-brown-deep">{p.name}</p>
                      <p className="text-xs text-brown-light line-clamp-1 max-w-[250px] mt-0.5">{p.description}</p>
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <span className="text-[10px] font-bold text-gold uppercase tracking-widest bg-gold-pale px-2 py-0.5 rounded-full">
                        {p.category}
                      </span>
                    </td>

                    {/* Featured toggle */}
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={!!p.is_featured}
                        onChange={() => handleToggleFeatured(p)}
                        className="w-4 h-4 text-gold border-brown-light/35 focus:ring-gold rounded cursor-pointer"
                      />
                    </td>

                    {/* Available toggle */}
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={p.is_available !== false}
                        onChange={() => handleToggleAvailable(p)}
                        className="w-4 h-4 text-gold border-brown-light/35 focus:ring-gold rounded cursor-pointer"
                      />
                    </td>

                    {/* Action buttons */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-brown-light hover:text-gold rounded hover:bg-cream-dark/30"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p)}
                          className="p-1.5 text-brown-light hover:text-danger rounded hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-brown-light flex flex-col items-center justify-center">
            <Candy size={36} className="text-gold mb-3" />
            <p className="font-semibold text-brown-deep">No Products Found</p>
            <p className="text-xs text-brown-light mt-1">Start by clicking the "Add Product" button above.</p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <ProductForm
          product={selectedProduct}
          onSave={handleSaveProduct}
          onClose={() => setIsFormOpen(false)}
        />
      )}

    </div>
  );
};
export default ProductsManagePage;
