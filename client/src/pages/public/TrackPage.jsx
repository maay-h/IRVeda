import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo.jsx";
import Spinner from "../../components/Spinner.jsx";
import { api } from "../../api.js";

const inputCls =
  "w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-600/40 focus:border-leaf-600 transition";

const STATUS_STYLES = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  CONFIRMED: "bg-emerald-100 text-emerald-800 border-emerald-200",
  RESCHEDULED: "bg-blue-100 text-blue-800 border-blue-200",
  CHECKED_IN: "bg-teal-100 text-teal-800 border-teal-200",
  COMPLETED: "bg-leaf-100 text-leaf-800 border-leaf-200",
  CANCELLED: "bg-red-100 text-red-700 border-red-200",
  NO_SHOW: "bg-stone-200 text-stone-600 border-stone-300",
};

export default function TrackPage() {
  const [ref, setRef] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setData(null);
    if (!ref.trim() || !phone.trim()) {
      setError("Enter your Appointment ID and phone number.");
      return;
    }
    setLoading(true);
    try {
      const d = await api.get(`/appointments/${encodeURIComponent(ref.trim())}?phone=${encodeURIComponent(phone.trim())}`);
      setData(d);
    } catch (err) {
      setError(err.message || "Could not find this appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <header className="border-b border-stone-200 bg-white/70 backdrop-blur">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link to="/book"><Logo /></Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <h1 className="font-display text-3xl font-bold text-leaf-900 text-center">Track Your Appointment</h1>
          <p className="mt-2 text-center text-sm text-stone-500">
            Enter the Appointment ID you received and the phone number you registered with.
          </p>

          <form onSubmit={submit} className="mt-8 bg-white rounded-2xl shadow-sm border border-stone-200 p-6 sm:p-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Appointment ID</label>
              <input className={inputCls} value={ref} onChange={(e) => setRef(e.target.value)} placeholder="e.g. IRV-2026-00001" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Phone Number</label>
              <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-leaf-800 text-white text-sm font-semibold hover:bg-leaf-900 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && <Spinner className="h-4 w-4" />} Track Status
            </button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>

          {data && (
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-leaf-900">{data.appointmentNo}</span>
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${STATUS_STYLES[data.status] || STATUS_STYLES.PENDING}`}>
                  {data.status.replace("_", " ")}
                </span>
              </div>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-stone-500">Concern</dt><dd className="font-semibold text-stone-800">{data.service}</dd></div>
                <div className="flex justify-between"><dt className="text-stone-500">Doctor</dt><dd className="font-semibold text-stone-800">{data.doctor}</dd></div>
                <div className="flex justify-between"><dt className="text-stone-500">Date</dt><dd className="font-semibold text-stone-800">{new Date(data.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</dd></div>
                <div className="flex justify-between"><dt className="text-stone-500">Time</dt><dd className="font-semibold text-stone-800">{new Date(2026, 0, 1, ...data.startTime.split(":").map(Number)).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</dd></div>
              </dl>
            </div>
          )}

          <p className="mt-6 text-center">
            <Link to="/book" className="text-sm font-semibold text-leaf-700 hover:text-leaf-900">← Book an appointment</Link>
          </p>
        </div>
      </main>

      <footer className="border-t border-stone-200 py-6 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} IR Veda Ayurvedic Hospital
      </footer>
    </div>
  );
}
