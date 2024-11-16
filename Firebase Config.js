// Import necessary Firebase modules
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAJbXmOILxrwstMiTIG_G_UNZnwfM2lEyQ",
  authDomain: "apk-kesehatan-106bf.firebaseapp.com",
  projectId: "apk-kesehatan-106bf",
  storageBucket: "apk-kesehatan-106bf.appspot.com",
  messagingSenderId: "528289353591",
  appId: "1:528289353591:web:4f6606238974ffb938db72",
};

// Menghindari inisialisasi Firebase lebih dari sekali
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

