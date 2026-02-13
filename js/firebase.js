import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDYLRZwbrHhySwjD_6E3qZXkBAF31NffI8",
  authDomain: "feiticeiros-online.firebaseapp.com",
  projectId: "feiticeiros-online",
  storageBucket: "feiticeiros-online.firebasestorage.app",
  messagingSenderId: "118808818712",
  appId: "1:118808818712:web:29fa24d60feabe384bff6d",
  measurementId: "G-DC2BW8KY56"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
