import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, isMockMode } from './firebase';

// Mock auth state (in-memory)
let mockUser = null;
const authListeners = new Set();

const triggerListeners = () => {
  authListeners.forEach(cb => cb(mockUser));
};

export const login = async (email, password) => {
  if (isMockMode) {
    // Standard mock credentials for testing the dashboard
    if (email === 'admin@srisailakshmi.com' && password === 'admin123') {
      mockUser = { 
        email, 
        uid: 'mock-admin-uid',
        emailVerified: true 
      };
      triggerListeners();
      return mockUser;
    } else {
      throw new Error("Invalid credentials! In Mock Mode, use: admin@srisailakshmi.com / admin123");
    }
  }
  
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logout = async () => {
  if (isMockMode) {
    mockUser = null;
    triggerListeners();
    return;
  }
  await signOut(auth);
};

export const onAuthStateChange = (callback) => {
  if (isMockMode) {
    authListeners.add(callback);
    // Initial state trigger
    callback(mockUser);
    return () => authListeners.delete(callback);
  }
  return onAuthStateChanged(auth, callback);
};
