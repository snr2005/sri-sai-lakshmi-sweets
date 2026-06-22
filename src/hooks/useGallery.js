import { useState, useEffect } from 'react';
import { subscribeGallery } from '../services/galleryService';

export const useGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeGallery((data) => {
      setGallery([...data]);
      setLoading(false);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  return { gallery, loading };
};
export default useGallery;
