import { useEffect, useState, useCallback } from "react";
import { api } from "../../api.js";
import {
  StatusBadge,
  STATUS_FLOW,
  fmtTime,
  fmtDate,
} from "../../components/admin/helpers.jsx";
import Spinner from "../../components/Spinner.jsx";

const inputCls =
  "rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-600/40 focus:border-leaf-600 transition";

const QUICK_TRANSITIONS = {
  PENDING: ["CONFIRMED", "CANCELLED", "RESCHEDULED"],
  CONFIRMED: ["CHECKED_IN", "CANCELLED", "NO_SHOW", "RESCHEDULED"],
  CHECKED_IN: ["COMPLETED", "NO_SHOW", "CANCELLED"],
  COMPLETED: [],
  CANCELLED: ["PENDING"],
  NO_SHOW: ["PENDING"],
  RESCHEDULED: ["CONFIRMED", "CANCELLED"],
};

function DetailModal({ id, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/admin/appointments/${id}`)
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl p-8" onClick={(e) => e.stopPropagation()}>
          <Spinner className="h-8 w-8 text-leaf-700" />
        </div>
      </div>
    );

  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-display text-xl font-bold text-leaf-900">{data.appointmentNo}</h3>
            <p className="text-xs text-stone-500">
              {fmtDate(data.date)} · {fmtTime(data.startTime)} · {data.doctor.name}
            </p>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-stone-200 p-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Patient</h4>
              <div className="text-sm font-semibold text-stone-800">{data.patient.name}</div>
              <div className="text-sm text-stone-500">{data.patient.phone}</div>
              {data.patient.email && <div className="text-sm text-stone-500">{data.patient.email}</div>}
              <div className="text-sm text-stone-500">
                {[data.patient.age && `${data.patient.age} yrs`, data.patient.gender, data.patient.city].filter(Boolean).join(" · ") || "—"}
              </div>
            </div>
            <div className="rounded-xl border border-stone-200 p-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Appointment</h4>
              <div className="text-sm font-semibold text-stone-800">{data.service.name}</div>
              <div className="text-sm text-stone-500">{data.service.category?.name}</div>
              <div className="mt-1"><StatusBadge status={data.status} /></div>
              {data.notes && <div className="mt-2 text-sm text-stone-500">Notes: {data.notes}</div>}
            </div>
          </div>

          {data.responses?.length > 0 && (
            <div className="rounded-xl border border-stone-200 p-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">
                Questionnaire Responses <span className="text-red-500">· Private</span>
              </h4>
              <div className="divide-y divide-stone-100">
                {data.responses.map((r) =>
                  r.answers.map((a) => (
                    <div key={a.id} className="py-2.5 grid sm:grid-cols-2 gap-1">
                      <span className="text-sm text-stone-500">{a.question.label}</span>
                      <span className="text-sm font-medium text-stone-800">{a.value}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Appointments() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ date: "", doctorId: "", serviceId: "", status: "", q: "" });
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [detailId, setDetailId] = useState(null);
  const [acting, setActing] = useState(null);
  const [actionError, setActionError] = useState("");

  const load = useCallback(async (f) => {
    setLoading(true);
    setError("");
    const qs = new URLSearchParams();
    Object.entries(f).forEach(([k, v]) => v && qs.set(k, v));
    try {
      const data = await api.get(`/admin/appointments?${qs}`);
      setRows(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => load(filters), filters.q ? 300 : 0);
    return () => clearTimeout(t);
  }, [filters, load]);

  useEffect(() => {
    api.get("/admin/doctors").then(setDoctors).catch(() => {});
    api.get("/admin/questionnaires/services").then(setServices).catch(() => {});
  }, []);

  const setFilter = (k) => (e) => setFilters((f) => ({ ...f, [k]: e.target.value }));

  const changeStatus = async (id, status, note) => {
    setActing(id);
    setActionError("");
    try {
      await api.patch(`/admin/appointments/${id}/status`, { status, note });
      await load(filters);
    } catch (e) {
      setActionError(e.message);
    } finally {
      setActing(null);
    }
  };

  const today = new Date().toISOString().slice(0, 10);
  const appointmentsToday = rows.filter((r) => r.date === today);

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-leaf-900">Appointments</h1>
          <p className="text-sm text-stone-500">
            {rows.length} shown · {appointmentsToday.length} today
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setFilters({ date: today, doctorId: "", serviceId: "", status: "", q: "" });
            }}
            className="px-3 py-2 rounded-lg border border-leaf-700 text-leaf-800 text-xs font-semibold hover:bg-leaf-50"
          >
            Today
          </button>
          <button
            onClick={() => {
              setFilters({ date: "", doctorId: "", serviceId: "", status: "", q: "" });
            }}
            className="px-3 py-2 rounded-lg border border-stone-300 text-stone-600 text-xs font-semibold hover:bg-white"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <div>
          <label className="block text-xs font-semibold text-stone-500 mb-1">Search</label>
          <input className={inputCls + " w-full"} placeholder="Patient / phone / ID" value={filters.q} onChange={setFilter("q")} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-500 mb-1">Date</label>
          <input className={inputCls + " w-full"} type="date" value={filters.date} onChange={setFilter("date")} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-500 mb-1">Doctor</label>
          <select className={inputCls + " w-full"} value={filters.doctorId} onChange={setFilter("doctorId")}>
            <option value="">All doctors</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-500 mb-1">Service</label>
          <select className={inputCls + " w-full"} value={filters.serviceId} onChange={setFilter("serviceId")}>
            <option value="">All services</option>
            {services.flatMap((c) => c.services).map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
                {s.featured ? " ★" : ""}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-500 mb-1">Status</label>
          <select className={inputCls + " w-full"} value={filters.status} onChange={setFilter("status")}>
            <option value="">All statuses</option>
            {STATUS_FLOW.map((s) => (
              <option key={s} value={s}>{s.replace("_", " ")}</option>
            ))}
          </select>
        </div>
      </div>

      {actionError && (
        <div className="mt-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{actionError}</div>
      )}
      {error && (
        <div className="mt-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</div>
      )}

      <div className="mt-5 bg-white rounded-xl border border-stone-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-20"><Spinner className="h-8 w-8 text-leaf-700" /></div>
        ) : rows.length === 0 ? (
          <div className="py-20 text-center text-sm text-stone-400">No appointments match your filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-left text-xs uppercase tracking-wider text-stone-400">
                  <th className="px-4 py-3 font-semibold">Appointment</th>
                  <th className="px-4 py-3 font-semibold">Patient</th>
                  <th className="px-4 py-3 font-semibold">Concern</th>
                  <th className="px-4 py-3 font-semibold">Doctor</th>
                  <th className="px-4 py-3 font-semibold">Date / Time</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {rows.map((a) => (
                  <tr key={a.id} className="hover:bg-cream-50">
                    <td className="px-4 py-3">
                      <button onClick={() => setDetailId(a.id)} className="font-mono text-xs font-semibold text-leaf-800 hover:underline">
                        {a.appointmentNo}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-stone-800">{a.patient.name}</div>
                      <div className="text-xs text-stone-400">{a.patient.phone}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-stone-700">{a.service.name}</span>
                      {a.service.featured && <span className="ml-1 text-saffron-600">★</span>}
                    </td>
                    <td className="px-4 py-3 text-stone-600">{a.doctor.name}</td>
                    <td className="px-4 py-3">
                      <div className="text-stone-700">{fmtDate(a.date)}</div>
                      <div className="text-xs text-stone-400">{fmtTime(a.startTime)}</div>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <select
                          value=""
                          onChange={(e) => e.target.value && changeStatus(a.id, e.target.value)}
                          disabled={acting === a.id}
                          className="rounded-md border border-stone-300 text-xs px-2 py-1.5 bg-white"
                        >
                          <option value="">Set status…</option>
                          {(QUICK_TRANSITIONS[a.status] || []).map((s) => (
                            <option key={s} value={s}>{s.replace("_", " ")}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => setDetailId(a.id)}
                          className="px-2.5 py-1.5 rounded-md border border-stone-300 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {detailId && <DetailModal id={detailId} onClose={() => setDetailId(null)} />}
    </div>
  );
}
