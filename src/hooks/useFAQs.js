import { useState, useEffect } from 'react';
import { subscribeFAQs } from '../services/faqService';

export const useFAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeFAQs((data) => {
      setFaqs([...data]);
      setLoading(false);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  return { faqs, loading };
};
export default useFAQs;
