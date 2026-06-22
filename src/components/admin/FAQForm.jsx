import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { X } from 'lucide-react';
import { FAQ_CATEGORIES } from '../../utils/constants';

export const FAQForm = ({ faq, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: FAQ_CATEGORIES[0],
    is_active: true
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (faq) {
      setFormData({
        question: faq.question || '',
        answer: faq.answer || '',
        category: faq.category || FAQ_CATEGORIES[0],
        is_active: faq.is_active !== false
      });
    }
  }, [faq]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error("Please fill in both question and answer.");
      return;
    }

    setSubmitting(true);
    try {
      await onSave(formData);
      toast.success(faq ? "FAQ updated successfully!" : "FAQ added successfully!");
      onClose();
    } catch (error) {
      console.error("FAQ save error:", error);
      toast.error("Failed to save FAQ.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brown-deep/60 backdrop-blur-sm flex items-center justify-center p-4 font-body text-sm select-none">
      
      <div className="bg-white w-full max-w-md rounded-2xl border border-gold-pale shadow-hover overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-cream-dark/50 px-6 py-4 flex items-center justify-between border-b border-gold-pale">
          <h3 className="text-lg font-display font-bold text-brown-deep">
            {faq ? 'Edit Chatbot FAQ' : 'Add New FAQ'}
          </h3>
          <button onClick={onClose} className="text-brown-light hover:text-gold" disabled={submitting}>
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          
          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="faq-category" className="font-semibold text-brown-deep">
              FAQ Category <span className="text-saffron">*</span>
            </label>
            <select
              id="faq-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/35 text-brown-deep focus:outline-none focus:ring-1 focus:ring-gold"
              disabled={submitting}
            >
              {FAQ_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Question */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="faq-question" className="font-semibold text-brown-deep">
              Question <span className="text-saffron">*</span>
            </label>
            <input
              type="text"
              id="faq-question"
              name="question"
              required
              value={formData.question}
              onChange={handleChange}
              placeholder="e.g. Do you accept bulk orders?"
              className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/35 text-brown-deep focus:outline-none focus:ring-1 focus:ring-gold"
              disabled={submitting}
            />
          </div>

          {/* Answer */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="faq-answer" className="font-semibold text-brown-deep">
              Answer <span className="text-saffron">*</span>
            </label>
            <textarea
              id="faq-answer"
              name="answer"
              required
              rows="4"
              value={formData.answer}
              onChange={handleChange}
              placeholder="e.g. Absolutely! We accept bulk orders for all functions..."
              className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/35 text-brown-deep focus:outline-none focus:ring-1 focus:ring-gold resize-none"
              disabled={submitting}
            ></textarea>
          </div>

          {/* Is Active Toggle */}
          <label className="flex items-center gap-3 p-3 bg-cream/30 rounded-lg border border-gold-pale/30 cursor-pointer mt-1">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="w-4 h-4 text-gold border-brown-light/30 focus:ring-gold rounded"
              disabled={submitting}
            />
            <div>
              <span className="font-semibold text-brown-deep text-xs block">Is Active</span>
              <span className="text-[10px] text-brown-light">Displays as a chatbot chip option</span>
            </div>
          </label>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 mt-6 border-t border-gold-pale/30 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-md border border-brown-light/20 text-brown-deep hover:bg-cream-dark/20 uppercase font-semibold text-xs tracking-wider"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-md bg-gold hover:bg-gold-light text-brown-deep disabled:bg-brown-light/40 disabled:cursor-not-allowed uppercase font-bold text-xs tracking-wider shadow-sm hover:shadow"
            >
              {submitting ? 'Saving...' : 'Save FAQ'}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
export default FAQForm;
