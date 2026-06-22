import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Candy, MessageSquareCode, Image, MessageSquareHeart, LogOut, ChevronLeft, UtensilsCrossed } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Candy },
    { name: 'Catering & Bulk', path: '/admin/catering-bulk', icon: UtensilsCrossed },
    { name: 'Inquiries', path: '/admin/inquiries', icon: MessageSquareCode },
    { name: 'Gallery', path: '/admin/gallery', icon: Image },
    { name: 'Chatbot FAQs', path: '/admin/chatbot', icon: MessageSquareHeart },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin');
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gold-pale shadow-md transform transition-transform duration-300 flex flex-col justify-between ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Sidebar Top */}
      <div>
        {/* Brand */}
        <div className="h-20 px-6 border-b border-gold-pale flex items-center justify-between bg-cream/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-gold bg-gold-pale text-gold font-bold flex items-center justify-center text-sm">
              SL
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-brown-deep tracking-wider leading-none">
                Sai Lakshmi
              </h2>
              <span className="text-[8px] font-bold text-gold uppercase tracking-[0.2em] block mt-1">
                Admin Panel
              </span>
            </div>
          </div>
          {/* Close button for Mobile */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1 text-brown-light hover:text-gold"
            aria-label="Close Sidebar"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Links Navigation */}
        <nav className="p-4 space-y-2 select-none">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  // Auto close on mobile
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gold-pale text-gold border-l-4 border-gold pl-3'
                      : 'text-brown-mid hover:bg-cream-dark/30 hover:text-brown-deep'
                  }`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Bottom (Logout) */}
      <div className="p-4 border-t border-gold-pale">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm font-bold text-danger hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};
export default AdminSidebar;
