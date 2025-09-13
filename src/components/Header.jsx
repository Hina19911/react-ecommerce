// src/components/Header.jsx
// Header component used in <App />
import { Link, NavLink } from "react-router-dom";
import { use, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

// 🔐 Firebase auth (uses your firebaseConfig)
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../services/firebaseConfig";

// Small helper for active nav styling
const navClass = ({ isActive }) =>
  "px-3 py-2 rounded-md text-sm font-medium " +
  (isActive
    ? "bg-white/15 text-white"
    : "text-white/90 hover:text-white hover:bg-white/10");

export default function Header() {
  const { cartCount } = use(CartContext); // reads the live cart count

  // --- Auth state (Sign in / Sign out buttons) ---
  const [user, setUser] = useState(null);
  useEffect(() => {
    const auth = getAuth(app);
    console.log("[Header] Subscribing to Firebase auth state…");
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      console.log("[Header] Auth state changed:", currentUser?.email || "signed out");
      setUser(currentUser ?? null);
    });
    return () => {
      console.log("[Header] Unsubscribe auth state listener");
      unsub();
    };
  }, []);

  async function handleSignOut() {
    try {
      const auth = getAuth(app);
      console.log("[Header] Sign out clicked");
      await signOut(auth);
      console.log("[Header] Signed out");
    } catch (err) {
      console.error("[Header] Sign out error:", err);
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-gradient-to-bl from-indigo-600 via-purple-600 to-fuchsia-600 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            {/* Simple cart logo */}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* cart body */}
              <path d="M3 3h2l.6 3M7 13h10l3-8H6.6" />
              {/* wheels */}
              <circle cx="9" cy="19" r="1.5" />
              <circle cx="17" cy="19" r="1.5" />
            </svg>
            <span className="text-lg font-semibold tracking-wide">My Mart</span>
          </Link>

          {/* Nav */}
          <nav className="hidden gap-1 md:flex">
            <NavLink to="/" className={navClass} end>
              Home
            </NavLink>
            <NavLink to="/cart" className={navClass}>
              Cart
            </NavLink>
            <NavLink to="/checkout" className={navClass}>
              Checkout
            </NavLink>
            <NavLink to="/locations" className={navClass}>
              Locations
            </NavLink>
          </nav>

          {/* Right-side actions: Auth + Cart */}
          <div className="flex items-center gap-2">
            {/* Auth buttons */}
            {user ? (
              <button
                onClick={handleSignOut}
                className="rounded-md bg-white px-3 py-2 text-sm font-medium text-fuchsia-700 hover:bg-fuchsia-50"
                title={user.email}
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link
                  to="/signin"
                  onClick={() => console.log("[Header] Sign In clicked")}
                  className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-600"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => console.log("[Header] Sign Up clicked")}
                  className="rounded-md bg-fuchsia-500 px-3 py-2 text-sm font-medium text-white hover:bg-fuchsia-600"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Cart button with badge */}
            <Link
              to="/cart"
              className="relative inline-flex items-center gap-2 rounded-md bg-white/15 px-3 py-2 text-sm font-medium hover:bg-white/20"
              onClick={() => console.log("[Header] Cart clicked")}
            >
              {/* Cart icon (inline SVG) */}
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 3h2l.4 2M7 13h10l3-8H6.4" />
                <circle cx="9" cy="19" r="1.5" />
                <circle cx="17" cy="19" r="1.5" />
              </svg>
              <span>Cart</span>

              {/* Badge */}
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-white text-xs font-bold text-fuchsia-700 shadow">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="flex gap-1 pb-3 md:hidden">
          <NavLink to="/" className={navClass} end>
            Home
          </NavLink>
          <NavLink to="/cart" className={navClass}>
            Cart
          </NavLink>
          <NavLink to="/checkout" className={navClass}>
            Checkout
          </NavLink>
          <NavLink to="/locations" className={navClass}>
            Locations
          </NavLink>
        </div>
      </div>
    </header>
  );
}

