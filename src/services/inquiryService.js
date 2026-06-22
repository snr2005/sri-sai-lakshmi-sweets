import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, isMockMode } from './firebase';
import { getMockDb, notifyDbUpdate } from './mockDb';

const COLLECTION_NAME = 'inquiries';

export const subscribeInquiries = (callback) => {
  if (isMockMode) {
    const mockDb = getMockDb();
    callback(mockDb.inquiries);
    
    const handler = (e) => {
      callback(e.detail);
    };
    window.addEventListener(`mock-db-update-${COLLECTION_NAME}`, handler);
    return () => window.removeEventListener(`mock-db-update-${COLLECTION_NAME}`, handler);
  }

  const q = query(collection(db, COLLECTION_NAME), orderBy('created_at', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const inquiries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(inquiries);
  }, (error) => {
    console.error("Error subscribing to inquiries:", error);
  });
};

export const addInquiry = async (inquiryData) => {
  if (isMockMode) {
    const mockDb = getMockDb();
    const newInquiry = {
      ...inquiryData,
      id: `mock-inq-${Date.now()}`,
      status: 'new',
      created_at: new Date()
    };
    mockDb.inquiries.unshift(newInquiry);
    notifyDbUpdate(COLLECTION_NAME);
    return newInquiry;
  }

  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...inquiryData,
    status: 'new',
    created_at: new Date()
  });

  return { id: docRef.id, ...inquiryData, status: 'new' };
};

export const updateInquiryStatus = async (inquiryId, status) => {
  if (isMockMode) {
    const mockDb = getMockDb();
    const idx = mockDb.inquiries.findIndex(i => i.id === inquiryId);
    if (idx > -1) {
      mockDb.inquiries[idx] = {
        ...mockDb.inquiries[idx],
        status
      };
      notifyDbUpdate(COLLECTION_NAME);
    }
    return;
  }

  const docRef = doc(db, COLLECTION_NAME, inquiryId);
  await updateDoc(docRef, { status });
};

export const deleteInquiry = async (inquiryId) => {
  if (isMockMode) {
    const mockDb = getMockDb();
    mockDb.inquiries = mockDb.inquiries.filter(i => i.id !== inquiryId);
    notifyDbUpdate(COLLECTION_NAME);
    return;
  }

  await deleteDoc(doc(db, COLLECTION_NAME, inquiryId));
};
