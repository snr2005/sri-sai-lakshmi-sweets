const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919989599243';

export const getWhatsAppLink = (message = '') => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};

export const getProductInquiryLink = (productName) =>
  getWhatsAppLink(`Hello Sri Sai Lakshmi Ghee Sweets, I want to know more about ${productName}.`);

export const getCateringInquiryLink = () =>
  getWhatsAppLink(`Hello Sri Sai Lakshmi Ghee Sweets, I want to inquire about catering services.`);

export const getGeneralInquiryLink = () =>
  getWhatsAppLink(`Hello Sri Sai Lakshmi Ghee Sweets!`);
