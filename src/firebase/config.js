// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMJqqx8RwH1Kbr7bDrOHmlQB-aKc1fdwc",
  authDomain: "muni-app-e28ae.firebaseapp.com",
  projectId: "muni-app-e28ae",
  storageBucket: "muni-app-e28ae.firebasestorage.app",
  messagingSenderId: "54641914399",
  appId: "1:54641914399:web:e1b4863967cfae20589b2a",
  measurementId: "G-2WP2V9L6Y6"
};


// Initialize Firebase
// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth  = getAuth( FirebaseApp );
export const FirebaseDB  = getFirestore( FirebaseApp );
export const FirebaseStorage = getStorage(FirebaseApp);


const analytics = getAnalytics(FirebaseApp);