// Import the necessary functions from the Firebase SDKs
import { initializeApp } from "firebase/app"; // Import to initialize the Firebase app
import { getAuth } from "firebase/auth"; // Import to handle Firebase authentication
import { getFirestore } from "firebase/firestore"; // Import to handle Firestore database
import { getStorage } from "firebase/storage"; // Import to handle Firebase storage

// Firebase configuration object containing the project's API key and other identifiers
// Your web app's Firebase configuration


// Initialize Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);

// Initialize Firebase authentication and get a reference to the auth service
const auth = getAuth(app);

// Initialize Firebase Firestore (database) and get a reference to the database service
const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the storage service
const storage = getStorage(app);

// Export initialized Firebase app, authentication, Firestore, and storage instances
export { app, auth, db, storage };
