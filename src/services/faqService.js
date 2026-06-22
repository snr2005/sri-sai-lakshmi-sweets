import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, isMockMode } from './firebase';
import { getMockDb, notifyDbUpdate } from './mockDb';

const COLLECTION_NAME = 'chatbot_faqs';

export const subscribeFAQs = (callback) => {
  if (isMockMode) {
    const mockDb = getMockDb();
    callback(mockDb.faqs);
    
    const handler = (e) => {
      callback(e.detail);
    };
    window.addEventListener(`mock-db-update-${COLLECTION_NAME}`, handler);
    return () => window.removeEventListener(`mock-db-update-${COLLECTION_NAME}`, handler);
  }

  const q = query(collection(db, COLLECTION_NAME), orderBy('created_at', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const faqs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(faqs);
  }, (error) => {
    console.error("Error subscribing to FAQs:", error);
  });
};

export const addFAQ = async (faqData) => {
  if (isMockMode) {
    const mockDb = getMockDb();
    const newFAQ = {
      ...faqData,
      id: `mock-faq-${Date.now()}`,
      created_at: new Date(),
      updated_at: new Date()
    };
    mockDb.faqs.unshift(newFAQ);
    notifyDbUpdate(COLLECTION_NAME);
    return newFAQ;
  }

  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...faqData,
    created_at: new Date(),
    updated_at: new Date()
  });

  return { id: docRef.id, ...faqData };
};

export const updateFAQ = async (faqId, updates) => {
  if (isMockMode) {
    const mockDb = getMockDb();
    const idx = mockDb.faqs.findIndex(f => f.id === faqId);
    if (idx > -1) {
      mockDb.faqs[idx] = {
        ...mockDb.faqs[idx],
        ...updates,
        updated_at: new Date()
      };
      notifyDbUpdate(COLLECTION_NAME);
    }
    return;
  }

  const docRef = doc(db, COLLECTION_NAME, faqId);
  await updateDoc(docRef, {
    ...updates,
    updated_at: new Date()
  });
};

export const deleteFAQ = async (faqId) => {
  if (isMockMode) {
    const mockDb = getMockDb();
    mockDb.faqs = mockDb.faqs.filter(f => f.id !== faqId);
    notifyDbUpdate(COLLECTION_NAME);
    return;
  }

  await deleteDoc(doc(db, COLLECTION_NAME, faqId));
};
