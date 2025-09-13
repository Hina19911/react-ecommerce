// src/context/AuthProvider.jsx
import { createContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut as fbSignOut,
} from "firebase/auth";
import { auth } from "../services/firebaseConfig";

// Make a context we can read anywhere (Header, pages, etc.)
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);      // Firebase user or null
  const [loading, setLoading] = useState(true); // while we check initial auth state

  // Subscribe to auth state changes (login/logout) once
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser ?? null);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Wrap Firebase calls with small helpers for the app
  async function signUp({ email, password, displayName }) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    return cred.user;
  }

  async function signIn({ email, password }) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  }

  async function signOut() {
    await fbSignOut(auth);
  }

  const value = useMemo(
    () => ({ user, loading, signUp, signIn, signOut }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
