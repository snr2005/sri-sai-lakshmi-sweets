import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage, isMockMode } from './firebase';
import { getMockDb, notifyDbUpdate } from './mockDb';

const COLLECTION_NAME = 'products';

const fileToDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const subscribeProducts = (callback) => {
  if (isMockMode) {
    const mockDb = getMockDb();
    callback(mockDb.products);
    
    const handler = (e) => {
      callback(e.detail);
    };
    window.addEventListener(`mock-db-update-${COLLECTION_NAME}`, handler);
    return () => window.removeEventListener(`mock-db-update-${COLLECTION_NAME}`, handler);
  }

  const q = query(collection(db, COLLECTION_NAME), orderBy('created_at', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(products);
  }, (error) => {
    console.error("Error subscribing to products:", error);
  });
};

export const addProduct = async (productData, imageFile) => {
  if (isMockMode) {
    const mockDb = getMockDb();
    let imageUrl = "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600&auto=format&fit=crop";
    if (imageFile) {
      imageUrl = await fileToDataURL(imageFile);
    }
    const newProduct = {
      ...productData,
      id: `mock-prod-${Date.now()}`,
      image_url: imageUrl,
      created_at: new Date(),
      updated_at: new Date()
    };
    mockDb.products.unshift(newProduct);
    notifyDbUpdate(COLLECTION_NAME);
    return newProduct;
  }

  let imageUrl = '';
  if (imageFile) {
    const storageRef = ref(storage, `product-images/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    imageUrl = await getDownloadURL(storageRef);
  }

  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...productData,
    image_url: imageUrl,
    created_at: new Date(),
    updated_at: new Date()
  });

  return { id: docRef.id, ...productData, image_url: imageUrl };
};

export const updateProduct = async (productId, updates, newImageFile) => {
  if (isMockMode) {
    const mockDb = getMockDb();
    const idx = mockDb.products.findIndex(p => p.id === productId);
    if (idx > -1) {
      let imageUrl = updates.image_url || mockDb.products[idx].image_url;
      if (newImageFile) {
        imageUrl = await fileToDataURL(newImageFile);
      }
      mockDb.products[idx] = {
        ...mockDb.products[idx],
        ...updates,
        image_url: imageUrl,
        updated_at: new Date()
      };
      notifyDbUpdate(COLLECTION_NAME);
    }
    return;
  }

  let imageUrl = updates.image_url;
  if (newImageFile) {
    const storageRef = ref(storage, `product-images/${Date.now()}_${newImageFile.name}`);
    await uploadBytes(storageRef, newImageFile);
    imageUrl = await getDownloadURL(storageRef);
  }

  const docRef = doc(db, COLLECTION_NAME, productId);
  await updateDoc(docRef, {
    ...updates,
    image_url: imageUrl,
    updated_at: new Date()
  });
};

export const deleteProduct = async (productId, imageUrl) => {
  if (isMockMode) {
    const mockDb = getMockDb();
    mockDb.products = mockDb.products.filter(p => p.id !== productId);
    notifyDbUpdate(COLLECTION_NAME);
    return;
  }

  await deleteDoc(doc(db, COLLECTION_NAME, productId));

  if (imageUrl && imageUrl.includes('firebasestorage')) {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (e) {
      console.warn("Could not delete storage image:", e);
    }
  }
};
