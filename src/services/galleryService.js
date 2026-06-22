import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage, isMockMode } from './firebase';
import { getMockDb, notifyDbUpdate } from './mockDb';

const COLLECTION_NAME = 'gallery';

const fileToDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const subscribeGallery = (callback) => {
  if (isMockMode) {
    const mockDb = getMockDb();
    callback(mockDb.gallery);
    
    const handler = (e) => {
      callback(e.detail);
    };
    window.addEventListener(`mock-db-update-${COLLECTION_NAME}`, handler);
    return () => window.removeEventListener(`mock-db-update-${COLLECTION_NAME}`, handler);
  }

  const q = query(collection(db, COLLECTION_NAME), orderBy('created_at', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const galleryItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(galleryItems);
  }, (error) => {
    console.error("Error subscribing to gallery:", error);
  });
};

export const addGalleryItem = async (galleryData, imageFile) => {
  if (isMockMode) {
    const mockDb = getMockDb();
    let imageUrl = "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600&auto=format&fit=crop";
    if (imageFile) {
      imageUrl = await fileToDataURL(imageFile);
    }
    const newItem = {
      ...galleryData,
      id: `mock-gall-${Date.now()}`,
      image_url: imageUrl,
      created_at: new Date()
    };
    mockDb.gallery.unshift(newItem);
    notifyDbUpdate(COLLECTION_NAME);
    return newItem;
  }

  let imageUrl = '';
  if (imageFile) {
    const storageRef = ref(storage, `gallery-images/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    imageUrl = await getDownloadURL(storageRef);
  }

  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...galleryData,
    image_url: imageUrl,
    created_at: new Date()
  });

  return { id: docRef.id, ...galleryData, image_url: imageUrl };
};

export const deleteGalleryItem = async (galleryItemId, imageUrl) => {
  if (isMockMode) {
    const mockDb = getMockDb();
    mockDb.gallery = mockDb.gallery.filter(g => g.id !== galleryItemId);
    notifyDbUpdate(COLLECTION_NAME);
    return;
  }

  await deleteDoc(doc(db, COLLECTION_NAME, galleryItemId));

  if (imageUrl && imageUrl.includes('firebasestorage')) {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (e) {
      console.warn("Could not delete storage image:", e);
    }
  }
};
