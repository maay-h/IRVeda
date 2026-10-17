const inputCls =
  "w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-600/40 focus:border-leaf-600 transition";

function TextAnswer({ q, value, setValue }) {
  return (
    <textarea
      className={`${inputCls} min-h-[84px] resize-y`}
      placeholder={q.required ? "Required" : "Optional"}
      value={value || ""}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

function ChoiceAnswers({ q, value, setValue, multiple }) {
  const options = JSON.parse(q.options || "[]");
  if (multiple) {
    const arr = Array.isArray(value) ? value : [];
    const toggle = (opt) =>
      setValue(arr.includes(opt) ? arr.filter((o) => o !== opt) : [...arr, opt]);
    return (
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              arr.includes(opt)
                ? "bg-leaf-800 text-white border-leaf-800"
                : "bg-white border-stone-300 text-stone-600 hover:border-leaf-500"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label
          key={opt}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${
            value === opt
              ? "border-leaf-700 bg-leaf-50 ring-1 ring-leaf-700"
              : "border-stone-200 hover:border-leaf-400"
          }`}
        >
          <input
            type="radio"
            name={`q-${q.id}`}
            checked={value === opt}
            onChange={() => setValue(opt)}
            className="accent-leaf-700 h-4 w-4"
          />
          <span className="text-sm font-medium text-stone-700">{opt}</span>
        </label>
      ))}
    </div>
  );
}

export default function StepQuestionnaire({ questionnaire, service, answers, setAnswers }) {
  if (!questionnaire) {
    return (
      <div>
        <h2 className="font-display text-2xl font-bold text-leaf-900">Health Questionnaire</h2>
        <p className="mt-3 text-sm text-stone-500">
          No additional questions for this service. Continue to schedule your appointment.
        </p>
      </div>
    );
  }

  const questions = questionnaire.questions || [];
  const setValue = (qid) => (value) => setAnswers((a) => ({ ...a, [qid]: value }));

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-leaf-900">Health Questionnaire</h2>
      <p className="mt-1 text-sm text-stone-500">
        <span className="font-semibold text-leaf-800">{questionnaire.title}</span> — for{" "}
        <span className="font-semibold">{service?.name}</span>. Your answers are private and only
        shared with our physicians.
      </p>

      {questions.length === 0 ? (
        <p className="mt-6 text-sm text-stone-500">No questions for this service. Continue when ready.</p>
      ) : (
        <div className="mt-6 space-y-6">
          {questions.map((q, i) => {
            const value = answers[q.id];
            return (
              <div key={q.id} className="border border-stone-200 rounded-xl p-5">
                <div className="flex items-start gap-2 mb-3">
                  <span className="text-xs font-bold text-saffron-600 mt-0.5">{i + 1}.</span>
                  <label className="text-sm font-semibold text-stone-800">
                    {q.label} {q.required && <span className="text-red-500">*</span>}
                  </label>
                </div>

                {q.questionType === "TEXT" && <TextAnswer q={q} value={value} setValue={setValue(q.id)} />}

                {q.questionType === "NUMBER" && (
                  <input
                    className={inputCls}
                    type="number"
                    value={value || ""}
                    onChange={(e) => setValue(q.id)(e.target.value)}
                  />
                )}

                {q.questionType === "DATE" && (
                  <input
                    className={inputCls}
                    type="date"
                    value={value || ""}
                    onChange={(e) => setValue(q.id)(e.target.value)}
                  />
                )}

                {q.questionType === "YES_NO" && (
                  <ChoiceAnswers
                    q={{ ...q, options: JSON.stringify(["Yes", "No"]) }}
                    value={value}
                    setValue={setValue(q.id)}
                    multiple={false}
                  />
                )}

                {["SINGLE", "DROPDOWN"].includes(q.questionType) && (
                  <ChoiceAnswers q={q} value={value} setValue={setValue(q.id)} multiple={false} />
                )}

                {q.questionType === "MULTIPLE" && (
                  <ChoiceAnswers q={q} value={value} setValue={setValue(q.id)} multiple />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
