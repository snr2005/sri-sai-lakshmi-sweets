import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Phone, MapPin, Clock, MessageSquare, Mail, Send } from 'lucide-react';
import { addInquiry } from '../../services/inquiryService';
import { INQUIRY_TYPES } from '../../utils/constants';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiry_type: 'Sweets Order',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      // Submit to database so it is recorded in the admin dashboard
      await addInquiry(formData);

      toast.success("Inquiry submitted successfully! We will get back to you soon.");

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        inquiry_type: 'Sweets Order',
        message: ''
      });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="font-body select-none py-12 px-4 max-w-7xl mx-auto">
      
      {/* Page Title */}
      <div className="text-center mb-12">
        <span className="text-gold font-accent italic text-base md:text-lg mb-2 block">
          Get In Touch
        </span>
        <h1 className="text-3xl md:text-5xl font-display font-bold text-brown-deep tracking-wide">
          Contact Sri Sai Lakshmi Ghee Sweets
        </h1>
        <div className="w-24 h-[1.5px] bg-gold mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: CONTACT DETAILS & MAP (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* Details Block */}
          <div className="bg-beige-card p-6 md:p-8 rounded-2xl border border-gold-pale shadow-card">
            <h2 className="text-2xl font-display font-bold text-brown-deep mb-6">
              Shop Information
            </h2>
            
            <div className="flex flex-col gap-5">
              
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="text-gold p-2 bg-cream rounded-full border border-gold-pale flex-shrink-0 mt-0.5">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-brown-deep text-sm">Phone Number</h4>
                  <p className="text-brown-mid text-sm mt-1">
                    <a href="tel:+919989599243" className="hover:text-gold transition-colors">
                      +91 99895 99243
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="text-gold p-2 bg-cream rounded-full border border-gold-pale flex-shrink-0 mt-0.5">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-brown-deep text-sm">Email Address</h4>
                  <p className="text-brown-mid text-sm mt-1">
                    <a href="mailto:info@srisailakshmigheesweets.com" className="hover:text-gold transition-colors">
                      info@srisailakshmigheesweets.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="text-gold p-2 bg-cream rounded-full border border-gold-pale flex-shrink-0 mt-0.5">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-brown-deep text-sm">Our Location</h4>
                  <p className="text-brown-mid text-sm mt-1 leading-relaxed">
                    Main Road, Gannavaram, Krishna District,<br />
                    Andhra Pradesh - 521101
                  </p>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-4">
                <div className="text-gold p-2 bg-cream rounded-full border border-gold-pale flex-shrink-0 mt-0.5">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-brown-deep text-sm">Shop Timings</h4>
                  <p className="text-brown-mid text-sm mt-1">7:00 AM - 9:30 PM (All Days)</p>
                </div>
              </div>

            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="rounded-2xl overflow-hidden border-2 border-gold-pale shadow-card h-[280px]">
            <iframe
              title="Sri Sai Lakshmi Ghee Sweets Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15303.498428385078!2d80.79379899999999!3d16.532454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fb6dfaa5bb9f%3A0xc3cf230559eb77fb!2sGannavaram%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>

        {/* RIGHT COLUMN: CONTACT FORM (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gold-pale shadow-card">
            <h2 className="text-2xl font-display font-bold text-brown-deep mb-2">
              Send Us an Inquiry
            </h2>
            <p className="text-brown-mid text-xs md:text-sm mb-6 leading-relaxed">
              Fill out this form and our shop representatives will review your request and get back to you promptly.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-sm">
              
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="font-semibold text-brown-deep">
                  Name <span className="text-saffron">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/30 text-brown-deep placeholder-brown-light/40 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="font-semibold text-brown-deep">
                    Phone Number <span className="text-saffron">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit number"
                    className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/30 text-brown-deep placeholder-brown-light/40 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-semibold text-brown-deep">
                    Email Address <span className="text-xs text-brown-light">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/30 text-brown-deep placeholder-brown-light/40 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                  />
                </div>
              </div>

              {/* Inquiry Type */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="inquiry_type" className="font-semibold text-brown-deep">
                  Inquiry Type <span className="text-saffron">*</span>
                </label>
                <select
                  id="inquiry_type"
                  name="inquiry_type"
                  value={formData.inquiry_type}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/30 text-brown-deep focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                >
                  {INQUIRY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="font-semibold text-brown-deep">
                  Message Details <span className="text-saffron">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Specify details, sweet quantities, or event catering schedules..."
                  className="w-full px-4 py-2.5 rounded-md border border-brown-light/20 bg-cream/30 text-brown-deep placeholder-brown-light/40 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="mt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gold hover:bg-gold-light text-brown-deep disabled:bg-brown-light/40 disabled:cursor-not-allowed font-body font-bold uppercase tracking-wider text-xs py-4 rounded-md shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Send size={16} />
                  {submitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>

    </div>
  );
};
export default ContactPage;
