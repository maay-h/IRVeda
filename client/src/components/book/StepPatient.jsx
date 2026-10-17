const inputCls =
  "w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-600/40 focus:border-leaf-600 transition";

export default function StepPatient({ patient, setPatient }) {
  const set = (key) => (e) => setPatient((p) => ({ ...p, [key]: e.target.value }));

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-leaf-900">Your Details</h2>
      <p className="mt-1 text-sm text-stone-500">
        Basic details to reach you for confirmation. Health questions come next.
      </p>

      <div className="mt-6 grid sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-stone-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input className={inputCls} value={patient.name} onChange={set("name")} placeholder="e.g. John Doe" autoFocus />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input className={inputCls} value={patient.phone} onChange={set("phone")} placeholder="e.g. +91 98765 43210" inputMode="tel" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-1.5">Email</label>
          <input className={inputCls} value={patient.email} onChange={set("email")} placeholder="you@example.com" type="email" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-1.5">Age</label>
          <input className={inputCls} value={patient.age} onChange={set("age")} placeholder="e.g. 34" inputMode="numeric" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-1.5">Gender</label>
          <select className={inputCls} value={patient.gender} onChange={set("gender")}>
            <option value="">Select…</option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-stone-700 mb-1.5">City</label>
          <input className={inputCls} value={patient.city} onChange={set("city")} placeholder="e.g. Bengaluru" />
        </div>
      </div>
    </div>
  );
}
