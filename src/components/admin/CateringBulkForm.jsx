import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { X } from 'lucide-react';

const ORDER_TYPES = ['Catering', 'Bulk Order'];
const STATUSES = ['Pending', 'Confirmed', 'Prepared', 'Delivered', 'Cancelled'];

export const CateringBulkForm = ({ order, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    order_type: ORDER_TYPES[0],
    occasion: '',
    event_date: '',
    items: '',
    total_price: '',
    advance_paid: '',
    status: STATUSES[0],
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (order) {
      setFormData({
        customer_name: order.customer_name || '',
        customer_phone: order.customer_phone || '',
        order_type: order.order_type || ORDER_TYPES[0],
        occasion: order.occasion || '',
        event_date: order.event_date || '',
        items: order.items || '',
        total_price: order.total_price || '',
        advance_paid: order.advance_paid || '',
        status: order.status || STATUSES[0],
        notes: order.notes || ''
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customer_name.trim() || !formData.customer_phone.trim() || !formData.event_date || !formData.items.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        total_price: Number(formData.total_price) || 0,
        advance_paid: Number(formData.advance_paid) || 0
      };
      await onSave(payload);
      toast.success(order ? 'Order updated successfully!' : 'Order booked successfully!');
      onClose();
    } catch (error) {
      console.error('Save order error:', error);
      toast.error('Failed to save order details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brown-deep/60 backdrop-blur-sm flex items-center justify-center p-4 font-body text-sm select-none">
      <div className="bg-white w-full max-w-lg rounded-2xl border border-gold-pale shadow-hover overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-cream-dark/60 to-cream/40 px-6 py-4 flex items-center justify-between border-b border-gold-pale">
          <div>
            <h3 className="text-lg font-display font-bold text-brown-deep">
              {order ? 'Edit Order Details' : 'Book Catering / Bulk Order'}
            </h3>
            <p className="text-xs text-brown-light mt-0.5">
              Record custom event details for shop tracker — not visible to customers
            </p>
          </div>
          <button onClick={onClose} className="text-brown-light hover:text-gold ml-4">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[75vh]">
          {/* Customer Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="ord-name" className="font-semibold text-brown-deep">
              Customer Name <span className="text-saffron">*</span>
            </label>
            <input
              type="text"
              id="ord-name"
              name="customer_name"
              required
              value={formData.customer_name}
              onChange={handleChange}
              placeholder="e.g. Ramesh Kumar"
              className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/35 text-brown-deep focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>

          {/* Customer Phone */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="ord-phone" className="font-semibold text-brown-deep">
              Customer Phone <span className="text-saffron">*</span>
            </label>
            <input
              type="text"
              id="ord-phone"
              name="customer_phone"
              required
              value={formData.customer_phone}
              onChange={handleChange}
              placeholder="e.g. +91 99887 76655"
              className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/35 text-brown-deep focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>

          {/* Order Type & Occasion */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="ord-type" className="font-semibold text-brown-deep">
                Order Type <span className="text-saffron">*</span>
              </label>
              <select
                id="ord-type"
                name="order_type"
                value={formData.order_type}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/35 text-brown-deep focus:outline-none focus:ring-1 focus:ring-gold"
              >
                {ORDER_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="ord-occasion" className="font-semibold text-brown-deep">
                Occasion / Event
              </label>
              <input
                type="text"
                id="ord-occasion"
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                placeholder="e.g. Wedding Reception"
                className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/35 text-brown-deep focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
          </div>

          {/* Event/Delivery Date */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="ord-date" className="font-semibold text-brown-deep">
              Event / Delivery Date <span className="text-saffron">*</span>
            </label>
            <input
              type="date"
              id="ord-date"
              name="event_date"
              required
              value={formData.event_date}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/35 text-brown-deep focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>

          {/* Ordered Items List */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="ord-items" className="font-semibold text-brown-deep">
              Ordered Items &amp; Quantities <span className="text-saffron">*</span>
            </label>
            <textarea
              id="ord-items"
              name="items"
              required
              rows="3"
              value={formData.items}
              onChange={handleChange}
              placeholder="e.g. Laddu - 10 kg, Kaju Katli - 5 kg, Savory Mixture - 20 packets"
              className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/35 text-brown-deep focus:outline-none focus:ring-1 focus:ring-gold resize-none"
            />
          </div>

          {/* Financials (Price & Advance) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="ord-price" className="font-semibold text-brown-deep">
                Total Price (₹)
              </label>
              <input
                type="number"
                id="ord-price"
                name="total_price"
                value={formData.total_price}
                onChange={handleChange}
                placeholder="Total Amount"
                className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/35 text-brown-deep focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="ord-advance" className="font-semibold text-brown-deep">
                Advance Paid (₹)
              </label>
              <input
                type="number"
                id="ord-advance"
                name="advance_paid"
                value={formData.advance_paid}
                onChange={handleChange}
                placeholder="Advance Paid"
                className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/35 text-brown-deep focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
          </div>

          {/* Order Status */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="ord-status" className="font-semibold text-brown-deep">
              Order Status <span className="text-saffron">*</span>
            </label>
            <select
              id="ord-status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/35 text-brown-deep focus:outline-none focus:ring-1 focus:ring-gold"
            >
              {STATUSES.map(stat => (
                <option key={stat} value={stat}>{stat}</option>
              ))}
            </select>
          </div>

          {/* Special Notes */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="ord-notes" className="font-semibold text-brown-deep">
              Special Venue / Setup Notes
            </label>
            <textarea
              id="ord-notes"
              name="notes"
              rows="2"
              value={formData.notes}
              onChange={handleChange}
              placeholder="e.g. Special silver platter setups. Delivery directly to venue halls."
              className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/35 text-brown-deep focus:outline-none focus:ring-1 focus:ring-gold resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-4 border-t border-gold-pale/30 pt-4">
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
              className="px-6 py-2.5 rounded-md bg-gold hover:bg-gold-light text-brown-deep disabled:bg-brown-light/40 disabled:cursor-not-allowed uppercase font-bold text-xs tracking-wider shadow-sm"
            >
              {submitting ? 'Saving...' : (order ? 'Update Order' : 'Book Order')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CateringBulkForm;
