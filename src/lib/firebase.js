// NOTE: import only the Firebase modules that you need in your app.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase.
const firebaseConfig = {
  apiKey: 'AIzaSyAap0h-QvB72HyPy190OqyxE-afDVlLRQk',
  authDomain: 'tcl-40-smart-shopping-list.firebaseapp.com',
  projectId: 'tcl-40-smart-shopping-list',
  storageBucket: 'tcl-40-smart-shopping-list.appspot.com',
  messagingSenderId: '1091305950811',
  appId: '1:1091305950811:web:7395029344d96ae759f97e',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
