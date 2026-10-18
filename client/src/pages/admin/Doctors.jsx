import { useEffect, useState, useCallback } from "react";
import { api } from "../../api.js";
import { DAYS, fmtDate } from "../../components/admin/helpers.jsx";
import Spinner from "../../components/Spinner.jsx";
import { useOutletContext } from "react-router-dom";

const inputCls =
  "w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-600/40 focus:border-leaf-600 transition";

function DoctorModal({ doctor, onClose, onSaved }) {
  const isEdit = !!doctor;
  const [form, setForm] = useState(
    doctor || { name: "", qualification: "", specialization: "", bio: "", photoUrl: "" }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.qualification || !form.specialization) {
      setError("Name, qualification and specialization are required.");
      return;
    }
    setSaving(true);
    try {
      if (isEdit) await api.patch(`/admin/doctors/${doctor.id}`, form);
      else await api.post("/admin/doctors", form);
      onSaved();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <form
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
        onSubmit={save}
      >
        <h3 className="font-display text-xl font-bold text-leaf-900">{isEdit ? "Edit Doctor" : "Add Doctor"}</h3>
        <div className="mt-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Name *</label>
            <input className={inputCls} value={form.name} onChange={set("name")} placeholder="Dr. Name" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Qualification *</label>
            <input className={inputCls} value={form.qualification} onChange={set("qualification")} placeholder="BAMS, MD (Ayurveda)" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Specialization *</label>
            <input className={inputCls} value={form.specialization} onChange={set("specialization")} placeholder="e.g. Women's Health" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Bio</label>
            <textarea className={inputCls + " min-h-[72px]"} value={form.bio || ""} onChange={set("bio")} />
          </div>
        </div>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-semibold text-stone-500 hover:bg-stone-100">
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-leaf-800 text-white text-sm font-semibold hover:bg-leaf-900 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

function ScheduleEditor({ doctor, onClose }) {
  const [schedules, setSchedules] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSchedules(
      DAYS.map((name, day) => {
        const existing = (doctor.schedules || []).filter((s) => s.dayOfWeek === day);
        return {
          day,
          enabled: existing.length > 0,
          sessions: existing.map((s) => ({ startTime: s.startTime, endTime: s.endTime })),
        };
      })
    );
  }, [doctor]);

  const toggleDay = (idx) => {
    setSchedules((prev) => {
      const next = [...prev];
      next[idx] = {
        ...next[idx],
        enabled: !next[idx].enabled,
        sessions: !next[idx].enabled ? [{ startTime: "09:00", endTime: "13:00" }] : [],
      };
      return next;
    });
  };

  const addSession = (idx) => {
    setSchedules((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], sessions: [...next[idx].sessions, { startTime: "14:00", endTime: "18:00" }] };
      return next;
    });
  };

  const setSession = (idx, sIdx, key, value) => {
    setSchedules((prev) => {
      const next = [...prev];
      next[idx].sessions[sIdx] = { ...next[idx].sessions[sIdx], [key]: value };
      return next;
    });
  };

  const removeSession = (idx, sIdx) => {
    setSchedules((prev) => {
      const next = [...prev];
      next[idx].sessions = next[idx].sessions.filter((_, i) => i !== sIdx);
      return next;
    });
  };

  const save = async () => {
    setSaving(true);
    setError("");
    const payload = schedules
      .filter((s) => s.enabled)
      .flatMap((s) =>
        s.sessions.map((ses) => ({
          dayOfWeek: s.day,
          startTime: ses.startTime,
          endTime: ses.endTime,
        }))
      );
    try {
      await api.put(`/admin/doctors/${doctor.id}/schedules`, { schedules: payload });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-xl font-bold text-leaf-900">Weekly Schedule — {doctor.name}</h3>
        <p className="text-sm text-stone-500 mt-1">Sessions produce 30-minute appointment slots automatically.</p>

        <div className="mt-5 space-y-3">
          {schedules.map((s, idx) => (
            <div key={s.day} className="border border-stone-200 rounded-xl p-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={s.enabled}
                  onChange={() => toggleDay(idx)}
                  className="h-4 w-4 accent-leaf-700"
                />
                <span className="text-sm font-semibold text-stone-800">{DAYS[s.day]}</span>
              </label>
              {s.enabled && (
                <div className="mt-3 space-y-2">
                  {s.sessions.map((ses, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2">
                      <input
                        type="time"
                        className={inputCls + " w-32"}
                        value={ses.startTime}
                        onChange={(e) => setSession(idx, sIdx, "startTime", e.target.value)}
                      />
                      <span className="text-stone-400">to</span>
                      <input
                        type="time"
                        className={inputCls + " w-32"}
                        value={ses.endTime}
                        onChange={(e) => setSession(idx, sIdx, "endTime", e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => removeSession(idx, sIdx)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Remove session"
                      >
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addSession(idx)}
                    className="text-xs font-semibold text-leaf-800 hover:text-leaf-900"
                  >
                    + Add session
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-semibold text-stone-500 hover:bg-stone-100">
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-leaf-800 text-white text-sm font-semibold hover:bg-leaf-900 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteDoctorModal({ doctor, onClose, onDeleted }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const remove = async () => {
    setDeleting(true);
    setError("");
    try {
      await api.del(`/admin/doctors/${doctor.id}`);
      onDeleted();
      onClose();
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-xl font-bold text-leaf-900">Delete {doctor.name}?</h3>
        <p className="mt-3 text-sm text-stone-500">
          This permanently removes the doctor along with their weekly schedule and exceptions.
          {doctor._count?.appointments > 0
            ? ` This doctor has ${doctor._count.appointments} appointment(s) and cannot be deleted — use Deactivate instead.`
            : " This cannot be undone."}
        </p>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-stone-500 hover:bg-stone-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={remove}
            disabled={deleting}
            className="px-5 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-60"
          >
            {deleting ? "Deleting…" : "Delete Doctor"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ExceptionsModal({ doctor, onClose }) {
  const [exceptions, setExceptions] = useState(doctor.exceptions || []);
  const [form, setForm] = useState({ date: "", reason: "", allDay: true, fromTime: "09:00", toTime: "13:00" });
  const [error, setError] = useState("");

  const add = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.date) {
      setError("Date is required.");
      return;
    }
    try {
      await api.post(`/admin/doctors/${doctor.id}/exceptions`, form);
      const fresh = await api.get("/admin/doctors");
      const d = fresh.find((x) => x.id === doctor.id);
      setExceptions(d?.exceptions || []);
      setForm({ date: "", reason: "", allDay: true, fromTime: "09:00", toTime: "13:00" });
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (id) => {
    try {
      await api.del(`/admin/doctors/${doctor.id}/exceptions/${id}`);
      setExceptions((prev) => prev.filter((x) => x.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-xl font-bold text-leaf-900">Schedule Exceptions — {doctor.name}</h3>
        <p className="text-sm text-stone-500 mt-1">Block dates or time ranges when the doctor is unavailable.</p>

        <form onSubmit={add} className="mt-5 space-y-3">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Date *</label>
            <input
              type="date"
              className={inputCls}
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Reason</label>
            <input
              className={inputCls}
              value={form.reason}
              onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
              placeholder="e.g. Leave, conference"
            />
          </div>
          <label className="flex items-center gap-3 text-sm text-stone-700">
            <input
              type="checkbox"
              checked={form.allDay}
              onChange={(e) => setForm((f) => ({ ...f, allDay: e.target.checked }))}
              className="h-4 w-4 accent-leaf-700"
            />
            All-day unavailable
          </label>
          {!form.allDay && (
            <div className="flex items-center gap-2">
              <input type="time" className={inputCls + " w-32"} value={form.fromTime} onChange={(e) => setForm((f) => ({ ...f, fromTime: e.target.value }))} />
              <span className="text-stone-400">to</span>
              <input type="time" className={inputCls + " w-32"} value={form.toTime} onChange={(e) => setForm((f) => ({ ...f, toTime: e.target.value }))} />
            </div>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="w-full py-2 rounded-lg bg-leaf-800 text-white text-sm font-semibold hover:bg-leaf-900">
            Add Exception
          </button>
        </form>

        <div className="mt-6 space-y-2">
          {exceptions.length === 0 && <p className="text-sm text-stone-400">No exceptions.</p>}
          {exceptions.map((ex) => (
            <div key={ex.id} className="flex items-center justify-between border border-stone-200 rounded-lg px-3 py-2.5">
              <div>
                <div className="text-sm font-medium text-stone-800">{fmtDate(ex.date)}</div>
                <div className="text-xs text-stone-500">
                  {ex.allDay ? "All day" : `${ex.fromTime} – ${ex.toTime}`}
                  {ex.reason ? ` · ${ex.reason}` : ""}
                </div>
              </div>
              <button onClick={() => remove(ex.id)} className="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1">
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Doctors() {
  const { isAdmin } = useOutletContext();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);
  const [schedFor, setSchedFor] = useState(null);
  const [excFor, setExcFor] = useState(null);
  const [deleteFor, setDeleteFor] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setRows(await api.get("/admin/doctors"));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleActive = async (doctor) => {
    await api.patch(`/admin/doctors/${doctor.id}`, { active: !doctor.active });
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-leaf-900">Doctors & Schedules</h1>
          <p className="text-sm text-stone-500">Manage physicians, weekly availability and exceptions.</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setModal({})}
            className="px-4 py-2 rounded-lg bg-leaf-800 text-white text-sm font-semibold hover:bg-leaf-900"
          >
            + Add Doctor
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</div>
      )}

      <div className="mt-5 space-y-4">
        {loading ? (
          <div className="flex justify-center py-20"><Spinner className="h-8 w-8 text-leaf-700" /></div>
        ) : (
          rows.map((d) => (
            <div key={d.id} className="bg-white rounded-xl border border-stone-200 p-5">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-leaf-800 text-cream-50 flex items-center justify-center font-display text-xl font-bold">
                    {d.name.replace("Dr. ", "").charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-leaf-900">{d.name}</span>
                      {!d.active && (
                        <span className="text-[11px] font-bold uppercase bg-stone-200 text-stone-600 rounded-full px-2 py-0.5">Inactive</span>
                      )}
                    </div>
                    <div className="text-sm text-stone-500">{d.specialization}</div>
                    <div className="text-xs text-stone-400">{d.qualification} · {d._count.appointments} appointments</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <>
                      <button onClick={() => setModal(d)} className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold text-stone-600 hover:bg-stone-50">
                        Edit
                      </button>
                      <button onClick={() => toggleActive(d)} className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold text-stone-600 hover:bg-stone-50">
                        {d.active ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => setDeleteFor(d)}
                        className="px-3 py-1.5 rounded-lg border border-red-300 text-xs font-semibold text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </>
                  )}
                  <button onClick={() => setSchedFor(d)} className="px-3 py-1.5 rounded-lg border border-leaf-700 text-leaf-800 text-xs font-semibold hover:bg-leaf-50">
                    Schedule
                  </button>
                  <button onClick={() => setExcFor(d)} className="px-3 py-1.5 rounded-lg border border-leaf-700 text-leaf-800 text-xs font-semibold hover:bg-leaf-50">
                    Exceptions
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {DAYS.map((name, day) => {
                  const daySessions = (d.schedules || []).filter((s) => s.dayOfWeek === day);
                  if (daySessions.length === 0)
                    return (
                      <span key={day} className="text-[11px] font-medium text-stone-400 rounded-md bg-stone-100 px-2 py-1">
                        {name.slice(0, 3)}: OFF
                      </span>
                    );
                  return (
                    <span key={day} className="text-[11px] font-medium text-leaf-800 rounded-md bg-leaf-100 px-2 py-1">
                      {name.slice(0, 3)}: {daySessions.map((s) => `${s.startTime}–${s.endTime}`).join(", ")}
                    </span>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {modal && <DoctorModal doctor={modal.id ? modal : null} onClose={() => setModal(null)} onSaved={load} />}
      {schedFor && <ScheduleEditor doctor={schedFor} onClose={() => setSchedFor(null)} />}
      {excFor && <ExceptionsModal doctor={excFor} onClose={() => setExcFor(null)} />}
      {deleteFor && (
        <DeleteDoctorModal doctor={deleteFor} onClose={() => setDeleteFor(null)} onDeleted={load} />
      )}
    </div>
  );
}
