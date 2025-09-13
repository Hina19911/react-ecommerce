// src/pages/SignIn.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setErr("");
    try {
      await signIn({
        email: form.email,
        password: form.password,
      });
      navigate("/");
    } catch (error) {
      setErr(error.message || "Failed to sign in");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <h1 className="mb-4 text-2xl font-semibold">Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg border border-slate-200">
        {err && <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{err}</div>}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-fuchsia-500 focus:outline-none"
            placeholder="jane@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-fuchsia-500 focus:outline-none"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-fuchsia-600 px-4 py-2 text-white font-medium hover:bg-fuchsia-700 disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign In"}
        </button>

        <div className="text-sm text-slate-600">
          New here?{" "}
          <Link to="/signup" className="text-fuchsia-700 hover:underline">Create an account</Link>
        </div>
      </form>
    </div>
  );
}
