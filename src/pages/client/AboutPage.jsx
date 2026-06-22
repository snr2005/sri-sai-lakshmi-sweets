import React from 'react';
import { Award, Zap, Smile } from 'lucide-react';
import SectionTitle from '../../components/ui/SectionTitle';

export const AboutPage = () => {
  return (
    <div className="font-body select-none">
      
      {/* 1. ABOUT HERO / STORY SECTION */}
      <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Left */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-gold-pale shadow-hover h-[340px] md:h-[480px] group">
            <img
              src="https://res.cloudinary.com/dhmcg6b6v/image/upload/v1781808740/pr1_maucjw.jpg"
              alt="Sri Sai Lakshmi Ghee Sweets Legacy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brown-deep/50 via-transparent to-transparent"></div>
            {/* Gold corner accent */}
            <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-gold rounded-tl-sm"></div>
            <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-gold rounded-br-sm"></div>
            {/* Label badge */}
            <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-pale shadow-sm">
              <p className="text-[11px] font-bold text-brown-deep uppercase tracking-widest">Our Kitchen Since Generations</p>
            </div>
          </div>

          {/* Text Right */}
          <div className="flex flex-col">
            <span className="text-gold font-accent italic text-base md:text-lg mb-2 block">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brown-deep tracking-wide leading-tight mb-4">
              A Legacy of Ghee Sweets Since Generations
            </h2>
            <div className="w-24 h-[1.5px] bg-gold mb-6"></div>
            
            <p className="text-brown-mid text-sm md:text-base leading-relaxed mb-4">
              Sri Sai Lakshmi Ghee Sweets was founded in Gannavaram with a simple mission: to preserve and celebrate the rich heritage of traditional Indian sweet-making. For generations, our family has crafted sweets that bring families together during festivals, weddings, and everyday moments of joy.
            </p>
            <p className="text-brown-mid text-sm md:text-base leading-relaxed mb-4">
              Every item in our menu is prepared with the utmost respect for tradition. We source pure, unadulterated cow ghee, premium cashews from local farms, and hand-selected spices to ensure that every bite carries the authentic aroma and taste that Gannavaram loves.
            </p>
            <p className="text-brown-mid text-sm md:text-base leading-relaxed">
              Today, while we incorporate hygienic modern kitchens, our core recipes remain unchanged. We invite you to experience the rich, melt-in-the-mouth texture of our signature Mysorepak, Kaju Katli, and fresh hot savories.
            </p>
          </div>

        </div>
      </section>

      {/* 2. VALUES / TRUST SECTION */}
      <section className="bg-cream-dark py-16 md:py-20 px-4 border-y border-gold-pale">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            label="Our Commitments"
            title="Sweets You Can Trust"
            subtitle="We maintain strict quality control standards so that you can enjoy our traditional recipes with peace of mind."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            
            {/* Value 1 */}
            <div className="bg-cream p-8 rounded-lg shadow-card hover:shadow-hover border-t-4 border-gold transition-all duration-300 flex flex-col items-center text-center">
              <div className="text-gold mb-4 p-3 bg-gold-pale rounded-full">
                <Award size={28} />
              </div>
              <h3 className="font-display font-bold text-xl text-brown-deep mb-2">
                Pure Ghee Selection
              </h3>
              <p className="text-brown-mid text-sm leading-relaxed">
                We use only 100% pure cow ghee in all our ghee sweet preparations, creating a traditional golden flavor that melts instantly.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-cream p-8 rounded-lg shadow-card hover:shadow-hover border-t-4 border-gold transition-all duration-300 flex flex-col items-center text-center">
              <div className="text-gold mb-4 p-3 bg-gold-pale rounded-full">
                <Zap size={28} />
              </div>
              <h3 className="font-display font-bold text-xl text-brown-deep mb-2">
                Traditional Recipes
              </h3>
              <p className="text-brown-mid text-sm leading-relaxed">
                Our sweets are prepared using time-tested formulas and handcrafting techniques that have been passed down through generations.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-cream p-8 rounded-lg shadow-card hover:shadow-hover border-t-4 border-gold transition-all duration-300 flex flex-col items-center text-center">
              <div className="text-gold mb-4 p-3 bg-gold-pale rounded-full">
                <Smile size={28} />
              </div>
              <h3 className="font-display font-bold text-xl text-brown-deep mb-2">
                Premium Quality
              </h3>
              <p className="text-brown-mid text-sm leading-relaxed">
                From fresh dairy milk to high-grade cashews and almonds, we make no compromises when it comes to selecting fresh ingredients.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SHOP LOCATION HIGHLIGHT */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text */}
          <div>
            <span className="text-gold font-accent italic text-base md:text-lg mb-2 block">
              Gannavaram Landmark
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brown-deep mb-6">
              Come Visit Us & Taste the Freshness
            </h2>
            <p className="text-brown-mid text-sm md:text-base leading-relaxed mb-4">
              Our sweet shop is located in the heart of Gannavaram, Andhra Pradesh. We are easily accessible from the main highway and offer parking space for visitors.
            </p>
            <p className="text-brown-mid text-sm md:text-base leading-relaxed mb-6">
              Whether you are picking up sweet boxes for a local festival, planning menu items for a function, or just looking to enjoy hot samosas and bajji, our doors are open for you.
            </p>
            <div className="bg-beige-card p-5 rounded-md border-l-4 border-gold mb-2 text-sm text-brown-mid font-body">
              <p className="font-bold text-brown-deep mb-1">📍 Address:</p>
              <p>Sri Sai Lakshmi Ghee Sweets, Main Road, Gannavaram, Andhra Pradesh - 521101</p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-gold-pale shadow-hover h-[380px] group">
            <img
              src="https://res.cloudinary.com/dhmcg6b6v/image/upload/v1781808745/pr2_teqxfz.jpg"
              alt="Sri Sai Lakshmi Ghee Sweets Storefront"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brown-deep/50 via-transparent to-transparent"></div>
            {/* Gold corner accent */}
            <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-gold rounded-tr-sm"></div>
            <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-gold rounded-bl-sm"></div>
            {/* Label badge */}
            <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-pale shadow-sm">
              <p className="text-[11px] font-bold text-brown-deep uppercase tracking-widest">Visit Our Sweet Shop</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
export default AboutPage;
