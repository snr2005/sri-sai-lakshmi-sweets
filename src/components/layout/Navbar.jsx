import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PhoneCall } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Hide Navbar on all admin pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Sweets & Hot', path: '/products' },
    { name: 'Catering', path: '/catering' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-cream/95 backdrop-blur-md sticky top-0 z-40 border-b border-gold-pale shadow-sm select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center bg-gold-pale text-gold font-bold">
              SL
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-display font-bold leading-none text-brown-deep tracking-wider">
                Sri Sai Lakshmi
              </h1>
              <span className="text-[9px] font-body font-bold text-gold uppercase tracking-[0.25em] block">
                Ghee Sweets
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-body text-sm font-semibold uppercase tracking-wider transition-colors duration-300 relative py-1 ${
                  isActive(link.path)
                    ? 'text-gold'
                    : 'text-brown-mid hover:text-gold'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Contact Direct Call button */}
          <div className="hidden lg:flex items-center">
            <a
              href="tel:+919989599243"
              className="bg-gold hover:bg-gold-light text-brown-deep hover:text-brown-deep font-body font-bold uppercase tracking-wider text-xs px-5 py-3 rounded-full flex items-center gap-2 shadow-gold transition-all duration-300"
            >
              <PhoneCall size={14} />
              +91 99895 99243
            </a>
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brown-deep hover:text-gold focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sliding Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-cream border-b border-gold-pale shadow-lg animate-fadeIn duration-200">
          <div className="px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-md font-body text-base font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-gold-pale text-gold border-l-4 border-gold pl-4'
                    : 'text-brown-mid hover:bg-cream-dark/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gold-pale">
              <a
                href="tel:+919989599243"
                className="w-full bg-gold text-brown-deep font-body font-bold uppercase tracking-wider text-sm py-3 rounded-md flex items-center justify-center gap-2 shadow-md"
              >
                <PhoneCall size={15} />
                Call +91 99895 99243
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
