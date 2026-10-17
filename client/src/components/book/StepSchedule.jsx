import { useEffect, useState } from "react";
import { api } from "../../api.js";
import Spinner from "../Spinner.jsx";

const inputCls =
  "w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-600/40 focus:border-leaf-600 transition";

export default function StepSchedule({
  service,
  doctors,
  selectedDoctor,
  setSelectedDoctor,
  date,
  setDate,
  slots,
  setSlots,
  time,
  setTime,
}) {
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (!selectedDoctor || !date) {
      setSlots([]);
      return;
    }
    setLoadingSlots(true);
    setSlotError("");
    setTime("");
    api
      .get(`/schedules/${selectedDoctor.id}/slots?date=${date}`)
      .then((d) => setSlots(d.slots))
      .catch(() => {
        setSlots([]);
        setSlotError("Could not load slots. Please try another date.");
      })
      .finally(() => setLoadingSlots(false));
  }, [selectedDoctor, date, setSlots, setTime]);

  const selectDoctor = (doc) => {
    setSelectedDoctor(doc);
    setTime("");
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-leaf-900">Select Date & Time</h2>
      <p className="mt-1 text-sm text-stone-500">
        Choose a physician and an available slot. Only open slots are shown.
      </p>

      <div className="mt-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-700 mb-3">1. Choose Doctor</h3>
        {doctors.length === 0 ? (
          <p className="text-sm text-stone-500">No doctors available right now.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {doctors.map((doc) => {
              const active = selectedDoctor?.id === doc.id;
              return (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => selectDoctor(doc)}
                  className={`text-left rounded-xl border-2 p-4 transition-all ${
                    active
                      ? "border-leaf-700 bg-leaf-50 ring-4 ring-leaf-100"
                      : "border-stone-200 hover:border-leaf-400 hover:bg-leaf-50/40"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-leaf-800 text-cream-50 flex items-center justify-center font-semibold text-sm shrink-0">
                      {doc.name.replace("Dr. ", "").charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-leaf-900 text-sm truncate">{doc.name}</div>
                      <div className="text-xs text-stone-500">{doc.specialization}</div>
                      <div className="text-[11px] text-stone-400 mt-0.5">{doc.qualification}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-7">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-700 mb-3">2. Choose Date</h3>
        <input
          className={inputCls + " max-w-xs"}
          type="date"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={!selectedDoctor}
        />
      </div>

      <div className="mt-7">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-700 mb-3">3. Choose Time</h3>
        {!selectedDoctor || !date ? (
          <p className="text-sm text-stone-400">Select a doctor and date to see available slots.</p>
        ) : loadingSlots ? (
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <Spinner className="h-4 w-4" /> Loading available slots…
          </div>
        ) : slotError ? (
          <p className="text-sm text-red-600">{slotError}</p>
        ) : slots.length === 0 ? (
          <p className="text-sm text-stone-500">
            No slots available for <span className="font-semibold">{selectedDoctor.name}</span> on{" "}
            <span className="font-semibold">{date}</span>. Please try another date.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {slots.map((slot) => {
              const [h, m] = slot.split(":").map(Number);
              const display = new Date(2026, 0, 1, h, m).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              });
              const active = time === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                    active
                      ? "bg-leaf-800 text-white border-leaf-800 ring-2 ring-leaf-200"
                      : "bg-white border-stone-300 text-stone-700 hover:border-leaf-600 hover:text-leaf-800"
                  }`}
                >
                  {display}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
