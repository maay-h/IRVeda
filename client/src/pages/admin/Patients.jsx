import { useEffect, useState, useCallback } from "react";
import { api } from "../../api.js";
import { StatusBadge, fmtTime, fmtDate } from "../../components/admin/helpers.jsx";
import Spinner from "../../components/Spinner.jsx";

const inputCls =
  "rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-600/40 focus:border-leaf-600 transition";

function PatientModal({ id, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/admin/patients/${id}`)
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
            <h3 className="font-display text-xl font-bold text-leaf-900">{data.name}</h3>
            <p className="text-xs text-stone-500">Patient #{data.id} · Registered {fmtDate(data.createdAt.slice(0, 10))}</p>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {[
              ["Phone", data.phone],
              ["Email", data.email || "—"],
              ["Age", data.age || "—"],
              ["City", data.city || "—"],
            ].map(([l, v]) => (
              <div key={l} className="rounded-lg border border-stone-200 p-3">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">{l}</div>
                <div className="mt-1 text-sm font-semibold text-stone-800 truncate" title={v}>{v}</div>
              </div>
            ))}
          </div>

          <h4 className="mt-6 text-xs font-bold uppercase tracking-widest text-stone-400">Appointment History</h4>
          <div className="mt-3 space-y-3">
            {data.appointments.length === 0 && (
              <p className="text-sm text-stone-400">No appointments yet.</p>
            )}
            {data.appointments.map((a) => (
              <div key={a.id} className="border border-stone-100 rounded-lg p-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="text-sm font-semibold text-stone-800">
                    {fmtDate(a.date)} · {fmtTime(a.startTime)} — {a.service.name}
                  </div>
                  <StatusBadge status={a.status} />
                </div>
                <div className="mt-1 text-xs text-stone-500">{a.doctor.name} · {a.appointmentNo}</div>
                {a.responses?.length > 0 && (
                  <details className="mt-2">
                    <summary className="text-xs font-semibold text-leaf-800 cursor-pointer">
                      View questionnaire responses
                    </summary>
                    <div className="mt-2 space-y-1.5">
                      {a.responses.map((r) =>
                        r.answers.map((ans) => (
                          <div key={ans.id} className="grid sm:grid-cols-2 gap-1 text-xs">
                            <span className="text-stone-500">{ans.question.label}</span>
                            <span className="font-medium text-stone-800">{ans.value}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </details>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Patients() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [detailId, setDetailId] = useState(null);

  const load = useCallback(async (query) => {
    setLoading(true);
    setError("");
    try {
      const data = await api.get(`/admin/patients${query ? `?q=${encodeURIComponent(query)}` : ""}`);
      setRows(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => load(q), q ? 300 : 0);
    return () => clearTimeout(t);
  }, [q, load]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-leaf-900">Patients</h1>
      <p className="text-sm text-stone-500">{rows.length} registered patients</p>

      <div className="mt-5 max-w-sm">
        <input
          className={inputCls + " w-full"}
          placeholder="Search by name or phone…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</div>
      )}

      <div className="mt-5 bg-white rounded-xl border border-stone-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-20"><Spinner className="h-8 w-8 text-leaf-700" /></div>
        ) : rows.length === 0 ? (
          <div className="py-20 text-center text-sm text-stone-400">No patients found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-left text-xs uppercase tracking-wider text-stone-400">
                  <th className="px-4 py-3 font-semibold">Patient</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Details</th>
                  <th className="px-4 py-3 font-semibold">Appointments</th>
                  <th className="px-4 py-3 font-semibold">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {rows.map((p) => (
                  <tr key={p.id} className="hover:bg-cream-50 cursor-pointer" onClick={() => setDetailId(p.id)}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-leaf-900 hover:underline">{p.name}</div>
                      <div className="text-xs text-stone-400">#{p.id}</div>
                    </td>
                    <td className="px-4 py-3 text-stone-600">
                      <div>{p.phone}</div>
                      {p.email && <div className="text-xs text-stone-400">{p.email}</div>}
                    </td>
                    <td className="px-4 py-3 text-stone-600">
                      {[p.age && `${p.age} yrs`, p.gender, p.city].filter(Boolean).join(" · ") || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full bg-leaf-100 text-leaf-800 px-2.5 py-0.5 text-xs font-bold">
                        {p._count.appointments}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-stone-500">{fmtDate(p.createdAt.slice(0, 10))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {detailId && <PatientModal id={detailId} onClose={() => setDetailId(null)} />}
    </div>
  );
}
