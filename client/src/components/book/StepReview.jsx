function fmtTime(t) {
  const [h, m] = t.split(":").map(Number);
  return new Date(2026, 0, 1, h, m).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function fmtDate(d) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-stone-100 last:border-0">
      <span className="text-sm text-stone-500">{label}</span>
      <span className="text-sm font-semibold text-stone-800 text-right">{value || "—"}</span>
    </div>
  );
}

export default function StepReview({ service, patient, doctor, date, time, questionnaire }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-leaf-900">Review Your Appointment</h2>
      <p className="mt-1 text-sm text-stone-500">Please confirm everything is correct before submitting.</p>

      <div className="mt-6 grid sm:grid-cols-2 gap-6">
        <div className="rounded-xl border border-stone-200 p-5">
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-leaf-700 mb-2">Appointment</h3>
          <div className="divide-y divide-stone-100">
            <Row label="Concern" value={service?.name} />
            <Row label="Doctor" value={doctor?.name} />
            <Row label="Date" value={date ? fmtDate(date) : null} />
            <Row label="Time" value={time ? fmtTime(time) : null} />
          </div>
        </div>

        <div className="rounded-xl border border-stone-200 p-5">
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-leaf-700 mb-2">Patient</h3>
          <div className="divide-y divide-stone-100">
            <Row label="Name" value={patient.name} />
            <Row label="Phone" value={patient.phone} />
            <Row label="Email" value={patient.email} />
            <Row label="Age" value={patient.age} />
            <Row label="Gender" value={patient.gender} />
            <Row label="City" value={patient.city} />
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-leaf-50 border border-leaf-100 p-4 text-sm text-leaf-900">
        <span className="font-semibold">Pre-questionnaire:</span>{" "}
        {questionnaire ? `${questionnaire.title} — completed` : "No questionnaire required"}
      </div>

      <p className="mt-4 text-xs text-stone-400">
        By submitting, you agree that IR Veda Ayurvedic Hospital may contact you at the number provided
        to confirm your appointment.
      </p>
    </div>
  );
}
