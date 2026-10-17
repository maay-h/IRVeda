import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { api } from "../../api.js";
import { StatusBadge, fmtTime, fmtDate } from "../../components/admin/helpers.jsx";
import Spinner from "../../components/Spinner.jsx";

function StatCard({ label, value, accent, icon }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-display font-bold text-leaf-900">{value}</div>
          <div className="mt-0.5 text-xs font-medium text-stone-500">{label}</div>
        </div>
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${accent}`}>
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path fillRule="evenodd" d={icon} clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useOutletContext();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/admin/dashboard")
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  if (error)
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</div>
    );
  if (!data)
    return (
      <div className="flex justify-center py-24">
        <Spinner className="h-8 w-8 text-leaf-700" />
      </div>
    );

  const detoxPct = data.total ? Math.round((data.bodyDetox / data.total) * 100) : 0;

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-leaf-900">Dashboard</h1>
          <p className="text-sm text-stone-500">
            Welcome back, {user?.name}. Here's today's overview.
          </p>
        </div>
        <Link
          to="/admin/appointments"
          className="px-4 py-2 rounded-lg bg-leaf-800 text-white text-sm font-semibold hover:bg-leaf-900"
        >
          View Appointments
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Today's Appointments"
          value={data.today}
          accent="bg-leaf-100 text-leaf-800"
          icon="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 5h8v1.5H7V7zm0 3h8v1.5H7V10zm0 3h5v1.5H7V13z"
        />
        <StatCard
          label="Pending Requests"
          value={data.pending}
          accent="bg-amber-100 text-amber-700"
          icon="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
        />
        <StatCard
          label="Confirmed"
          value={data.confirmed}
          accent="bg-emerald-100 text-emerald-700"
          icon="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        />
        <StatCard
          label="Completed"
          value={data.completed}
          accent="bg-leaf-100 text-leaf-800"
          icon="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11.5a.75.75 0 00-1.5 0v3.59L7.16 12.4a.75.75 0 001.06 1.06l2.1-1.72V6.5z"
        />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-stone-200 bg-white p-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-leaf-700">Recent Appointments</h2>
          <div className="mt-4 space-y-3">
            {data.recent.length === 0 && <p className="text-sm text-stone-400">No appointments yet.</p>}
            {data.recent.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-3 border border-stone-100 rounded-lg px-4 py-3">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-stone-800 truncate">
                    {a.patient.name} <span className="text-stone-400 font-normal">· {a.service.name}</span>
                  </div>
                  <div className="text-xs text-stone-500">
                    {a.doctor.name} · {fmtDate(a.date)} {fmtTime(a.startTime)}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[11px] text-stone-400 hidden sm:inline">{a.appointmentNo}</span>
                  <StatusBadge status={a.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-stone-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-leaf-700">Body Detox</h2>
              <span className="text-xs font-bold text-saffron-700">★ Featured</span>
            </div>
            <div className="mt-4 flex items-end gap-2">
              <div className="font-display text-4xl font-bold text-leaf-900">{data.bodyDetox}</div>
              <div className="text-sm text-stone-500 mb-1">requests</div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-stone-100 overflow-hidden">
              <div className="h-full rounded-full bg-saffron-500" style={{ width: `${detoxPct}%` }} />
            </div>
            <div className="mt-1.5 text-xs text-stone-500">
              {detoxPct}% of all appointments
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-leaf-700 mb-4">Status Breakdown</h2>
            <div className="space-y-3">
              {data.byStatus.map((s) => (
                <div key={s.status} className="flex items-center justify-between text-sm">
                  <span className="text-stone-500">{s.status.replace("_", " ")}</span>
                  <span className="font-semibold text-stone-800">{s._count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-leaf-700 mb-4">Appointments by Service</h2>
          {data.byService.length === 0 ? (
            <p className="text-sm text-stone-400">No data yet.</p>
          ) : (
            <div className="space-y-3">
              {data.byService.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-stone-700">{s.name}</span>
                    <span className="text-stone-500">{s.count}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-leaf-600"
                      style={{ width: `${(s.count / data.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-leaf-700 mb-4">Appointments by Doctor</h2>
          {data.byDoctor.length === 0 ? (
            <p className="text-sm text-stone-400">No data yet.</p>
          ) : (
            <div className="space-y-3">
              {data.byDoctor.map((d) => (
                <div key={d.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-stone-700">{d.name}</span>
                    <span className="text-stone-500">{d.count}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-saffron-500"
                      style={{ width: `${(d.count / data.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
