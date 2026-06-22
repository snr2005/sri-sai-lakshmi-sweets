import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Star, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { useGallery } from '../../hooks/useGallery';
import ProductCard from '../../components/ui/ProductCard';
import SectionTitle from '../../components/ui/SectionTitle';
import TrustBadge from '../../components/ui/TrustBadge';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { PaisleyPattern, MandalaPattern } from '../../assets/patterns';
import { getGeneralInquiryLink } from '../../utils/whatsapp';

export const HomePage = () => {
  const { products, loading: productsLoading } = useProducts();
  const { gallery, loading: galleryLoading } = useGallery();

  // Filter featured products
  const featuredProducts = products.filter(p => p.is_featured).slice(0, 6);

  // Filter featured gallery previews
  const galleryPreviews = gallery.filter(g => g.is_featured).slice(0, 6);

  // Framer Motion Variants
  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };

  return (
    <div className="overflow-x-hidden font-body select-none">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-brown-deep py-20 px-4 overflow-hidden">
        {/* Background Image + Premium Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 pointer-events-none select-none blur-[6px] scale-105"
          style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/031/579/578/large_2x/plate-filled-with-assorted-indian-desserts-on-top-of-a-table-generative-ai-photo.jpeg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brown-deep/90 via-choco-footer/45 to-brown-deep pointer-events-none"></div>

        {/* Traditional Vector Patterns */}
        <PaisleyPattern />
        <MandalaPattern />

        {/* Floating Gold Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-gold animate-float-gold"></div>
          <div className="absolute top-[60%] left-[80%] w-3.5 h-3.5 rounded-full bg-gold-light animate-float-gold" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-[80%] left-[30%] w-2.5 h-2.5 rounded-full bg-gold animate-float-gold" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-[30%] right-[20%] w-3 h-3 rounded-full bg-gold-pale animate-float-gold" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 flex flex-col items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            {/* Tagline */}
            <motion.span 
              variants={fadeInUp}
              className="font-body text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-6 relative z-10"
              style={{ color: '#F0C040', filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.8))' }}
            >
              Traditional Sweets | Hot Items | Catering
            </motion.span>

            {/* Shop Name */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-pale via-gold-light to-gold tracking-wider leading-none mb-6 relative z-10"
              style={{ filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.85))' }}
            >
              SRI SAI LAKSHMI
              <span className="block text-2xl sm:text-3xl md:text-4xl font-body font-bold uppercase tracking-[0.25em] mt-4" style={{ color: '#F5EAD5', filter: 'drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.8))' }}>
                Ghee Sweets
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              variants={fadeInUp}
              className="text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed mb-12 font-medium relative z-10"
              style={{ color: '#FDF6EC', textShadow: '0px 2px 10px rgba(0, 0, 0, 0.95)' }}
            >
              Indulge in the regal warmth of Gannavaram's finest traditional sweets, prepared fresh daily with pure ghee, premium ingredients, and decades of recipe heritage.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md sm:max-w-none relative z-10"
            >
              <Link
                to="/products"
                className="w-full sm:w-auto bg-gold hover:bg-gold-light text-brown-deep font-body font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-md shadow-lg transition-all duration-300 hover:scale-105"
              >
                Explore Sweets
              </Link>
              <a
                href={getGeneralInquiryLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto border-2 border-gold hover:border-gold-light text-gold hover:text-gold-light font-body font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-md flex items-center justify-center gap-2 transition-all duration-300 bg-brown-deep/40 hover:bg-brown-deep/65 backdrop-blur-sm shadow-md"
              >
                <MessageCircle size={16} />
                Contact on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST BADGES STRIP */}
      <section className="bg-cream-dark py-12 px-4 border-y border-gold-pale">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TrustBadge 
              icon={Sparkles} 
              title="Fresh Preparation" 
              description="Made fresh every single morning using generations-old traditional preparation methods."
            />
            <TrustBadge 
              icon={Star} 
              title="Traditional Taste" 
              description="Uncompromised flavors utilizing pure cow ghee, premium nuts, and hand-selected spices."
            />
            <TrustBadge 
              icon={ShieldCheck} 
              title="Catering Available" 
              description="Customized sweets and snack platters structured specifically for wedding and event catering."
            />
            <TrustBadge 
              icon={Truck} 
              title="Bulk Orders Accepted" 
              description="Hassle-free sweet boxes packaging for corporate gifting, festivals, and large celebrations."
            />
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS STRIP */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <SectionTitle 
          label="Our Specialties" 
          title="Our Beloved Sweets" 
          subtitle="Explore our highly recommended items. Prepared fresh with pure ghee and loved by our community."
        />

        {productsLoading ? (
          <LoadingSpinner />
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-brown-mid font-accent italic">No specialties selected today. Check back soon!</p>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-body font-bold uppercase tracking-wider text-xs group"
          >
            View Full Sweet Menu
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* 4. CATERING HIGHLIGHT SECTION */}
      <section className="bg-beige-card py-20 px-4 border-y border-gold-pale relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Left */}
          <div>
            <span className="text-gold font-accent italic text-base md:text-lg mb-2 block">
              Gannavaram Catering Services
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brown-deep tracking-wide leading-tight mb-6">
              Making Every Occasion Unforgettable
            </h2>
            <p className="text-brown-mid text-sm md:text-base leading-relaxed mb-6 font-body">
              At Sri Sai Lakshmi Ghee Sweets, we understand that sweets are the soul of Indian celebrations. Whether you are hosting a grand wedding, a traditional housewarming, a corporate celebration, or a family gathering, our custom sweet platters and hot snack catering packages will leave your guests delighted.
            </p>
            <p className="text-brown-mid text-sm md:text-base leading-relaxed mb-8 font-body">
              Our experts prepare customized catering boxes containing traditional ghee sweets, dry fruit bites, and savory snacks styled to align perfectly with your theme.
            </p>
            <Link
              to="/catering"
              className="inline-flex items-center gap-2 bg-saffron hover:bg-saffron/90 text-white font-body font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded-md shadow-md transition-all duration-300 hover:scale-105"
            >
              Inquire About Catering
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Decorative Image Right */}
          <div className="relative rounded-lg overflow-hidden shadow-hover border border-gold-pale h-[350px] md:h-[450px]">
            <img 
              src="https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=800&auto=format&fit=crop" 
              alt="Traditional Sweet Platters Catering" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-gold-light text-xs font-bold uppercase tracking-widest block mb-1">Elite Setup</span>
              <h3 className="text-xl font-display font-bold text-white">Traditional Wedding Sweet Counters</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GALLERY PREVIEW STRIP */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <SectionTitle 
          label="Sneak Peak" 
          title="From Our Kitchen" 
          subtitle="Explore glimpses of our freshly prepared sweets, catering arrangements, and storefront operations."
        />

        {galleryLoading ? (
          <LoadingSpinner />
        ) : galleryPreviews.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryPreviews.map((item) => (
              <Link 
                to="/gallery" 
                key={item.id} 
                className="group relative h-[180px] rounded-lg overflow-hidden border border-gold-pale/30 shadow-sm"
              >
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brown-deep/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 text-center">
                  <span className="text-xs text-white font-semibold font-display">{item.title}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-brown-mid font-accent italic">Gallery updates coming soon!</p>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-body font-bold uppercase tracking-wider text-xs"
          >
            View Full Gallery
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* 6. FINAL CTA BAND */}
      <section className="bg-choco-footer py-16 px-4 text-center border-t border-gold relative select-none">
        <MandalaPattern />
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            Ready to order? Let's talk.
          </h2>
          <p className="text-brown-light text-sm md:text-base max-w-lg mb-8 leading-relaxed">
            Need home sweets delivery or catering setups for an upcoming function? Get in touch with our team for immediate pricing and custom platter curation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md">
            <a
              href={getGeneralInquiryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-gold hover:bg-gold-light text-brown-deep font-body font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-md shadow-md flex items-center justify-center gap-2 transition-transform duration-300 hover:scale-105"
            >
              <MessageCircle size={16} />
              Order on WhatsApp
            </a>
            <Link
              to="/contact"
              className="w-full sm:w-auto border border-gold-pale hover:border-gold text-cream-dark hover:text-gold font-body font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-md transition-all duration-300 hover:bg-white/5"
            >
              Fill Contact Form
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
};
export default HomePage;
