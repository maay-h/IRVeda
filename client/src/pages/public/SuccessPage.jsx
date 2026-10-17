import { useLocation, Link } from "react-router-dom";
import Logo from "../../components/Logo.jsx";

export default function SuccessPage() {
  const { state } = useLocation();
  const result = state?.result;
  const service = state?.service;

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <header className="border-b border-stone-200 bg-white/70 backdrop-blur">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Logo />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-stone-200 p-8 sm:p-10 text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-leaf-100 flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-9 w-9 text-leaf-700">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <h1 className="mt-6 font-display text-3xl font-bold text-leaf-900">Appointment Request Submitted</h1>

          {result ? (
            <div className="mt-6 rounded-xl bg-cream-100 border border-cream-200 p-5 text-left">
              <div className="flex justify-between items-center py-2 border-b border-stone-200">
                <span className="text-sm text-stone-500">Appointment ID</span>
                <span className="font-mono font-bold text-leaf-900">{result.appointmentNo}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-stone-200">
                <span className="text-sm text-stone-500">Concern</span>
                <span className="text-sm font-semibold text-stone-800">{result.service}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-stone-200">
                <span className="text-sm text-stone-500">Doctor</span>
                <span className="text-sm font-semibold text-stone-800">{result.doctor}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-stone-200">
                <span className="text-sm text-stone-500">Date</span>
                <span className="text-sm font-semibold text-stone-800">
                  {new Date(result.date + "T00:00:00").toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-stone-500">Time</span>
                <span className="text-sm font-semibold text-stone-800">
                  {new Date(2026, 0, 1, ...result.startTime.split(":").map(Number)).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ) : (
            <p className="mt-6 text-sm text-stone-500">
              Your request has been received. If you were redirected here without booking, please try again.
            </p>
          )}

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-saffron-100 border border-saffron-300 px-4 py-2 text-sm font-semibold text-saffron-700">
            Status: Pending Confirmation
          </div>

          <p className="mt-5 text-sm text-stone-500">
            Our team will contact you shortly to confirm your appointment.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/track"
              className="px-6 py-2.5 rounded-lg border border-leaf-700 text-leaf-800 text-sm font-semibold hover:bg-leaf-50 transition-colors"
            >
              Track Appointment Status
            </Link>
            <Link
              to="/book"
              className="px-6 py-2.5 rounded-lg bg-leaf-800 text-white text-sm font-semibold hover:bg-leaf-900 transition-colors"
            >
              Book Another Appointment
            </Link>
          </div>

          {service && (
            <p className="mt-8 text-xs text-stone-400">
              This is a request — a physician may reach out for additional information before confirmation.
            </p>
          )}
        </div>
      </main>

      <footer className="border-t border-stone-200 py-6 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} IR Veda Ayurvedic Hospital
      </footer>
    </div>
  );
}
