import React from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { getGeneralInquiryLink } from '../../utils/whatsapp';

export const FloatingWhatsApp = () => {
  const location = useLocation();

  // Hide WhatsApp button on all admin pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group select-none">
      {/* Tooltip */}
      <span className="mr-3 bg-brown-deep text-white text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat with us!
      </span>

      {/* WhatsApp Button */}
      <a
        href={getGeneralInquiryLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-success text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#256f34] transition-all duration-300 relative group"
        aria-label="Contact on WhatsApp"
      >
        {/* Pulsing ring animation defined in index.css */}
        <span className="absolute inset-0 rounded-full animate-pulse-ring pointer-events-none"></span>
        <MessageCircle size={28} className="relative z-10" />
      </a>
    </div>
  );
};
export default FloatingWhatsApp;
