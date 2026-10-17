const STEPS = ["Concern", "Your Details", "Health Questionnaire", "Date & Time", "Review"];

export default function Stepper({ current }) {
  return (
    <ol className="flex items-center w-full max-w-2xl mx-auto">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <li key={label} className={`flex items-center ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-semibold border transition-all ${
                  done
                    ? "bg-leaf-700 border-leaf-700 text-white"
                    : active
                      ? "bg-saffron-500 border-saffron-500 text-leaf-950 ring-4 ring-saffron-200"
                      : "bg-white border-stone-300 text-stone-400"
                }`}
              >
                {done ? (
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  n
                )}
              </div>
              <span
                className={`text-[11px] font-medium tracking-wide whitespace-nowrap ${
                  active ? "text-leaf-800" : done ? "text-leaf-700" : "text-stone-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-2 mb-5 ${done ? "bg-leaf-700" : "bg-stone-300"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
