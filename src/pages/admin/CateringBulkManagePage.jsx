import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Plus, Edit2, Trash2, Search, UtensilsCrossed, ShoppingBag, Filter, IndianRupee, Calendar, Phone } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders';
import { addOrder, updateOrder, deleteOrder } from '../../services/orderService';
import CateringBulkForm from '../../components/admin/CateringBulkForm';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils/formatters';

export const CateringBulkManagePage = () => {
  const { orders, loading } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTypeTab, setActiveTypeTab] = useState('All');
  const [activeStatusTab, setActiveStatusTab] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Apply filters
  const filteredOrders = orders.filter(o => {
    const matchesType = activeTypeTab === 'All' || o.order_type === activeTypeTab;
    const matchesStatus = activeStatusTab === 'All' || o.status === activeStatusTab;
    const matchesSearch =
      o.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer_phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.occasion || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.items || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  // Calculate financial summaries
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total_price || 0), 0);
  const totalAdvances = orders.reduce((sum, o) => sum + (o.advance_paid || 0), 0);
  const pendingReceivables = totalRevenue - totalAdvances;
  const activeBookingsCount = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;

  const handleSave = async (formData) => {
    try {
      if (selectedOrder) {
        await updateOrder(selectedOrder.id, formData);
      } else {
        await addOrder(formData);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const handleDelete = async (order) => {
    if (window.confirm(`Delete order booked for "${order.customer_name}"? This cannot be undone.`)) {
      try {
        await deleteOrder(order.id);
        toast.success(`Order record deleted.`);
      } catch (e) {
        toast.error('Failed to delete order.');
      }
    }
  };

  const getStatusBadgeClass = (status) => {
    return {
      'Pending': 'bg-yellow-50 text-yellow-600 border border-yellow-200',
      'Confirmed': 'bg-blue-50 text-blue-600 border border-blue-200',
      'Prepared': 'bg-purple-50 text-purple-600 border border-purple-200',
      'Delivered': 'bg-green-50 text-green-600 border border-green-200',
      'Cancelled': 'bg-red-50 text-red-600 border border-red-200'
    }[status] || 'bg-gray-50 text-gray-600';
  };

  const getOrderTypeBadge = (type) => {
    return type === 'Catering'
      ? 'bg-saffron/15 text-saffron border border-saffron/30'
      : 'bg-gold-pale text-brown-deep border border-gold/30';
  };

  return (
    <div className="p-6 font-body text-sm select-none">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-saffron/5 border border-saffron/20 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-2xl font-extrabold text-saffron">{activeBookingsCount}</p>
            <p className="text-brown-deep font-semibold text-xs mt-1">Active Bookings</p>
            <p className="text-[10px] text-brown-light mt-0.5">Pending, Confirmed, Prepared</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-saffron/15 text-saffron flex items-center justify-center">
            <UtensilsCrossed size={18} />
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-2xl font-extrabold text-green-600 flex items-center">
              <IndianRupee size={20} />
              {totalRevenue.toLocaleString('en-IN')}
            </p>
            <p className="text-brown-deep font-semibold text-xs mt-1">Total Budget Value</p>
            <p className="text-[10px] text-brown-light mt-0.5">All recorded order values</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            <IndianRupee size={18} />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-2xl font-extrabold text-blue-600 flex items-center">
              <IndianRupee size={20} />
              {totalAdvances.toLocaleString('en-IN')}
            </p>
            <p className="text-brown-deep font-semibold text-xs mt-1">Advances Collected</p>
            <p className="text-[10px] text-brown-light mt-0.5">Deposits collected by shop</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <IndianRupee size={18} />
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-2xl font-extrabold text-yellow-600 flex items-center">
              <IndianRupee size={20} />
              {pendingReceivables.toLocaleString('en-IN')}
            </p>
            <p className="text-brown-deep font-semibold text-xs mt-1">Pending Receivables</p>
            <p className="text-[10px] text-brown-light mt-0.5">Balance due on delivery</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
            <IndianRupee size={18} />
          </div>
        </div>
      </div>

      {/* Toolbar / Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Order Type Tabs */}
          <div className="flex items-center gap-1.5 bg-cream-dark/25 p-1 rounded-lg border border-gold-pale/50">
            {['All', 'Catering', 'Bulk Order'].map(type => (
              <button
                key={type}
                onClick={() => setActiveTypeTab(type)}
                className={`px-3 py-1.5 rounded-md text-2xs font-bold uppercase tracking-wider transition-all ${
                  activeTypeTab === type
                    ? 'bg-white text-brown-deep shadow-sm'
                    : 'text-brown-mid hover:text-brown-deep'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Order Status Tabs */}
          <div className="flex items-center gap-1 bg-cream-dark/25 p-1 rounded-lg border border-gold-pale/50">
            {['All', 'Pending', 'Confirmed', 'Prepared', 'Delivered', 'Cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setActiveStatusTab(status)}
                className={`px-3 py-1.5 rounded-md text-2xs font-bold uppercase tracking-wider transition-all ${
                  activeStatusTab === status
                    ? 'bg-white text-brown-deep shadow-sm'
                    : 'text-brown-mid hover:text-brown-deep'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search size={14} className="absolute inset-y-0 my-auto left-3 text-brown-light pointer-events-none" />
            <input
              type="text"
              placeholder="Search customer, items..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-8 pr-4 py-2 rounded-md border border-brown-light/20 bg-white text-brown-deep placeholder-brown-light/40 focus:outline-none focus:ring-1 focus:ring-gold text-xs w-48 shadow-2xs"
            />
          </div>

          {/* Book Order Button */}
          <button
            onClick={() => { setSelectedOrder(null); setIsFormOpen(true); }}
            className="bg-gold hover:bg-gold-light text-brown-deep font-bold uppercase tracking-wider text-xs px-5 py-2.5 rounded-md flex items-center gap-2 shadow-sm whitespace-nowrap"
          >
            <Plus size={15} />
            Book Order
          </button>
        </div>
      </div>

      {/* Orders Table Display */}
      <div className="bg-white rounded-xl border border-gold-pale shadow-sm overflow-hidden">
        {loading ? (
          <LoadingSpinner />
        ) : filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gold-pale bg-cream-dark/20 text-brown-light font-semibold uppercase text-[10px] tracking-wider">
                  <th className="p-4">Customer &amp; Occasion</th>
                  <th className="p-4">Order Type</th>
                  <th className="p-4">Event Date</th>
                  <th className="p-4">Ordered Sweets/Savories</th>
                  <th className="p-4 text-right">Budget / Balance</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-pale/20 text-brown-deep">
                {filteredOrders.map(order => {
                  const balance = (order.total_price || 0) - (order.advance_paid || 0);
                  return (
                    <tr key={order.id} className="hover:bg-cream/10 transition-colors">
                      {/* Customer Name & Occasion */}
                      <td className="p-4">
                        <p className="font-bold text-brown-deep">{order.customer_name}</p>
                        <p className="text-2xs text-brown-mid italic mt-0.5">{order.occasion || 'No Occasion specified'}</p>
                        <div className="flex items-center gap-1.5 text-2xs text-brown-light mt-1 font-semibold">
                          <Phone size={10} className="text-gold" />
                          <span>{order.customer_phone}</span>
                        </div>
                      </td>

                      {/* Order Type Badge */}
                      <td className="p-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${getOrderTypeBadge(order.order_type)}`}>
                          {order.order_type === 'Catering' ? '🍽️' : '📦'} {order.order_type}
                        </span>
                      </td>

                      {/* Delivery Date */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 text-brown-deep">
                          <Calendar size={13} className="text-gold" />
                          <span className="font-semibold text-xs">{formatDate(order.event_date)}</span>
                        </div>
                      </td>

                      {/* Items */}
                      <td className="p-4 w-72">
                        <p className="text-xs text-brown-mid font-medium line-clamp-2 leading-relaxed" title={order.items}>
                          {order.items}
                        </p>
                      </td>

                      {/* Financial Detail */}
                      <td className="p-4 text-right font-medium">
                        <p className="text-brown-deep text-xs font-bold">Total: ₹{order.total_price.toLocaleString('en-IN')}</p>
                        <p className="text-2xs text-green-600 mt-0.5">Paid: ₹{order.advance_paid.toLocaleString('en-IN')}</p>
                        <p className={`text-2xs mt-0.5 font-bold ${balance > 0 ? 'text-saffron' : 'text-green-600'}`}>
                          Due: ₹{balance.toLocaleString('en-IN')}
                        </p>
                      </td>

                      {/* Status select badge */}
                      <td className="p-4 text-center">
                        <span className={`inline-block px-2.5 py-1 text-2xs font-bold uppercase tracking-wider rounded-full ${getStatusBadgeClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>

                      {/* Action buttons */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => { setSelectedOrder(order); setIsFormOpen(true); }}
                            className="p-1.5 text-brown-light hover:text-gold rounded hover:bg-cream-dark/30 transition-colors"
                            title="Edit details"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(order)}
                            className="p-1.5 text-brown-light hover:text-danger rounded hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-14 text-center text-brown-light flex flex-col items-center justify-center">
            <div className="text-4xl mb-3">📅</div>
            <p className="font-semibold text-brown-deep">No Orders Found</p>
            <p className="text-xs text-brown-light mt-1">
              {searchTerm ? 'No booked orders match your criteria.' : 'Book your first Catering or Bulk sweet order using the button above.'}
            </p>
          </div>
        )}
      </div>

      {/* Info card */}
      <div className="mt-4 p-3 bg-gold-pale/30 border border-gold-pale rounded-lg text-2xs text-brown-mid leading-relaxed">
        <span className="font-bold text-brown-deep">ℹ️ Catering &amp; Bulk Orders Tracker: </span>
        All orders entered here are stored privately in your database for order tracking, planning preparations, and balancing payments. None of these records are visible to customers on the frontend website.
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <CateringBulkForm
          order={selectedOrder}
          onSave={handleSave}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};
export default CateringBulkManagePage;
