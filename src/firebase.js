// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPjlJyeSkKO3ihQucArtW-ttnx4pQP_dI",
  authDomain: "memory-scrapbook-app.firebaseapp.com",
  projectId: "memory-scrapbook-app",
  storageBucket: "memory-scrapbook-app.firebasestorage.app",
  messagingSenderId: "107940991881",
  appId: "1:107940991881:web:18d38e1f1d9746308c0758",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it
export const db = getFirestore(app);