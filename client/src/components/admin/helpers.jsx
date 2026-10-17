export const STATUS_STYLES = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  CONFIRMED: "bg-emerald-100 text-emerald-800 border-emerald-200",
  RESCHEDULED: "bg-blue-100 text-blue-800 border-blue-200",
  CHECKED_IN: "bg-teal-100 text-teal-800 border-teal-200",
  COMPLETED: "bg-leaf-100 text-leaf-800 border-leaf-200",
  CANCELLED: "bg-red-100 text-red-700 border-red-200",
  NO_SHOW: "bg-stone-200 text-stone-600 border-stone-300",
};

export const STATUS_FLOW = ["PENDING", "CONFIRMED", "CHECKED_IN", "COMPLETED", "RESCHEDULED", "CANCELLED", "NO_SHOW"];

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide whitespace-nowrap ${
        STATUS_STYLES[status] || STATUS_STYLES.PENDING
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

export function fmtTime(t) {
  if (!t) return "—";
  const [h, m] = t.split(":").map(Number);
  return new Date(2026, 0, 1, h, m).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function fmtDate(d) {
  if (!d) return "—";
  return new Date(d + "T00:00:00").toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
