import { useState, useEffect } from 'react';
import { subscribeInquiries } from '../services/inquiryService';

export const useInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeInquiries((data) => {
      setInquiries([...data]);
      setLoading(false);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  return { inquiries, loading };
};
export default useInquiries;
