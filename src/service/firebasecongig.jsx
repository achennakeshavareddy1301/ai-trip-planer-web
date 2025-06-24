// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1SDH3ZSsyRQmSAeViVv-5PzfR4QnElQw",
  authDomain: "ai-trip-7a953.firebaseapp.com",
  projectId: "ai-trip-7a953",
  storageBucket: "ai-trip-7a953.firebasestorage.app",
  messagingSenderId: "976749949417",
  appId: "1:976749949417:web:ce6ffaf1ed442fb6b15b78",
  measurementId: "G-8C57ZK8P9G"
};

export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
