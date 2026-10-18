import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api.js";
import Logo from "../../components/Logo.jsx";
import Spinner from "../../components/Spinner.jsx";

const inputCls =
  "w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-600/40 focus:border-leaf-600 transition";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const { token, user } = await api.post("/auth/login", { email, password });
      localStorage.setItem("irveda_token", token);
      localStorage.setItem("irveda_user", JSON.stringify(user));
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-leaf-900 via-leaf-800 to-leaf-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur">
            <Logo light />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="font-display text-2xl font-bold text-leaf-900 text-center">Staff Login</h1>
          <p className="mt-1 text-center text-xs text-stone-500">
            Appointment management portal — authorized staff only.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Email</label>
              <input
                className={inputCls}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@irveda.com"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Password</label>
              <input
                className={inputCls}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-leaf-800 text-white text-sm font-bold hover:bg-leaf-900 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && <Spinner className="h-4 w-4" />} Sign in
            </button>
          </form>

          <div className="mt-6 rounded-lg bg-cream-100 border border-cream-200 p-3 text-xs text-stone-600 leading-relaxed">
            <span className="font-bold text-leaf-800">Demo accounts:</span>
            <br />
            admin@irveda.com / admin123 (Admin)
            <br />
            doctor@irveda.com / admin123 (Doctor)
          </div>
        </div>

        <p className="mt-6 text-center">
          <a href="/book" className="text-sm font-semibold text-cream-100/80 hover:text-white">
            ← Book an appointment instead
          </a>
        </p>
      </div>
    </div>
  );
}
