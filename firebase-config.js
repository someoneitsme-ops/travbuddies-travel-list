// Replace with your Firebase config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAk2zhehvo1oD54TVGKs_LlUtBhiu5c2DQ",
  authDomain: "travbuddiesapp.firebaseapp.com",
  projectId: "travbuddiesapp",
  storageBucket: "travbuddiesapp.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Admin Permissions: Admin user (admin@sgtrek.com) can delete traveler entries.
// This should be enforced client-side (through UI control) and optionally checked server-side (via Firebase Rules if needed).
