import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Cake, Heart, Flame, ShoppingBag, Award, Users, Star, ClipboardCheck, Compass, CheckCircle2, Clock } from 'lucide-react';
import SectionTitle from '../../components/ui/SectionTitle';
import { PaisleyPattern, MandalaPattern } from '../../assets/patterns';
import { getCateringInquiryLink } from '../../utils/whatsapp';

export const CateringPage = () => {
  const services = [
    { name: 'Weddings', icon: Heart, desc: 'Make your special day sweeter with custom-designed premium sweet tables and luxury gifting boxes.' },
    { name: 'Birthdays', icon: Cake, desc: 'Delight guests of all ages with mini sweet assortments and freshly prepared warm savories.' },
    { name: 'Festivals', icon: Flame, desc: 'Special bulk preparations of traditional modaks, ladoos, and festival-specific specials.' },
    { name: 'Functions & Pujas', icon: Sparkles, desc: 'Auspicious sweet platters prepared with extra purity standards for religious ceremonies.' },
    { name: 'Bulk Sweet Orders', icon: ShoppingBag, desc: 'Corporate gifting boxes, seasonal sweets packages, and customized sweet boxes for guests.' },
    { name: 'Special Events', icon: Award, desc: 'Tailored snack counters and live sweet-making stations for corporate or public gatherings.' },
    { name: 'Family Gatherings', icon: Users, desc: 'Delicious family-size portions of halwas, kaju sweets, and hot items delivered straight to your home.' },
    { name: 'Traditional Occasions', icon: Star, desc: 'Authentic preparations reflecting Telugu culture, perfect for housewarmings and naming ceremonies.' },
  ];

  const benefits = [
    { name: 'Hygienic Preparation', icon: CheckCircle2, desc: 'Strict hygiene protocols in our kitchen, ensuring safe and uncompromised food preparation.' },
    { name: 'Traditional Flavors', icon: Compass, desc: 'We stick strictly to authentic recipes, preserving the rich ghee-rich taste of Andhra.' },
    { name: 'Timely Delivery', icon: Clock, desc: 'Reliable, prompt delivery to your event venue in Gannavaram and surrounding rural areas.' },
    { name: 'Customizable Menus', icon: ClipboardCheck, desc: 'Flexible sweet selections, packaging box styles, and hot snack combinations tailored to your budget.' },
  ];

  return (
    <div className="font-body select-none">
      
      {/* 1. CATERING HERO */}
      <section className="bg-choco-footer text-white py-20 px-4 relative overflow-hidden border-b-2 border-gold text-center">
        <PaisleyPattern />
        <MandalaPattern />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-gold font-accent italic text-base md:text-lg mb-3">
            Sri Sai Lakshmi Kitchens
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-wide mb-6 leading-tight">
            Catering for Every Occasion
          </h1>
          <p className="text-cream/80 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
            We bring the rich taste of tradition and pure ghee excellence directly to your celebrations. Custom sweet selections, snack platters, and professional boxes.
          </p>
          <a
            href={getCateringInquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold hover:bg-gold-light text-brown-deep font-body font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-md shadow-lg transition-transform duration-300 hover:scale-105"
          >
            Send Catering Inquiry
          </a>
        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <SectionTitle
          label="Celebrate with Sweets"
          title="We Cater for All Occasions"
          subtitle="Explore the wide range of events we serve in Gannavaram. Every counter is styled and prepared to perfection."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={idx} 
                className="bg-beige-card p-6 rounded-lg border border-gold-pale hover:border-gold shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4"
              >
                <div className="text-gold w-12 h-12 bg-cream rounded-full border border-gold-pale flex items-center justify-center">
                  <Icon size={22} className="stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-brown-deep mb-2">
                    {service.name}
                  </h3>
                  <p className="text-brown-mid text-xs md:text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. WHY CHOOSE US (Dark banner) */}
      <section className="bg-brown-deep text-cream py-20 px-4 border-y border-gold relative">
        <MandalaPattern />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold font-accent italic text-base md:text-lg mb-2 block">
              The Sai Lakshmi Standard
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
              Why Gannavaram Prefers Our Catering
            </h2>
            <div className="w-24 h-[1px] bg-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center gap-4">
                  <div className="text-gold-light p-3.5 bg-cream/5 rounded-full border border-gold/30">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">
                    {benefit.name}
                  </h3>
                  <p className="text-brown-light text-xs md:text-sm leading-relaxed max-w-xs">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* 4. BULK ORDER CTA */}
      <section className="py-20 px-4 text-center max-w-4xl mx-auto">
        <div className="bg-beige-card p-10 md:p-14 rounded-2xl border-2 border-gold-pale shadow-card flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-gold-pale text-gold flex items-center justify-center text-2xl mb-4 select-none">
            🫙
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-brown-deep mb-3">
            Need sweets in bulk? We've got you covered.
          </h2>
          <p className="text-brown-mid text-sm md:text-base max-w-xl mb-8 leading-relaxed">
            Planning corporate sweet distributions, festival gifts, or simple home return gifts? Contact us for special volume discounts and customized box print options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-sm">
            <a
              href={getCateringInquiryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-saffron hover:bg-saffron/90 text-white font-body font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded-md shadow-md flex items-center justify-center gap-2 transition-transform duration-300 hover:scale-105"
            >
              Contact via WhatsApp
            </a>
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-gold hover:bg-gold-light text-brown-deep font-body font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded-md transition-all duration-300 hover:scale-105"
            >
              Fill Inquiry Form
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
export default CateringPage;
