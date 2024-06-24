// Import the necessary functions from the Firebase SDKs
import { initializeApp } from "firebase/app"; // Import to initialize the Firebase app
import { getAuth } from "firebase/auth"; // Import to handle Firebase authentication
import { getFirestore } from "firebase/firestore"; // Import to handle Firestore database
import { getStorage } from "firebase/storage"; // Import to handle Firebase storage

// Firebase configuration object containing the project's API key and other identifiers
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

// Initialize Firebase authentication and get a reference to the auth service
const auth = getAuth(firebaseApp);

// Initialize Firebase Firestore (database) and get a reference to the database service
const db = getFirestore(firebaseApp);

// Initialize Firebase Storage and get a reference to the storage service
const storage = getStorage(firebaseApp);

// Export initialized Firebase app, authentication, Firestore, and storage instances
export { firebaseApp, auth, db, storage };
