import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, MessageCircle, FileText } from 'lucide-react';
import { useFAQs } from '../../hooks/useFAQs';
import { getGeneralInquiryLink } from '../../utils/whatsapp';

export const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaste! Welcome to Sri Sai Lakshmi Ghee Sweets. 🍬 How can I help you today?',
      time: new Date()
    }
  ]);
  const location = useLocation();
  const { faqs } = useFAQs();
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Hide Chatbot on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  // Filter active FAQs, fallback if none loaded
  const activeFaqs = faqs?.length > 0 
    ? faqs.filter(f => f.is_active) 
    : [
        { question: "What sweets are available?", answer: "We offer a wide variety including Kaju Katli, Ladoo, Halwa, Jangiri, Mysorepak, and many more. Visit our Products page to see the full menu!", category: "Products" },
        { question: "Do you provide catering?", answer: "Yes! We provide catering for weddings, functions, birthdays, festivals, and all special occasions. Contact us for custom packages.", category: "Catering" },
        { question: "Where is the shop located?", answer: "We are located in Gannavaram, Andhra Pradesh. You can find us on the map on our Contact page.", category: "Location" },
        { question: "What are the contact numbers?", answer: "You can reach us on WhatsApp or call us directly. Click the WhatsApp button to connect instantly!", category: "General" }
      ];

  const handleQuestionSelect = (faq) => {
    // Add user message
    const userMsg = {
      sender: 'user',
      text: faq.question,
      time: new Date()
    };
    setMessages(prev => [...prev, userMsg]);

    // Simulate bot thinking and answering
    setTimeout(() => {
      const botMsg = {
        sender: 'bot',
        text: faq.answer,
        time: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    }, 400);
  };

  return (
    <div className="fixed bottom-24 right-6 z-40 font-body select-none">
      {/* Toggle Chat Button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gold text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gold-light transition-all duration-300 relative"
          aria-label="Open Chat Assistant"
        >
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-saffron rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-saffron rounded-full"></span>
          <MessageSquare size={26} />
        </motion.button>
      )}

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-[90vw] sm:w-[380px] h-[520px] bg-beige-card rounded-2xl border border-gold-pale shadow-hover overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-choco-footer text-white px-5 py-4 flex items-center justify-between border-b border-gold">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-sm font-bold text-white">
                  🍬
                </div>
                <div>
                  <h3 className="font-display font-bold text-base leading-none text-white">
                    Sai Lakshmi Assistant
                  </h3>
                  <span className="text-[10px] text-gold-light font-body font-semibold uppercase tracking-wider block mt-1">
                    Online &bull; Traditional Taste
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-brown-light hover:text-white transition-colors"
                aria-label="Close Chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Message History & Scroll area */}
            <div className="flex-grow p-4 overflow-y-auto bg-cream/50 flex flex-col gap-3">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`max-w-[80%] flex flex-col ${
                    msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                  }`}
                >
                  <div 
                    className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-gold text-white rounded-tr-none' 
                        : 'bg-white text-brown-deep border border-gold-pale/30 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-brown-light mt-1 px-1">
                    {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Question Chips */}
            <div className="p-3 border-t border-gold-pale/30 bg-white">
              <p className="text-[10px] uppercase font-bold tracking-wider text-brown-light mb-2 px-1">
                Frequently Asked Questions:
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide max-h-[80px] flex-wrap">
                {activeFaqs.map((faq, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuestionSelect(faq)}
                    className="text-xs bg-cream-dark/40 text-brown-deep hover:bg-gold-pale/40 border border-gold-pale px-3 py-1.5 rounded-full whitespace-nowrap transition-colors"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-3 bg-cream-dark/30 border-t border-gold-pale/30 grid grid-cols-2 gap-2">
              <a
                href={getGeneralInquiryLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-success text-white py-2.5 px-3 rounded-md text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#256f34] transition-colors"
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-gold text-white py-2.5 px-3 rounded-md text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm hover:bg-gold-light transition-colors"
              >
                <FileText size={14} />
                Contact Form
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default FloatingChatbot;
