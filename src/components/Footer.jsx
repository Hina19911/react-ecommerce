import { Link } from "react-router-dom";

export default function Footer() {
  function handleSignup(e) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    if (!email) return;
    // For now, just a demo alert. Later you can hit your API/Netlify function.
    alert(`Thanks for signing up, ${email}!`);
    e.currentTarget.reset();
  }

  return (
    <footer className="mt-12 border-t border-black/10 bg-slate-900 text-slate-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-3">
        {/* Brand & blurb */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-fuchsia-400" />
            <span className="text-lg font-semibold">PhoneMart</span>
          </div>
          <p className="text-sm text-slate-300">
            Your friendly store for phones & accessories. Fast shipping, easy
            returns, and prices that don’t bite.
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-200">
            Sign up for updates
          </h3>
          <form onSubmit={handleSignup} className="flex gap-2">
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-fuchsia-400 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-md bg-fuchsia-500 px-4 py-2 text-sm font-medium text-white hover:bg-fuchsia-600"
            >
              Sign up
            </button>
          </form>
          <p className="mt-2 text-xs text-slate-400">
            We’ll only send good stuff. Unsubscribe anytime.
          </p>
        </div>

        {/* Social + quick links */}
        <div className="md:justify-self-end">
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-200">
            Follow us
          </h3>
          <div className="mb-4 flex items-center gap-3">
            {/* Twitter/X */}
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="rounded-md p-2 hover:bg-white/10"
              title="Twitter"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.244 2H21l-6.51 7.44L22 22h-6.773l-5.3-6.42L3.8 22H1l7.03-8.03L2 2h6.773l4.77 5.78L18.244 2Zm-2.37 18h1.52L8.22 4h-1.5l9.154 16Z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-md p-2 hover:bg-white/10"
              title="Instagram"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0 2.5A3.5 3.5 0 1 0 12 17a3.5 3.5 0 0 0 0-7.5Zm5.25-.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z" />
              </svg>
            </a>
            {/* GitHub */}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-md p-2 hover:bg-white/10"
              title="GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .5A11.5 11.5 0 0 0 .5 12.2c0 5.2 3.4 9.6 8.2 11.2.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.6-1.5-2-1.5-2-1.2-.8.1-.8.1-.8 1.3.1 2 1.4 2 1.4 1.2 2 3.2 1.4 4 .9.1-.9.5-1.4.9-1.7-2.7-.3-5.6-1.4-5.6-6.2 0-1.4.5-2.6 1.4-3.5-.1-.3-.6-1.7.1-3.5 0 0 1.1-.4 3.6 1.3 1-.3 2-.4 3.1-.4s2.1.1 3.1.4c2.5-1.7 3.6-1.3 3.6-1.3.7 1.8.2 3.2.1 3.5.9.9 1.4 2.1 1.4 3.5 0 4.8-2.9 5.9-5.6 6.2.5.4.9 1.2.9 2.5v3.7c0 .3.2.7.8.6 4.8-1.6 8.2-6 8.2-11.2A11.7 11.7 0 0 0 12 .5Z" />
              </svg>
            </a>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-300">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <Link to="/cart" className="hover:text-white">
              Cart
            </Link>
            <Link to="/checkout" className="hover:text-white">
              Checkout
            </Link>
            <a
              href="mailto:support@phonemart.example"
              className="hover:text-white"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} PhoneMart. All rights reserved.
      </div>
    </footer>
  );
}
