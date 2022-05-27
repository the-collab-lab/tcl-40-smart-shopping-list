// NOTE: import only the Firebase modules that you need in your app.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase.
const firebaseConfig = {
  apiKey: 'AIzaSyCEGx9eyTmlvNXUxZRnMw6BLy_w0ikmOxM',
  authDomain: 'tcl-40-smart-shopping-li-23b8c.firebaseapp.com',
  projectId: 'tcl-40-smart-shopping-li-23b8c',
  storageBucket: 'tcl-40-smart-shopping-li-23b8c.appspot.com',
  messagingSenderId: '72982113492',
  appId: '1:72982113492:web:06cdf136544ddd4d89df41',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
