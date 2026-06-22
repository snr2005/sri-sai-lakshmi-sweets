import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Client Pages
import HomePage from '../pages/client/HomePage';
import AboutPage from '../pages/client/AboutPage';
import ProductsPage from '../pages/client/ProductsPage';
import CateringPage from '../pages/client/CateringPage';
import GalleryPage from '../pages/client/GalleryPage';
import ContactPage from '../pages/client/ContactPage';

// Admin Pages
import LoginPage from '../pages/admin/LoginPage';
import DashboardPage from '../pages/admin/DashboardPage';
import ProductsManagePage from '../pages/admin/ProductsManagePage';
import CateringBulkManagePage from '../pages/admin/CateringBulkManagePage';
import InquiriesPage from '../pages/admin/InquiriesPage';
import GalleryManagePage from '../pages/admin/GalleryManagePage';
import ChatbotFAQPage from '../pages/admin/ChatbotFAQPage';

// Layouts
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FloatingWhatsApp from '../components/layout/FloatingWhatsApp';
import FloatingChatbot from '../components/layout/FloatingChatbot';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';

// Shared Admin Layout Wrapper
const AdminLayout = ({ children, pageTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-cream flex font-body text-sm select-none">
      {/* Sidebar Navigation */}
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-64">
        <AdminHeader toggleSidebar={toggleSidebar} pageTitle={pageTitle} />
        <main className="flex-1 bg-cream-dark/20 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

// 404 Page Component
const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 font-body select-none">
      <div className="text-gold text-7xl font-display font-bold mb-4">404</div>
      <h2 className="text-3xl font-display font-bold text-brown-deep mb-3">Traditional Recipe Not Found</h2>
      <p className="text-brown-mid text-sm max-w-md mb-8">
        We couldn't find the page you are looking for. Perhaps it melted away in pure ghee!
      </p>
      <Link
        to="/"
        className="bg-gold hover:bg-gold-light text-brown-deep font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded-md shadow-md"
      >
        Return to Home
      </Link>
    </div>
  );
};

export const AppRouter = () => {
  return (
    <>
      {/* Client layout headers */}
      <Navbar />

      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/catering" element={<CateringPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin Login Route */}
        <Route path="/admin" element={<LoginPage />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout pageTitle="Dashboard Summary">
                <DashboardPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminLayout pageTitle="Sweets Inventory Management">
                <ProductsManagePage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/catering-bulk"
          element={
            <ProtectedRoute>
              <AdminLayout pageTitle="Catering & Bulk Orders Management">
                <CateringBulkManagePage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/inquiries"
          element={
            <ProtectedRoute>
              <AdminLayout pageTitle="Customer Inquiries Log">
                <InquiriesPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <ProtectedRoute>
              <AdminLayout pageTitle="Gallery Asset Library">
                <GalleryManagePage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/chatbot"
          element={
            <ProtectedRoute>
              <AdminLayout pageTitle="Chatbot FAQ Responses">
                <ChatbotFAQPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Client Layout Floating Buttons */}
      <FloatingWhatsApp />
      <FloatingChatbot />
      <Footer />
    </>
  );
};
export default AppRouter;
