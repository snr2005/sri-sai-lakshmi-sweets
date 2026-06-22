import React from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const AdminHeader = ({ toggleSidebar, pageTitle }) => {
  const { currentUser } = useAuth();

  return (
    <header className="h-20 bg-white border-b border-gold-pale px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm font-body">
      
      {/* Left side: Hamburger (mobile) + Page Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-1.5 text-brown-deep hover:text-gold focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <Menu size={24} />
        </button>
        
        <h2 className="text-xl md:text-2xl font-display font-bold text-brown-deep capitalize">
          {pageTitle}
        </h2>
      </div>

      {/* Right side: Admin user info */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex flex-col text-right">
          <span className="text-sm font-semibold text-brown-deep">Store Administrator</span>
          <span className="text-[10px] text-brown-light">{currentUser?.email || 'admin@srisailakshmi.com'}</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-gold text-white font-bold flex items-center justify-center border border-gold-pale">
          A
        </div>
      </div>

    </header>
  );
};
export default AdminHeader;
