import { useEffect, useState, useCallback } from "react";
import { api } from "../../api.js";
import Spinner from "../../components/Spinner.jsx";

const inputCls =
  "w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-600/40 focus:border-leaf-600 transition";

const ROLES = ["SUPER_ADMIN", "ADMIN", "DOCTOR"];

export default function StaffPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "DOCTOR" });
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setRows(await api.get("/admin/staff"));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const add = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await api.post("/admin/staff", form);
      setForm({ name: "", email: "", password: "", role: "DOCTOR" });
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (staff) => {
    await api.patch(`/admin/staff/${staff.id}`, { active: !staff.active });
    await load();
  };

  const changeRole = async (staff, role) => {
    await api.patch(`/admin/staff/${staff.id}`, { role });
    await load();
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-leaf-900">Staff Management</h1>
      <p className="text-sm text-stone-500">Create and manage staff accounts with role-based access.</p>

      <div className="mt-5 grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-20"><Spinner className="h-8 w-8 text-leaf-700" /></div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-left text-xs uppercase tracking-wider text-stone-400">
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {rows.map((s) => (
                  <tr key={s.id} className="hover:bg-cream-50">
                    <td className="px-4 py-3 font-medium text-stone-800">{s.name}</td>
                    <td className="px-4 py-3 text-stone-500">{s.email}</td>
                    <td className="px-4 py-3">
                      <select
                        value={s.role}
                        onChange={(e) => changeRole(s, e.target.value)}
                        className="rounded-md border border-stone-300 text-xs px-2 py-1 bg-white"
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>{r.replace("_", " ")}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase ${
                          s.active ? "bg-emerald-100 text-emerald-700" : "bg-stone-200 text-stone-500"
                        }`}
                      >
                        {s.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => toggleActive(s)}
                        className="px-2.5 py-1 rounded-md border border-stone-300 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                      >
                        {s.active ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <form onSubmit={add} className="bg-white rounded-xl border border-stone-200 p-5 h-fit">
          <h2 className="font-semibold text-leaf-900">Add Staff Member</h2>
          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">Name</label>
              <input className={inputCls} value={form.name} onChange={set("name")} required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">Email</label>
              <input className={inputCls} type="email" value={form.email} onChange={set("email")} required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">Password</label>
              <input className={inputCls} type="password" value={form.password} onChange={set("password")} required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">Role</label>
              <select className={inputCls} value={form.role} onChange={set("role")}>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r.replace("_", " ")}</option>
                ))}
              </select>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={saving}
              className="w-full py-2 rounded-lg bg-leaf-800 text-white text-sm font-semibold hover:bg-leaf-900 disabled:opacity-60"
            >
              {saving ? "Creating…" : "Create Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
