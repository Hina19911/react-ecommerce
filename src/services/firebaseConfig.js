// src/services/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as analyticsSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔐 Note: Firebase web API keys are OK to be public (they gate by project rules)
const firebaseConfig = {
  apiKey: "AIzaSyC5mv0bi5oLgn5L1cZHYt48mMPEN1Uk3TE",
  authDomain: "my-mart-fd8cf.firebaseapp.com",
  projectId: "my-mart-fd8cf",
  storageBucket: "my-mart-fd8cf.firebasestorage.app",
  messagingSenderId: "780031790793",
  appId: "1:780031790793:web:ff065b8023c128e27f8718"
};

// Initialize core SDKs
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Start Analytics only when supported (browser + HTTPS/localhost)
export let analytics = null;
try {
  if (typeof window !== "undefined" && (await analyticsSupported())) {
    analytics = getAnalytics(app);
  }
} catch {
  // ignore analytics initialization errors in dev
}
