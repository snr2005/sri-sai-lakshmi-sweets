import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Candy, MessageSquareCode, Star, CheckCircle, ArrowRight, UserCheck, Plus, Image, ShieldQuestion, Database } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useProducts } from '../../hooks/useProducts';
import { useInquiries } from '../../hooks/useInquiries';
import { useFAQs } from '../../hooks/useFAQs';
import { useGallery } from '../../hooks/useGallery';
import { isMockMode } from '../../services/firebase';
import { seedDatabase } from '../../services/seedService';
import DashboardCard from '../../components/admin/DashboardCard';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils/formatters';

export const DashboardPage = () => {
  const { products, loading: productsLoading } = useProducts();
  const { inquiries, loading: inquiriesLoading } = useInquiries();
  const { faqs, loading: faqsLoading } = useFAQs();
  const { gallery, loading: galleryLoading } = useGallery();
  
  const [seeding, setSeeding] = useState(false);
  const navigate = useNavigate();

  const loading = productsLoading || inquiriesLoading || faqsLoading || galleryLoading;

  // Compute Stats
  const totalProducts = products.length;
  const totalInquiries = inquiries.length;
  const featuredProducts = products.filter(p => p.is_featured).length;
  const availableProducts = products.filter(p => p.is_available).length;

  // Check if live database is empty
  const isEmptyDatabase = !isMockMode && products.length === 0 && faqs.length === 0 && gallery.length === 0;

  // Grab recent 5 inquiries
  const recentInquiries = inquiries.slice(0, 5);

  const handleSeedDatabase = async () => {
    setSeeding(true);
    try {
      await seedDatabase();
      toast.success("Database seeded with default sweets, gallery items, and FAQs!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to seed database.");
    } finally {
      setSeeding(false);
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

  if (loading) {
    return <LoadingSpinner size="lg" />;
  }

  return (
    <div className="p-6 space-y-8 select-none font-body">

      {/* Connection & Seeding Status Banner */}
      {isMockMode ? (
        <div className="bg-gold-pale/35 border border-gold/25 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-gold/10 text-gold rounded-lg mt-0.5 sm:mt-0">
              <Database size={20} />
            </div>
            <div>
              <h4 className="font-bold text-brown-deep text-sm">Running in Mock Mode (Local State)</h4>
              <p className="text-xs text-brown-mid mt-1 leading-relaxed">
                The dashboard is displaying temporary mock data. Connect to your live Firebase backend by updating credentials in your <code>.env.local</code> file.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] bg-white border border-gold/20 px-3.5 py-2 rounded-md shadow-sm self-stretch sm:self-auto text-center whitespace-nowrap">
            Demo Console
          </span>
        </div>
      ) : (
        <div className="space-y-4">
          {isEmptyDatabase && (
            <div className="bg-gold-pale/35 border border-gold rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-gold text-brown-deep rounded-lg mt-1">
                  <Database size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-brown-deep text-sm">Live Firebase Database Connected!</h4>
                  <p className="text-xs text-brown-mid mt-1 leading-relaxed">
                    Your database is currently empty. Seed it with default Sweets, FAQs, and Gallery photos to populate the site instantly.
                  </p>
                </div>
              </div>
              <button
                onClick={handleSeedDatabase}
                disabled={seeding}
                className="bg-gold hover:bg-gold-light text-brown-deep font-bold uppercase tracking-wider text-xs px-5 py-3 rounded-md shadow-md flex items-center justify-center gap-2 self-stretch md:self-auto disabled:bg-brown-light/40 disabled:cursor-not-allowed transition-all duration-300"
              >
                <Database size={14} />
                {seeding ? 'Seeding Data...' : 'Seed Live Database'}
              </button>
            </div>
          )}
          
          {!isEmptyDatabase && (
            <div className="flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-50 border border-green-200/50 w-fit px-3.5 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live Firebase Database Synced
            </div>
          )}
        </div>
      )}
      
      {/* 1. STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Total Products" 
          value={totalProducts} 
          icon={Candy}
        />
        <DashboardCard 
          title="Total Inquiries" 
          value={totalInquiries} 
          icon={MessageSquareCode}
        />
        <DashboardCard 
          title="Featured Products" 
          value={featuredProducts} 
          icon={Star}
        />
        <DashboardCard 
          title="Available Products" 
          value={availableProducts} 
          icon={CheckCircle}
        />
      </div>

      {/* 2. BODY CONTENT - RECENT INQUIRIES & QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Inquiries List (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-gold-pale p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-gold-pale/50">
            <h3 className="text-lg font-display font-bold text-brown-deep flex items-center gap-2">
              <MessageSquareCode size={20} className="text-gold" />
              Recent Customer Inquiries
            </h3>
            <Link 
              to="/admin/inquiries"
              className="text-gold hover:text-gold-light text-xs font-bold uppercase tracking-wider flex items-center gap-1 group"
            >
              View All Inquiries
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {recentInquiries.length > 0 ? (
            <div className="overflow-x-auto text-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gold-pale text-brown-light font-semibold">
                    <th className="pb-3 pr-4">Name</th>
                    <th className="pb-3 pr-4">Inquiry Type</th>
                    <th className="pb-3 pr-4">Submitted Date</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold-pale/20 text-brown-deep">
                  {recentInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-cream/20">
                      <td className="py-3.5 pr-4 font-semibold">{inq.name}</td>
                      <td className="py-3.5 pr-4">{inq.inquiry_type}</td>
                      <td className="py-3.5 pr-4 text-xs text-brown-light">{formatDate(inq.created_at)}</td>
                      <td className="py-3.5">{getStatusBadge(inq.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-brown-light italic py-8">No customer inquiries submitted yet.</p>
          )}
        </div>

        {/* Quick Actions (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-gold-pale p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-display font-bold text-brown-deep mb-6 pb-2 border-b border-gold-pale/50 flex items-center gap-2">
              <UserCheck size={20} className="text-gold" />
              Quick Actions
            </h3>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/admin/products')}
                className="w-full p-4 rounded-lg bg-cream/40 hover:bg-gold-pale/30 border border-gold-pale/60 text-left font-semibold text-brown-deep flex items-center justify-between group transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Plus size={16} className="text-gold" />
                  Add/Manage Products
                </span>
                <ArrowRight size={14} className="text-brown-light group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/admin/gallery')}
                className="w-full p-4 rounded-lg bg-cream/40 hover:bg-gold-pale/30 border border-gold-pale/60 text-left font-semibold text-brown-deep flex items-center justify-between group transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Image size={16} className="text-gold" />
                  Upload Gallery Assets
                </span>
                <ArrowRight size={14} className="text-brown-light group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/admin/chatbot')}
                className="w-full p-4 rounded-lg bg-cream/40 hover:bg-gold-pale/30 border border-gold-pale/60 text-left font-semibold text-brown-deep flex items-center justify-between group transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ShieldQuestion size={16} className="text-gold" />
                  Manage Chatbot FAQs
                </span>
                <ArrowRight size={14} className="text-brown-light group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gold-pale/30 text-center text-2xs text-brown-light leading-relaxed">
            All records synchronized in real-time with Firebase services.
          </div>
        </div>

      </div>

    </div>
  );
};
export default DashboardPage;
