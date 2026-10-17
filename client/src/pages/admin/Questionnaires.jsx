import { useEffect, useState, useCallback } from "react";
import { api } from "../../api.js";
import Spinner from "../../components/Spinner.jsx";
import { useOutletContext } from "react-router-dom";

const inputCls =
  "w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-600/40 focus:border-leaf-600 transition";

const TYPES = ["TEXT", "NUMBER", "DATE", "YES_NO", "SINGLE", "MULTIPLE", "DROPDOWN"];

function QuestionEditor({ questionnaire, question, onClose, onSaved }) {
  const isEdit = !!question;
  const [form, setForm] = useState(
    question || { label: "", questionType: "TEXT", required: false, displayOrder: 0, options: "" }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const needsOptions = ["SINGLE", "MULTIPLE", "DROPDOWN"].includes(form.questionType);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setBool = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.checked }));

  const save = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.label.trim()) {
      setError("Question label is required.");
      return;
    }
    setSaving(true);
    const payload = {
      label: form.label,
      questionType: form.questionType,
      required: form.required,
      displayOrder: Number(form.displayOrder) || 0,
      options: needsOptions
        ? form.options
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
        : null,
    };
    try {
      if (isEdit) await api.patch(`/admin/questionnaires/questions/${question.id}`, payload);
      else await api.post(`/admin/questionnaires/${questionnaire.id}/questions`, payload);
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
        <h3 className="font-display text-xl font-bold text-leaf-900">
          {isEdit ? "Edit Question" : "Add Question"} — {questionnaire.title}
        </h3>
        <div className="mt-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Label *</label>
            <input className={inputCls} value={form.label} onChange={set("label")} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">Type</label>
              <select className={inputCls} value={form.questionType} onChange={set("questionType")}>
                {TYPES.map((t) => (
                  <option key={t} value={t}>{t.replace("_", " ")}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">Display order</label>
              <input className={inputCls} type="number" value={form.displayOrder} onChange={set("displayOrder")} />
            </div>
          </div>
          {needsOptions && (
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">Options (one per line)</label>
              <textarea
                className={inputCls + " min-h-[96px]"}
                value={form.options}
                onChange={set("options")}
                placeholder={"Mild\nModerate\nSevere"}
              />
            </div>
          )}
          <label className="flex items-center gap-3 text-sm text-stone-700">
            <input type="checkbox" checked={form.required} onChange={setBool("required")} className="h-4 w-4 accent-leaf-700" />
            Required
          </label>
        </div>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-semibold text-stone-500 hover:bg-stone-100">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="px-5 py-2 rounded-lg bg-leaf-800 text-white text-sm font-semibold hover:bg-leaf-900 disabled:opacity-60">
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Questionnaires() {
  const { isAdmin } = useOutletContext();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null); // {questionnaire, question?}

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setRows(await api.get("/admin/questionnaires"));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const removeQuestion = async (qid) => {
    if (!window.confirm("Delete this question?")) return;
    await api.del(`/admin/questionnaires/questions/${qid}`);
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-leaf-900">Questionnaires</h1>
          <p className="text-sm text-stone-500">
            Pre-consultation questionnaires by service. Questions are private and shown only to authorized staff.
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</div>
      )}

      <div className="mt-5 space-y-4">
        {loading ? (
          <div className="flex justify-center py-20"><Spinner className="h-8 w-8 text-leaf-700" /></div>
        ) : (
          rows.map((q) => (
            <div key={q.id} className="bg-white rounded-xl border border-stone-200 p-5">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-semibold text-leaf-900">{q.title}</h2>
                    <span className="text-[11px] font-semibold uppercase bg-cream-100 text-saffron-700 rounded-full px-2 py-0.5">
                      {q.service ? q.service.name : "General"}
                    </span>
                    {!q.active && (
                      <span className="text-[11px] font-bold uppercase bg-stone-200 text-stone-600 rounded-full px-2 py-0.5">Inactive</span>
                    )}
                  </div>
                  {q.description && <p className="text-xs text-stone-500 mt-1">{q.description}</p>}
                  <p className="text-xs text-stone-400 mt-0.5">{q.questions.length} questions · {q._count.responses} responses</p>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => setEditing({ questionnaire: q })}
                    className="px-3 py-1.5 rounded-lg border border-leaf-700 text-leaf-800 text-xs font-semibold hover:bg-leaf-50"
                  >
                    + Add Question
                  </button>
                )}
              </div>

              <div className="mt-4 space-y-2">
                {q.questions.length === 0 && <p className="text-sm text-stone-400">No questions yet.</p>}
                {q.questions.map((question) => (
                  <div key={question.id} className="flex items-center justify-between gap-3 border border-stone-100 rounded-lg px-4 py-2.5">
                    <div className="min-w-0">
                      <div className="text-sm text-stone-800">
                        <span className="text-stone-400 font-mono text-xs mr-2">#{question.displayOrder}</span>
                        {question.label}
                        {question.required && <span className="text-red-500 ml-1">*</span>}
                      </div>
                      <div className="text-[11px] text-stone-400 uppercase tracking-wide">
                        {question.questionType.replace("_", " ")}
                        {["SINGLE", "MULTIPLE", "DROPDOWN"].includes(question.questionType) &&
                          question.options &&
                          ` · ${JSON.parse(question.options).join(", ")}`}
                      </div>
                    </div>
                    {isAdmin && (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => setEditing({ questionnaire: q, question })}
                          className="px-2.5 py-1 rounded-md border border-stone-300 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => removeQuestion(question.id)}
                          className="px-2.5 py-1 rounded-md border border-red-200 text-xs font-semibold text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {editing && (
        <QuestionEditor
          questionnaire={editing.questionnaire}
          question={editing.question}
          onClose={() => setEditing(null)}
          onSaved={load}
        />
      )}
    </div>
  );
}
