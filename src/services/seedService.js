import { collection, addDoc, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db, isMockMode } from './firebase';
import { DEFAULT_PRODUCTS, DEFAULT_FAQS, DEFAULT_GALLERY } from '../utils/seedData';

/**
 * Seeds the firestore database collections with default data
 * only when running in live mode (non-mock).
 */
export const seedDatabase = async () => {
  if (isMockMode) {
    throw new Error("Cannot seed database in Mock Mode. Please add Firebase credentials first.");
  }

  console.log("Starting database seeding process...");
  
  // 1. Seed Products
  const productsCol = collection(db, 'products');
  const productsSnapshot = await getDocs(productsCol);
  
  if (productsSnapshot.empty) {
    console.log("Seeding products...");
    const batch = writeBatch(db);
    DEFAULT_PRODUCTS.forEach((p) => {
      const newDocRef = doc(collection(db, 'products'));
      batch.set(newDocRef, {
        ...p,
        created_at: new Date(),
        updated_at: new Date()
      });
    });
    await batch.commit();
    console.log("Products seeded successfully.");
  } else {
    console.log("Products collection already has data. Skipping.");
  }

  // 2. Seed Chatbot FAQs
  const faqsCol = collection(db, 'chatbot_faqs');
  const faqsSnapshot = await getDocs(faqsCol);
  
  if (faqsSnapshot.empty) {
    console.log("Seeding FAQs...");
    const batch = writeBatch(db);
    DEFAULT_FAQS.forEach((f) => {
      const newDocRef = doc(collection(db, 'chatbot_faqs'));
      batch.set(newDocRef, {
        ...f,
        created_at: new Date(),
        updated_at: new Date()
      });
    });
    await batch.commit();
    console.log("FAQs seeded successfully.");
  } else {
    console.log("FAQs collection already has data. Skipping.");
  }

  // 3. Seed Gallery
  const galleryCol = collection(db, 'gallery');
  const gallerySnapshot = await getDocs(galleryCol);
  
  if (gallerySnapshot.empty) {
    console.log("Seeding gallery...");
    const batch = writeBatch(db);
    DEFAULT_GALLERY.forEach((g) => {
      const newDocRef = doc(collection(db, 'gallery'));
      batch.set(newDocRef, {
        ...g,
        created_at: new Date()
      });
    });
    await batch.commit();
    console.log("Gallery seeded successfully.");
  } else {
    console.log("Gallery collection already has data. Skipping.");
  }

  console.log("Database seeding completed.");
  return { success: true };
};
