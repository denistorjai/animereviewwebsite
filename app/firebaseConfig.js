import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Your Firebase config from the Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyB-c4oHsTiIfuuiIsZ8JTV-mnqXVix1JHg",
  authDomain: "animereviewwebsite.firebaseapp.com",
  projectId: "animereviewwebsite",
  storageBucket: "animereviewwebsite.firebasestorage.app",
  messagingSenderId: "634434352457",
  appId: "1:634434352457:web:9c531719100ebc2434d698",
  measurementId: "G-CQMWFVYKYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, db, addDoc, collection, serverTimestamp };
