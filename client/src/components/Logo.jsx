export default function Logo({ light = false, small = false }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`rounded-full bg-leaf-900 flex items-center justify-center shrink-0 ${
          small ? "h-9 w-9" : "h-11 w-11"
        }`}
      >
        <svg viewBox="0 0 64 64" className={small ? "h-6 w-6" : "h-7 w-7"}>
          <circle cx="32" cy="32" r="30" fill="#1B4332" />
          <path d="M32 12c-8 8-12 16-10 22 2 6 8 8 10 8 0-14 2-24 0-30z" fill="#D4A746" />
          <path d="M32 42c6-2 10-6 12-11 2-6 0-12-4-16-4 6-9 18-8 27z" fill="#74A57F" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className={`font-display font-700 tracking-wide ${small ? "text-lg" : "text-xl"} ${light ? "text-cream-50" : "text-leaf-900"}`}>
          IR VEDA
        </div>
        <div className={`text-[10px] uppercase tracking-[0.28em] ${light ? "text-saffron-300" : "text-saffron-600"}`}>
          Ayurvedic Hospital
        </div>
      </div>
    </div>
  );
}
