import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MapPin, Clock, Heart } from 'lucide-react';

export const Footer = () => {
  const location = useLocation();

  // Hide Footer on all admin dashboard routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-choco-footer text-cream-dark border-t-2 border-gold select-none font-body">
      {/* Top Footer Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center bg-gold-pale text-gold font-bold">
                SL
              </div>
              <div>
                <h3 className="text-xl font-display font-bold leading-none text-white tracking-wider">
                  Sri Sai Lakshmi
                </h3>
                <span className="text-[9px] font-bold text-gold uppercase tracking-[0.25em] block">
                  Ghee Sweets
                </span>
              </div>
            </Link>
            <p className="text-sm text-brown-light leading-relaxed mt-2">
              Bringing you the premium taste of tradition. Handcrafted sweets and savory snacks made with pure ghee and multi-generational recipes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg text-white mb-4 border-b border-gold/20 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-brown-light hover:text-gold transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-brown-light hover:text-gold transition-colors duration-200">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-brown-light hover:text-gold transition-colors duration-200">
                  Sweets Menu
                </Link>
              </li>
              <li>
                <Link to="/catering" className="text-brown-light hover:text-gold transition-colors duration-200">
                  Catering Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-brown-light hover:text-gold transition-colors duration-200">
                  Photo Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-display font-bold text-lg text-white mb-4 border-b border-gold/20 pb-2">
              Visit Our Shop
            </h4>
            <ul className="space-y-3.5 text-sm text-brown-light">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" />
                <span>
                  Gannavaram, Vijayawada Rural,<br />
                  Andhra Pradesh - 521101
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold flex-shrink-0" />
                <a href="tel:+919989599243" className="hover:text-gold transition-colors duration-200">
                  +91 99895 99243
                </a>
              </li>
            </ul>
          </div>

          {/* Timings */}
          <div>
            <h4 className="font-display font-bold text-lg text-white mb-4 border-b border-gold/20 pb-2">
              Business Hours
            </h4>
            <div className="flex items-start gap-3 text-sm text-brown-light">
              <Clock size={18} className="text-gold flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-cream-dark">Open Daily</p>
                <p className="text-xs">7:00 AM - 9:30 PM</p>
                <p className="text-[11px] mt-2 italic text-gold">Fresh stock is ready by 9 AM every morning!</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer Credits */}
      <div className="border-t border-gold/10 bg-choco-footer/90 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brown-light">
          <p>
            &copy; {currentYear} Sri Sai Lakshmi Ghee Sweets. All Rights Reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Handcrafted with <Heart size={12} className="text-saffron fill-saffron" /> in Gannavaram
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
