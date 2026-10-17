import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../api.js";
import Logo from "../../components/Logo.jsx";
import Stepper from "../../components/Stepper.jsx";
import Spinner from "../../components/Spinner.jsx";
import StepConcern from "../../components/book/StepConcern.jsx";
import StepPatient from "../../components/book/StepPatient.jsx";
import StepQuestionnaire from "../../components/book/StepQuestionnaire.jsx";
import StepSchedule from "../../components/book/StepSchedule.jsx";
import StepReview from "../../components/book/StepReview.jsx";

const TOTAL_STEPS = 5;

export default function BookingPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);

  const [selectedService, setSelectedService] = useState(null);
  const [patient, setPatient] = useState({ name: "", phone: "", email: "", age: "", gender: "", city: "" });
  const [questionnaire, setQuestionnaire] = useState(null);
  const [answers, setAnswers] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const cats = await api.get("/services");
        setServices(cats);

        const deepLink = params.get("service");
        if (deepLink) {
          for (const cat of cats) {
            const found = cat.services.find((s) => s.slug === deepLink);
            if (found) {
              setSelectedService(found);
              setStep(2);
              break;
            }
          }
        }
      } catch {
        setError("Unable to load services. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, [params]);

  const loadQuestionnaire = useCallback(async (service) => {
    try {
      const q = await api.get(`/services/${service.slug}/questionnaire`);
      setQuestionnaire(q);
      setAnswers({});
    } catch {
      setQuestionnaire(null);
    }
  }, []);

  useEffect(() => {
    if (selectedService) loadQuestionnaire(selectedService);
  }, [selectedService, loadQuestionnaire]);

  useEffect(() => {
    if (!selectedService) return;
    api.get("/doctors").then(setDoctors).catch(() => setDoctors([]));
  }, [selectedService]);

  const selectService = (service) => {
    setSelectedService(service);
    setStep(2);
  };

  const validateStep = () => {
    setError("");
    if (step === 1) {
      if (!selectedService) return "Please select a concern to continue.";
    }
    if (step === 2) {
      if (!patient.name.trim()) return "Please enter your full name.";
      if (!patient.phone.trim()) return "Please enter your phone number.";
      if (!/^[+\d][\d\s\-()]{6,17}$/.test(patient.phone.trim())) return "Please enter a valid phone number.";
    }
    if (step === 3 && questionnaire?.questions?.length) {
      for (const q of questionnaire.questions) {
        const val = answers[q.id];
        if (q.required && (val === undefined || val === null || String(val).trim() === "")) {
          return `Please answer: "${q.label}"`;
        }
      }
    }
    if (step === 4) {
      if (!selectedDoctor) return "Please select a doctor.";
      if (!date) return "Please select a date.";
      if (!time) return "Please select a time slot.";
    }
    return "";
  };

  const next = () => {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    if (step === 3) {
      setStep(4);
      setDate("");
      setTime("");
      return;
    }
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const back = () => {
    setError("");
    if (step > 1) setStep(step - 1);
    else navigate("/");
  };

  const submit = async () => {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const result = await api.post("/appointments", {
        serviceSlug: selectedService.slug,
        doctorId: selectedDoctor.id,
        date,
        startTime: time,
        patient: {
          name: patient.name,
          phone: patient.phone,
          email: patient.email || undefined,
          age: patient.age ? Number(patient.age) : undefined,
          gender: patient.gender || undefined,
          city: patient.city || undefined,
        },
        answers: Object.entries(answers).map(([questionId, value]) => ({ questionId: Number(questionId), value })),
      });
      navigate("/success", { state: { result, service: selectedService } });
    } catch (e) {
      setError(e.message || "Could not submit your appointment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-10 w-10 text-leaf-700" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="border-b border-stone-200 bg-white/70 backdrop-blur sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Logo />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 pb-20">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-leaf-900">
            Book an Appointment
          </h1>
          <p className="mt-2 text-stone-500 text-sm sm:text-base">
            Complete your details and health questionnaire so our physicians can prepare for your visit.
          </p>
        </div>

        <Stepper current={step} />

        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-stone-200 p-6 sm:p-8">
          {step === 1 && <StepConcern services={services} selected={selectedService} onSelect={selectService} />}
          {step === 2 && <StepPatient patient={patient} setPatient={setPatient} />}
          {step === 3 && (
            <StepQuestionnaire
              questionnaire={questionnaire}
              service={selectedService}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}
          {step === 4 && (
            <StepSchedule
              service={selectedService}
              doctors={doctors}
              selectedDoctor={selectedDoctor}
              setSelectedDoctor={setSelectedDoctor}
              date={date}
              setDate={setDate}
              slots={slots}
              setSlots={setSlots}
              time={time}
              setTime={setTime}
            />
          )}
          {step === 5 && (
            <StepReview
              service={selectedService}
              patient={patient}
              doctor={selectedDoctor}
              date={date}
              time={time}
              questionnaire={questionnaire}
            />
          )}

          {error && (
            <div className="mt-6 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
              {error}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={back}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            >
              ← {step === 1 ? "Home" : "Back"}
            </button>
            {step < TOTAL_STEPS ? (
              <button
                onClick={next}
                className="px-8 py-2.5 rounded-lg bg-leaf-800 text-white text-sm font-semibold hover:bg-leaf-900 shadow-sm transition-colors"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={submitting}
                className="px-8 py-2.5 rounded-lg bg-saffron-500 text-leaf-950 text-sm font-bold hover:bg-saffron-400 shadow-sm transition-colors disabled:opacity-60 flex items-center gap-2"
              >
                {submitting && <Spinner className="h-4 w-4" />}
                {submitting ? "Submitting..." : "Submit Appointment Request"}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
