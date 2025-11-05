import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB7rQCdIWcuGxnfx0yLdxHVQ6WxX1TVTGE",
  authDomain: "equiflow-2079c.firebaseapp.com",
  projectId: "equiflow-2079c",
  storageBucket: "equiflow-2079c.firebasestorage.app",
  messagingSenderId: "809064770838",
  appId: "1:809064770838:web:d6cc4e4e938e5a79f2f437",
  measurementId: "G-1SMP6WBFSJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

signInAnonymously(auth).catch(console.error);
