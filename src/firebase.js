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

// Initialize Firebase app with the provided configuration
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase authentication
const auth = getAuth(firebaseApp);

// Initialize Firebase Firestore (database)
const db = getFirestore(firebaseApp);

// Initialize Firebase Storage
const storage = getStorage(firebaseApp);

// Export initialized Firebase app, authentication, Firestore, and storage instances
export { firebaseApp, auth, db, storage };


/*// Replace with your Firebase project config obtained from Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Your Firebase API key
  authDomain: "YOUR_AUTH_DOMAIN", // Your Firebase authentication domain
  projectId: "YOUR_PROJECT_ID", // Your Firebase project ID
  storageBucket: "YOUR_STORAGE_BUCKET", // Your Firebase storage bucket
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Your Firebase messaging sender ID
  appId: "YOUR_APP_ID" // Your Firebase app ID
};*/