// src/pages/SignUp.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setErr("");
    try {
      await signUp({
        email: form.email,
        password: form.password,
        displayName: form.name,
      });
      navigate("/"); // back to home after sign up
    } catch (error) {
      setErr(error.message || "Failed to sign up");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <h1 className="mb-4 text-2xl font-semibold">Create an account</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg border border-slate-200">
        {err && <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{err}</div>}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-fuchsia-500 focus:outline-none"
            placeholder="Jane Doe"
          />
        </div>

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
          {submitting ? "Creating account…" : "Sign Up"}
        </button>

        <div className="text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-fuchsia-700 hover:underline">Sign in</Link>
        </div>
      </form>
    </div>
  );
}
