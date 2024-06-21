import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWduwG-4QbKsjmIwx4Jyhc65NjbSFhnow",
  authDomain: "enhanced-cpm.firebaseapp.com",
  projectId: "enhanced-cpm",
  storageBucket: "enhanced-cpm.appspot.com",
  messagingSenderId: "593714201263",
  appId: "1:593714201263:web:7d4eef9e57800bd5e10a5a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, auth, db, storage};