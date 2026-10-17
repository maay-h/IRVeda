export default function StepConcern({ services, selected, onSelect }) {
  const featured = services.flatMap((c) => c.services).filter((s) => s.featured);
  const others = services.filter((c) => !c.services.some((s) => s.featured));

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-leaf-900">What would you like consultation for?</h2>
      <p className="mt-1 text-sm text-stone-500">Choose the concern that best matches your visit.</p>

      {featured.length > 0 && (
        <button
          type="button"
          onClick={() => onSelect(featured[0])}
          className={`mt-6 w-full text-left rounded-2xl overflow-hidden border-2 transition-all group ${
            selected?.id === featured[0].id
              ? "border-saffron-500 ring-4 ring-saffron-200"
              : "border-saffron-300 hover:border-saffron-500 hover:shadow-md"
          }`}
        >
          <div className="relative bg-gradient-to-br from-leaf-900 via-leaf-800 to-leaf-950 px-6 py-8 sm:px-10">
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #d4a746 0%, transparent 40%)" }} />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-saffron-500/20 border border-saffron-400/40 px-3 py-1 text-xs font-semibold text-saffron-200 uppercase tracking-wider mb-3">
                  ★ Featured
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-cream-50">{featured[0].name}</h3>
                {featured[0].tagline && (
                  <p className="mt-1 text-saffron-200 text-sm sm:text-base font-medium">{featured[0].tagline}</p>
                )}
                <p className="mt-3 text-cream-100/80 text-sm max-w-xl leading-relaxed">{featured[0].description}</p>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-saffron-500 text-leaf-950 font-bold text-sm shadow-md">
                  Book Consultation
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </button>
      )}

      <div className="mt-10 space-y-8">
        {others.map((category) => (
          <div key={category.id}>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-700">{category.name}</h3>
            <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {category.services.map((service) => {
                const isSelected = selected?.id === service.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => onSelect(service)}
                    className={`text-left rounded-xl border-2 p-4 transition-all ${
                      isSelected
                        ? "border-leaf-700 bg-leaf-50 ring-4 ring-leaf-100"
                        : "border-stone-200 hover:border-leaf-400 hover:bg-leaf-50/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-2xl">{service.icon || "🩺"}</div>
                      {isSelected && (
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-leaf-700">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="mt-2 font-semibold text-leaf-900 text-sm">{service.name}</div>
                    {service.tagline && <div className="mt-0.5 text-xs text-stone-500">{service.tagline}</div>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
