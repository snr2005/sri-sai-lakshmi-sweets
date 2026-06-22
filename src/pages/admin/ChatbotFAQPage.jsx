import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Plus, Edit2, Trash2, ShieldQuestion, ToggleLeft, ToggleRight } from 'lucide-react';
import { useFAQs } from '../../hooks/useFAQs';
import { addFAQ, updateFAQ, deleteFAQ } from '../../services/faqService';
import FAQForm from '../../components/admin/FAQForm';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { truncateText } from '../../utils/formatters';

export const ChatbotFAQPage = () => {
  const { faqs, loading } = useFAQs();
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSaveFAQ = async (formData) => {
    try {
      if (selectedFAQ) {
        // Edit Mode
        await updateFAQ(selectedFAQ.id, formData);
      } else {
        // Add Mode
        await addFAQ(formData);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const handleToggleActive = async (faq) => {
    try {
      await updateFAQ(faq.id, {
        ...faq,
        is_active: !faq.is_active
      });
      toast.success(`${faq.question} status changed!`);
    } catch (e) {
      toast.error("Failed to update status.");
    }
  };

  const handleDeleteFAQ = async (faq) => {
    if (window.confirm(`Are you sure you want to delete the FAQ: "${faq.question}"?`)) {
      try {
        await deleteFAQ(faq.id);
        toast.success("FAQ deleted successfully.");
      } catch (e) {
        toast.error("Failed to delete FAQ.");
      }
    }
  };

  const openAddModal = () => {
    setSelectedFAQ(null);
    setIsFormOpen(true);
  };

  const openEditModal = (faq) => {
    setSelectedFAQ(faq);
    setIsFormOpen(true);
  };

  return (
    <div className="p-6 font-body text-sm select-none">
      
      {/* Action Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-xs text-brown-light font-semibold uppercase tracking-wider">
            Total Chatbot FAQs: {faqs.length}
          </p>
        </div>
        
        <button
          onClick={openAddModal}
          className="bg-gold hover:bg-gold-light text-brown-deep font-bold uppercase tracking-wider text-xs px-5 py-3 rounded-md flex items-center justify-center gap-2 shadow-sm"
        >
          <Plus size={16} />
          Add FAQ
        </button>
      </div>

      {/* FAQs Table container */}
      <div className="bg-white rounded-xl border border-gold-pale shadow-sm overflow-hidden">
        {loading ? (
          <LoadingSpinner />
        ) : faqs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gold-pale bg-cream-dark/20 text-brown-light font-semibold uppercase text-xs tracking-wider">
                  <th className="p-4">Category</th>
                  <th className="p-4">Question</th>
                  <th className="p-4">Answer Response</th>
                  <th className="p-4 text-center">Is Active</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-pale/20 text-brown-deep">
                {faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-cream/10">
                    
                    {/* Category Label */}
                    <td className="p-4 whitespace-nowrap">
                      <span className="text-[10px] font-bold text-gold uppercase tracking-widest bg-gold-pale px-2.5 py-0.5 rounded-full">
                        {faq.category}
                      </span>
                    </td>

                    {/* Question */}
                    <td className="p-4 font-semibold text-brown-deep max-w-[200px] break-words">
                      {faq.question}
                    </td>

                    {/* Answer */}
                    <td className="p-4 text-brown-mid max-w-[300px]">
                      {truncateText(faq.answer, 120)}
                    </td>

                    {/* Active toggle */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleActive(faq)}
                        className="p-1 text-brown-light hover:text-gold transition-colors"
                        title={faq.is_active ? 'Mark inactive' : 'Mark active'}
                      >
                        {faq.is_active ? (
                          <ToggleRight size={28} className="text-gold" />
                        ) : (
                          <ToggleLeft size={28} className="text-brown-light/45" />
                        )}
                      </button>
                    </td>

                    {/* Action buttons */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(faq)}
                          className="p-1.5 text-brown-light hover:text-gold rounded hover:bg-cream-dark/30"
                          title="Edit FAQ"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteFAQ(faq)}
                          className="p-1.5 text-brown-light hover:text-danger rounded hover:bg-red-50"
                          title="Delete FAQ"
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
            <ShieldQuestion size={36} className="text-gold mb-3" />
            <p className="font-semibold text-brown-deep">No FAQs Configured</p>
            <p className="text-xs text-brown-light mt-1">Start by adding FAQ responses using the buttons above.</p>
          </div>
        )}
      </div>

      {/* FAQ Form Modal */}
      {isFormOpen && (
        <FAQForm
          faq={selectedFAQ}
          onSave={handleSaveFAQ}
          onClose={() => setIsFormOpen(false)}
        />
      )}

    </div>
  );
};
export default ChatbotFAQPage;
