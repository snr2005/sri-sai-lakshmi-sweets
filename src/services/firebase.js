import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if firebase credentials are placeholders
export const isMockMode = 
  !firebaseConfig.apiKey || 
  firebaseConfig.apiKey === 'placeholder_api_key' ||
  firebaseConfig.apiKey.startsWith('your_api_key');

let app, auth, db, storage;

if (!isMockMode) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    console.log("Firebase initialized successfully in Production Mode.");
  } catch (error) {
    console.error("Firebase initialization failed. Falling back to Mock Mode.", error);
    app = null;
    auth = null;
    db = null;
    storage = null;
  }
} else {
  console.warn("Firebase credentials are not set in .env.local. Running in Mock Mode with session storage.");
}

export { auth, db, storage };
export default app;
