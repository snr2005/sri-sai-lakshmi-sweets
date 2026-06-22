import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Search, Trash2, MailOpen, Filter, MessageSquareCode, MessageSquare, Phone, Mail } from 'lucide-react';
import { useInquiries } from '../../hooks/useInquiries';
import { updateInquiryStatus, deleteInquiry } from '../../services/inquiryService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils/formatters';
import { INQUIRY_TYPES, INQUIRY_STATUSES } from '../../utils/constants';

export const InquiriesPage = () => {
  const { inquiries, loading } = useInquiries();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // Filter inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone.includes(searchTerm) ||
      (inq.email && inq.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus =
      statusFilter === 'All' || inq.status === statusFilter;
      
    const matchesType =
      typeFilter === 'All' || inq.inquiry_type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleUpdateStatus = async (inquiryId, newStatus) => {
    try {
      await updateInquiryStatus(inquiryId, newStatus);
      toast.success(`Inquiry status updated to ${newStatus}`);
    } catch (e) {
      toast.error("Failed to update status.");
    }
  };

  const handleDeleteInquiry = async (inq) => {
    if (window.confirm(`Are you sure you want to delete inquiry from "${inq.name}"?`)) {
      try {
        await deleteInquiry(inq.id);
        toast.success("Inquiry deleted successfully.");
      } catch (e) {
        toast.error("Failed to delete inquiry.");
      }
    }
  };

  const handleContactWhatsApp = async (inq) => {
    const cleanedPhone = inq.phone.replace(/\D/g, '');
    const formattedPhone = cleanedPhone.length === 10 ? `91${cleanedPhone}` : cleanedPhone;
    const msg = `Hello ${inq.name}, this is Sri Sai Lakshmi Ghee Sweets. We received your inquiry regarding "${inq.inquiry_type}":\n"${inq.message}"`;
    const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(msg)}`;
    
    window.open(url, '_blank');

    if (inq.status === 'new') {
      try {
        await updateInquiryStatus(inq.id, 'contacted');
        toast.success("Opening WhatsApp. Inquiry status updated to Contacted.");
      } catch (e) {
        console.error("Failed to update status:", e);
      }
    } else {
      toast.success("Opening WhatsApp...");
    }
  };

  const handleContactCall = async (inq) => {
    window.open(`tel:${inq.phone}`, '_self');

    if (inq.status === 'new') {
      try {
        await updateInquiryStatus(inq.id, 'contacted');
        toast.success("Calling customer. Inquiry status updated to Contacted.");
      } catch (e) {
        console.error("Failed to update status:", e);
      }
    }
  };

  const handleContactEmail = async (inq) => {
    if (!inq.email) return;
    const subject = encodeURIComponent("Inquiry - Sri Sai Lakshmi Ghee Sweets");
    const body = encodeURIComponent(`Hello ${inq.name},\n\nThank you for reaching out to Sri Sai Lakshmi Ghee Sweets. We received your inquiry regarding "${inq.inquiry_type}":\n\n"${inq.message}"\n\n`);
    window.open(`mailto:${inq.email}?subject=${subject}&body=${body}`, '_self');

    if (inq.status === 'new') {
      try {
        await updateInquiryStatus(inq.id, 'contacted');
        toast.success("Opening Email client. Inquiry status updated to Contacted.");
      } catch (e) {
        console.error("Failed to update status:", e);
      }
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      new: 'bg-gold-pale text-gold border border-gold/30',
      contacted: 'bg-blue-50 text-blue-600 border border-blue-200',
      completed: 'bg-green-50 text-green-600 border border-green-200'
    }[status] || 'bg-gray-50 text-gray-600';

    return (
      <span className={`px-2.5 py-1 text-2xs uppercase tracking-wider font-bold rounded-full ${styles}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 font-body text-sm select-none">
      
      {/* 1. FILTER & SEARCH BAR */}
      <div className="bg-white rounded-xl border border-gold-pale p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 mb-6">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-brown-light pointer-events-none">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search by name, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-md border border-brown-light/20 bg-cream/10 text-brown-deep placeholder-brown-light/40 focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-brown-light" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-md border border-brown-light/20 bg-white text-brown-deep text-xs font-semibold focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value={INQUIRY_STATUSES.NEW}>New</option>
              <option value={INQUIRY_STATUSES.CONTACTED}>Contacted</option>
              <option value={INQUIRY_STATUSES.COMPLETED}>Completed</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <MessageSquareCode size={14} className="text-brown-light" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-1.5 rounded-md border border-brown-light/20 bg-white text-brown-deep text-xs font-semibold focus:outline-none"
            >
              <option value="All">All Types</option>
              {INQUIRY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* 2. INQUIRIES DATA TABLE */}
      <div className="bg-white rounded-xl border border-gold-pale shadow-sm overflow-hidden">
        {loading ? (
          <LoadingSpinner />
        ) : filteredInquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gold-pale bg-cream-dark/20 text-brown-light font-semibold uppercase text-xs tracking-wider">
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Submitted</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Update Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-pale/20 text-brown-deep">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-cream/10">
                    
                    {/* Contact details */}
                    <td className="p-4">
                      <p className="font-bold text-brown-deep">{inq.name}</p>
                      <p className="text-xs text-brown-light mt-0.5">{inq.phone}</p>
                      {inq.email && <p className="text-[11px] text-brown-light font-mono">{inq.email}</p>}
                    </td>

                    {/* Inquiry Type */}
                    <td className="p-4 whitespace-nowrap">
                      <span className="text-[10px] font-bold text-gold uppercase tracking-widest bg-gold-pale px-2.5 py-0.5 rounded-full">
                        {inq.inquiry_type}
                      </span>
                    </td>

                    {/* Message Details */}
                    <td className="p-4 max-w-[300px]">
                      <p className="text-xs text-brown-deep break-words">{inq.message}</p>
                    </td>

                    {/* Date */}
                    <td className="p-4 text-xs text-brown-light whitespace-nowrap">
                      {formatDate(inq.created_at)}
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      {getStatusBadge(inq.status)}
                    </td>

                    {/* Quick update dropdown */}
                    <td className="p-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleUpdateStatus(inq.id, e.target.value)}
                        className="px-2 py-1 border border-brown-light/20 bg-cream/20 text-brown-deep text-xs font-semibold rounded focus:outline-none focus:ring-1 focus:ring-gold"
                      >
                        <option value={INQUIRY_STATUSES.NEW}>New</option>
                        <option value={INQUIRY_STATUSES.CONTACTED}>Contacted</option>
                        <option value={INQUIRY_STATUSES.COMPLETED}>Completed</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* WhatsApp Contact */}
                        <button
                          onClick={() => handleContactWhatsApp(inq)}
                          className="p-1.5 text-green-600 hover:text-green-700 rounded hover:bg-green-50 transition-colors"
                          title="Contact via WhatsApp"
                        >
                          <MessageSquare size={16} />
                        </button>

                        {/* Call Contact */}
                        <button
                          onClick={() => handleContactCall(inq)}
                          className="p-1.5 text-blue-600 hover:text-blue-700 rounded hover:bg-blue-50 transition-colors"
                          title="Call customer"
                        >
                          <Phone size={16} />
                        </button>

                        {/* Email Contact (Only if email is available) */}
                        {inq.email ? (
                          <button
                            onClick={() => handleContactEmail(inq)}
                            className="p-1.5 text-amber-600 hover:text-amber-700 rounded hover:bg-amber-50 transition-colors"
                            title="Email customer"
                          >
                            <Mail size={16} />
                          </button>
                        ) : (
                          <div className="w-8"></div>
                        )}

                        {/* Delete action */}
                        <button
                          onClick={() => handleDeleteInquiry(inq)}
                          className="p-1.5 text-brown-light hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                          title="Delete inquiry"
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
            <MailOpen size={36} className="text-gold mb-3" />
            <p className="font-semibold text-brown-deep">No Inquiries Found</p>
            <p className="text-xs text-brown-light mt-1">There are no inquiries matching your active filters.</p>
          </div>
        )}
      </div>

    </div>
  );
};
export default InquiriesPage;
