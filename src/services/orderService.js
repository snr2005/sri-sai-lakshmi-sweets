import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, isMockMode } from './firebase';
import { getMockDb, notifyDbUpdate } from './mockDb';

const COLLECTION_NAME = 'orders';

export const subscribeOrders = (callback) => {
  if (isMockMode) {
    const mockDb = getMockDb();
    callback(mockDb.orders || []);
    
    const handler = (e) => {
      callback(e.detail || []);
    };
    window.addEventListener(`mock-db-update-${COLLECTION_NAME}`, handler);
    return () => window.removeEventListener(`mock-db-update-${COLLECTION_NAME}`, handler);
  }

  const q = query(collection(db, COLLECTION_NAME), orderBy('created_at', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(orders);
  }, (error) => {
    console.error("Error subscribing to orders:", error);
  });
};

export const addOrder = async (orderData) => {
  if (isMockMode) {
    const mockDb = getMockDb();
    const newOrder = {
      ...orderData,
      id: `mock-order-${Date.now()}`,
      created_at: new Date(),
      updated_at: new Date()
    };
    if (!mockDb.orders) mockDb.orders = [];
    mockDb.orders.unshift(newOrder);
    notifyDbUpdate(COLLECTION_NAME);
    return newOrder;
  }

  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...orderData,
    created_at: new Date(),
    updated_at: new Date()
  });

  return { id: docRef.id, ...orderData };
};

export const updateOrder = async (orderId, updates) => {
  if (isMockMode) {
    const mockDb = getMockDb();
    const idx = mockDb.orders.findIndex(o => o.id === orderId);
    if (idx > -1) {
      mockDb.orders[idx] = {
        ...mockDb.orders[idx],
        ...updates,
        updated_at: new Date()
      };
      notifyDbUpdate(COLLECTION_NAME);
    }
    return;
  }

  const docRef = doc(db, COLLECTION_NAME, orderId);
  await updateDoc(docRef, {
    ...updates,
    updated_at: new Date()
  });
};

export const deleteOrder = async (orderId) => {
  if (isMockMode) {
    const mockDb = getMockDb();
    mockDb.orders = mockDb.orders.filter(o => o.id !== orderId);
    notifyDbUpdate(COLLECTION_NAME);
    return;
  }

  await deleteDoc(doc(db, COLLECTION_NAME, orderId));
};
