import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import {
  Calendar, Clock, CheckCircle2, ChevronRight, ChevronLeft,
  Sparkles, Flower2, Heart, Activity, ShieldCheck, Copy,
  Check, MapPin
} from 'lucide-react'
import axios from 'axios'

const API = import.meta.env.VITE_API_BASE_URL || '/api'

const ICONS = {
  'body-detox': Sparkles,
  'pcod': Flower2,
  'pcos': Flower2,
  'infertility-women': Heart,
  'thyroid': Activity,
  'diabetes': Activity,
  'psoriasis': Activity,
  'allergies': Activity,
  'bone-health-ayurveda': ShieldCheck,
  'customized-bone-health-medicine': ShieldCheck,
  'stones': ShieldCheck,
  'suvarna-prasha': Sparkles,
}

// Temporary bridge so existing marketing links (?service=...) still preselect.
// Point those links at real service slugs and delete this map.
const LEGACY_ALIAS = {
  'womens-wellness': 'pcod',
  'pcod-pcos': 'pcod',
  'fertility': 'infertility-women',
  'bone-health': 'bone-health-ayurveda',
  'stone': 'stones',
}

const STEPS = ['Service', 'Date', 'Time', 'Details', 'Health Questionnaire', 'Confirmation']

function to12h(t) {
  const [h, m] = t.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hr = h % 12 === 0 ? 12 : h % 12
  return `${String(hr).padStart(2, '0')}:${String(m).padStart(2, '0')} ${suffix}`
}

export default function BookAppointment() {
  const [searchParams] = useSearchParams()
  const rawService = searchParams.get('service') || ''

  const [step, setStep] = useState(0)
  const [booking, setBooking] = useState({
    serviceSlug: LEGACY_ALIAS[rawService] || rawService,
    date: '',
    startTime: '',
    name: '', phone: '', email: '', age: '', city: '', notes: '',
  })

  const [services, setServices] = useState([])
  const [loadingServices, setLoadingServices] = useState(true)
  const [servicesError, setServicesError] = useState('')
  const [doctor, setDoctor] = useState(null)
  const [questionnaire, setQuestionnaire] = useState(null)
  const [answers, setAnswers] = useState({})

  const [slots, setSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [slotsError, setSlotsError] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [refId, setRefId] = useState('')
  const [errors, setErrors] = useState({})
  const [copied, setCopied] = useState(false)

  // Services come from the bookings API (single source of truth)
  useEffect(() => {
    axios.get(`${API}/services`)
      .then(res => {
        const flat = []
        ;(res.data || []).forEach(cat => {
          (cat.services || []).forEach(s => {
            flat.push({
              id: s.slug,
              name: s.name,
              category: cat.name,
              icon: ICONS[s.slug] || Activity,
              featured: !!s.featured,
            })
          })
        })
        setServices(flat)
      })
      .catch(() => setServicesError('Could not load services. Please refresh the page.'))
      .finally(() => setLoadingServices(false))
  }, [])

  // Clinic doctor (prefer the one the website advertises)
  useEffect(() => {
    axios.get(`${API}/doctors`)
      .then(res => {
        const list = res.data || []
        const siteDoctor = (import.meta.env.VITE_DOCTOR_NAME || '').trim()
        setDoctor(list.find(d => siteDoctor && siteDoctor.startsWith(d.name)) || list[0] || null)
      })
      .catch(() => setDoctor(null))
  }, [])

  // Real availability for this doctor + date
  useEffect(() => {
    if (doctor?.id && booking.date) {
      setLoadingSlots(true)
      setSlotsError('')
      axios.get(`${API}/schedules/${doctor.id}/slots?date=${booking.date}`)
        .then(res => setSlots((res.data?.slots || []).map(s => ({ value: s, label: to12h(s) }))))
        .catch(() => { setSlots([]); setSlotsError('Could not load available slots. Please try again.') })
        .finally(() => setLoadingSlots(false))
    }
  }, [doctor?.id, booking.date])

  // Questionnaire for the chosen service (falls back to the general one)
  useEffect(() => {
    if (booking.serviceSlug) {
      axios.get(`${API}/services/${booking.serviceSlug}/questionnaire`)
        .then(res => setQuestionnaire(res.data || null))
        .catch(() => setQuestionnaire(null))
    }
  }, [booking.serviceSlug])

  const set = (field, value) => setBooking(b => ({ ...b, [field]: value }))

  const validate = () => {
    const e = {}
    if (step === 0 && !booking.serviceSlug) e.serviceSlug = 'Please select a service'
    if (step === 1 && !booking.date) e.date = 'Please select an appointment date'
    if (step === 2) {
      if (!booking.startTime) e.startTime = 'Please select a time slot'
      else if (slots.length === 0) e.startTime = 'No slots available for this date'
    }
    if (step === 3) {
      if (!booking.name) e.name = 'Full name is required'
      if (!booking.phone || booking.phone.length < 10) e.phone = 'Valid 10-digit phone number required'
      if (!booking.email || !booking.email.includes('@')) e.email = 'Valid email address required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateAnswers = () => {
    const e = {}
    for (const q of questionnaire?.questions || []) {
      if (q.required && !String(answers[q.id] || '').trim()) e[q.id] = 'Required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async () => {
    if (!validateAnswers()) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await axios.post(`${API}/appointments`, {
        serviceSlug: booking.serviceSlug,
        doctorId: doctor.id,
        date: booking.date,
        startTime: booking.startTime,
        patient: {
          name: booking.name.trim(),
          phone: booking.phone.trim(),
          email: booking.email.trim(),
          age: booking.age ? Number(booking.age) : null,
          city: booking.city.trim() || null,
        },
        notes: booking.notes,
        answers: (questionnaire?.questions || [])
          .map(q => ({ questionId: q.id, value: String(answers[q.id] ?? '').trim() }))
          .filter(a => a.value !== ''),
      })
      setRefId(res.data.appointmentNo)
      setStep(s => s + 1)
    } catch (err) {
      const msg = err.response?.data?.error || 'Could not submit your booking. Please try again.'
      setSubmitError(msg)
      if (err.response?.status === 409) {
        // Slot was taken while they were booking — send them back to pick another
        setBooking(b => ({ ...b, startTime: '' }))
        setStep(2)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const next = async () => {
    if (step === STEPS.length - 2) return submit()
    if (!validate()) return
    setStep(s => s + 1)
  }

  const prev = () => setStep(s => s - 1)

  const selectedService = services.find(s => s.id === booking.serviceSlug)

  const minDate = new Date(Date.now() + 86400000).toISOString().split('T')[0]
  const maxDate = new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0]

  const morning = slots.filter(s => s.label.includes('AM'))
  const evening = slots.filter(s => s.label.includes('PM'))

  return (
    <div style={{ background: 'var(--color-cream)', minHeight: '100vh', paddingTop: 'clamp(5rem, 8vw, 7.5rem)', paddingBottom: '5rem', overflow: 'hidden' }}>
      <title>Book In-Clinic Appointment — IR Veda Clinic Mysore</title>
      <meta name="description" content="Book your in-person Ayurvedic consultation with Dr. Yakhooth Naveen (BAMS, PGDHM) at IR Veda Clinic in Mandi Mohalla, Mysore." />

      {/* Header */}
      <div className="section-wrapper" style={{ maxWidth: '860px', textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}>Appointments</div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.75rem', lineHeight: 1.15 }}>
          Book Your Ayurvedic Consultation
        </h1>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '540px', margin: '0 auto', fontSize: '0.9375rem', lineHeight: 1.6 }}>
          Schedule an in-person consultation with <strong>Dr. Yakhooth Naveen</strong> (BAMS, PGDHM) at IR Veda Clinic, Mandi Mohalla, Mysore.
        </p>
      </div>

      <div className="section-wrapper" style={{ maxWidth: '860px' }}>
        {/* Step Indicator */}
        <div style={{ marginBottom: '2rem' }}>
          <div className="no-scrollbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {STEPS.map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexShrink: 0 }}>
                <div style={{
                  width: '30px', height: '30px', borderRadius: '50%',
                  background: i < step ? 'var(--color-earth)' : i === step ? 'var(--color-forest)' : 'var(--color-beige)',
                  color: i <= step ? 'white' : 'var(--color-text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700,
                  transition: 'all 0.3s',
                  flexShrink: 0,
                }}>
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span style={{ fontSize: '0.8125rem', fontWeight: i === step ? 600 : 400, color: i === step ? 'var(--color-forest)' : 'var(--color-text-muted)' }}>
                  {s}
                </span>
                {i < STEPS.length - 1 && (
                  <div style={{ width: 'clamp(12px, 3vw, 32px)', height: '1.5px', background: 'var(--color-beige)', margin: '0 0.25rem' }} />
                )}
              </div>
            ))}
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} />
          </div>
        </div>

        {/* Form Card */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: 'clamp(1.5rem, 4vw, 2.75rem)',
          boxShadow: '0 8px 32px rgba(26,58,42,0.06)',
          border: '1px solid var(--color-beige)',
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              {/* STEP 0: Select Service */}
              {step === 0 && (
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
                    Select Your Health Concern / Service
                  </h2>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                    Choose the primary health area you would like to consult with {doctor?.name || 'our physician'} about:
                  </p>
                  {servicesError && <p style={{ color: '#e53e3e', fontSize: '0.8125rem', marginBottom: '1rem' }}>{servicesError}</p>}
                  {errors.serviceSlug && <p style={{ color: '#e53e3e', fontSize: '0.8125rem', marginBottom: '1rem' }}>{errors.serviceSlug}</p>}
                  {loadingServices ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>Loading services...</div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '0.75rem' }}>
                      {services.map(service => {
                        const IconComponent = service.icon
                        const isSelected = booking.serviceSlug === service.id
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => set('serviceSlug', service.id)}
                            style={{
                              padding: '1rem',
                              border: `2px solid ${isSelected ? 'var(--color-earth)' : 'var(--color-beige)'}`,
                              borderRadius: '16px',
                              background: isSelected ? 'var(--color-cream)' : 'white',
                              cursor: 'pointer', textAlign: 'left',
                              display: 'flex', alignItems: 'center', gap: '0.75rem',
                              transition: 'all 0.2s',
                            }}
                          >
                            <div style={{
                              width: '40px', height: '40px', borderRadius: '10px',
                              background: isSelected ? 'var(--color-earth)' : 'var(--color-cream)',
                              color: isSelected ? 'white' : 'var(--color-earth)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              flexShrink: 0,
                            }}>
                              <IconComponent size={18} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-forest)', lineHeight: 1.3 }}>{service.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{service.category}</div>
                            </div>
                            {isSelected && (
                              <CheckCircle2 size={16} color="var(--color-earth)" style={{ flexShrink: 0 }} />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 1: Select Date */}
              {step === 1 && (
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
                    Choose Appointment Date
                  </h2>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                    Select a date for your visit to IR Veda Clinic, Mandi Mohalla, Mysore.
                  </p>
                  {errors.date && <p style={{ color: '#e53e3e', fontSize: '0.8125rem', marginBottom: '1rem' }}>{errors.date}</p>}

                  <div style={{ maxWidth: '380px' }}>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="date"
                        min={minDate}
                        max={maxDate}
                        value={booking.date}
                        onChange={e => { setBooking(b => ({ ...b, date: e.target.value, startTime: '' })) }}
                        className="form-input"
                        style={{ fontSize: '1rem', padding: '0.875rem 1rem' }}
                      />
                    </div>
                  </div>

                  {booking.date && (
                    <div style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', background: 'var(--color-cream)', borderRadius: '14px', border: '1px solid var(--color-beige)' }}>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Selected Date</div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-forest)' }}>
                        {new Date(booking.date + 'T12:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--color-earth)', marginTop: '0.25rem' }}>
                        Clinic Hours: Mon–Sat 9:00 AM – 7:00 PM
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: Select Time Slot */}
              {step === 2 && (
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
                    Select a Time Slot
                  </h2>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                    Available time slots for {new Date(booking.date + 'T12:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}:
                  </p>
                  {errors.startTime && <p style={{ color: '#e53e3e', fontSize: '0.8125rem', marginBottom: '1rem' }}>{errors.startTime}</p>}
                  {slotsError && <p style={{ color: '#e53e3e', fontSize: '0.8125rem', marginBottom: '1rem' }}>{slotsError}</p>}

                  {loadingSlots ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>Loading available slots...</div>
                  ) : slots.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                      No slots available on this date. The clinic is closed on Sundays — please pick another day.
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>Morning Slots</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.625rem', marginBottom: '1.5rem' }}>
                        {morning.map(slot => (
                          <button
                            key={slot.value}
                            type="button"
                            onClick={() => set('startTime', slot.value)}
                            style={{
                              padding: '0.625rem 0.5rem',
                              border: `1.5px solid ${booking.startTime === slot.value ? 'var(--color-forest)' : 'var(--color-beige)'}`,
                              borderRadius: '10px',
                              background: booking.startTime === slot.value ? 'var(--color-forest)' : 'white',
                              color: booking.startTime === slot.value ? 'white' : 'var(--color-text-dark)',
                              fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500,
                              cursor: 'pointer', transition: 'all 0.15s',
                            }}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>

                      <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>Afternoon & Evening Slots</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.625rem' }}>
                        {evening.map(slot => (
                          <button
                            key={slot.value}
                            type="button"
                            onClick={() => set('startTime', slot.value)}
                            style={{
                              padding: '0.625rem 0.5rem',
                              border: `1.5px solid ${booking.startTime === slot.value ? 'var(--color-forest)' : 'var(--color-beige)'}`,
                              borderRadius: '10px',
                              background: booking.startTime === slot.value ? 'var(--color-forest)' : 'white',
                              color: booking.startTime === slot.value ? 'white' : 'var(--color-text-dark)',
                              fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500,
                              cursor: 'pointer', transition: 'all 0.15s',
                            }}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: Patient Details */}
              {step === 3 && (
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
                    Patient Information
                  </h2>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                    Please enter the patient details for appointment registration:
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="details-form-grid">
                    <div>
                      <Field label="Full Name *" error={errors.name}>
                        <input className="form-input" placeholder="Patient's full name" value={booking.name} onChange={e => set('name', e.target.value)} />
                      </Field>
                    </div>
                    <div>
                      <Field label="Phone Number *" error={errors.phone}>
                        <input className="form-input" type="tel" placeholder="10-digit mobile number" value={booking.phone} onChange={e => set('phone', e.target.value)} />
                      </Field>
                    </div>
                    <div>
                      <Field label="Email Address *" error={errors.email}>
                        <input className="form-input" type="email" placeholder="your@email.com" value={booking.email} onChange={e => set('email', e.target.value)} />
                      </Field>
                    </div>
                    <div>
                      <Field label="Age">
                        <input className="form-input" type="number" placeholder="Age in years" value={booking.age} onChange={e => set('age', e.target.value)} min={1} max={120} />
                      </Field>
                    </div>
                    <div className="full-width-col">
                      <Field label="City / Location">
                        <input className="form-input" placeholder="e.g. Mysore, Mandya, Bangalore" value={booking.city} onChange={e => set('city', e.target.value)} />
                      </Field>
                    </div>
                    <div className="full-width-col">
                      <Field label="Brief Health Concerns / Notes">
                        <textarea className="form-input" rows={3} placeholder="Describe any symptoms, duration, or previous treatments..." value={booking.notes} onChange={e => set('notes', e.target.value)} />
                      </Field>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Pre-consultation Questionnaire */}
              {step === 4 && (
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
                    Pre-Consultation Questionnaire
                  </h2>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                    {questionnaire?.description || 'These questions help our physician prepare for your consultation.'}
                  </p>

                  {!questionnaire || !(questionnaire.questions || []).length ? (
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                      No additional questions for this consultation. You're all set — submit below.
                    </p>
                  ) : (
                    <div style={{ display: 'grid', gap: '1.25rem' }}>
                      {questionnaire.questions.map(q => (
                        <QuestionField
                          key={q.id}
                          q={q}
                          value={answers[q.id] || ''}
                          error={errors[q.id]}
                          onChange={v => setAnswers(a => ({ ...a, [q.id]: v }))}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 5: Confirmation */}
              {step === 5 && (
                <div style={{ textAlign: 'center' }}>
                  <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
                    <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: 'rgba(74,124,89,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                      <CheckCircle2 size={36} color="var(--color-earth)" />
                    </div>
                  </motion.div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
                    Appointment Request Submitted!
                  </h2>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.75rem', lineHeight: 1.6, fontSize: '0.875rem' }}>
                    Your in-clinic consultation request has been recorded. Our clinic team will confirm your slot.
                  </p>

                  {/* Booking Summary */}
                  <div style={{ background: 'var(--color-cream)', borderRadius: '16px', padding: '1.25rem', textAlign: 'left', marginBottom: '1.5rem', border: '1px solid var(--color-beige)' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '0.875rem' }}>Booking Summary</h3>
                    {[
                      { label: 'Reference ID', value: refId, bold: true },
                      { label: 'Consultation', value: selectedService?.name || booking.serviceSlug },
                      { label: 'Doctor', value: doctor?.name || 'IR Veda Clinic' },
                      { label: 'Location', value: '#2828, B.N Street, Mandi Mohalla, Mysore' },
                      { label: 'Date', value: new Date(booking.date + 'T12:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) },
                      { label: 'Time Slot', value: to12h(booking.startTime) },
                      { label: 'Patient Name', value: booking.name },
                      { label: 'Contact', value: booking.phone },
                    ].map(({ label, value, bold }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-beige)', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', flexShrink: 0 }}>{label}</span>
                        <span style={{ fontSize: '0.8125rem', fontWeight: bold ? 700 : 500, color: 'var(--color-forest)', textAlign: 'right' }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Copy ref ID */}
                  <button
                    type="button"
                    onClick={() => { navigator.clipboard?.writeText(refId); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto 1.5rem', padding: '0.5625rem 1.125rem', border: '1px solid var(--color-beige)', borderRadius: '100px', background: 'white', cursor: 'pointer', fontSize: '0.8125rem', color: 'var(--color-forest)' }}
                  >
                    <Copy size={13} /> {copied ? 'Copied!' : 'Copy Reference ID'}
                  </button>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
                    <a href="/" className="btn-primary" style={{ width: '100%', maxWidth: '260px' }}>
                      Back to Home
                    </a>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        {step < STEPS.length - 1 && (
          <div className="booking-nav-buttons" style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button
              type="button"
              onClick={prev}
              disabled={step === 0}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem',
                padding: '0.75rem 1.25rem',
                border: '1.5px solid var(--color-beige)',
                borderRadius: '100px',
                background: 'white',
                color: step === 0 ? 'var(--color-text-muted)' : 'var(--color-forest)',
                cursor: step === 0 ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500,
                opacity: step === 0 ? 0.4 : 1,
                minHeight: '44px',
              }}
            >
              <ChevronLeft size={16} /> Back
            </button>
            <button
              type="button"
              onClick={next}
              disabled={submitting || (step === 2 && !loadingSlots && slots.length === 0)}
              className="btn-primary"
              style={{ minHeight: '44px', padding: '0.75rem 1.5rem' }}
            >
              {submitting ? 'Submitting...' : step === STEPS.length - 2 ? 'Submit Appointment' : 'Continue'}
              {!submitting && <ChevronRight size={16} />}
            </button>
          </div>
        )}

        {submitError && (
          <p style={{ color: '#e53e3e', fontSize: '0.875rem', textAlign: 'center', marginTop: '1rem' }}>{submitError}</p>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .details-form-grid {
            grid-template-columns: 1fr !important;
          }
          .full-width-col {
            grid-column: 1 / -1;
          }
        }
        @media (min-width: 641px) {
          .full-width-col {
            grid-column: 1 / -1;
          }
        }
      `}</style>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {children}
      {error && <p style={{ color: '#e53e3e', fontSize: '0.75rem', marginTop: '0.25rem' }}>{error}</p>}
    </div>
  )
}

function QuestionField({ q, value, error, onChange }) {
  let options = []
  try { options = q.options ? JSON.parse(q.options) : [] } catch { options = [] }

  const inputStyle = { fontSize: '0.9375rem' }

  let control
  switch (q.questionType) {
    case 'YES_NO':
      control = (
        <select className="form-input" style={inputStyle} value={value} onChange={e => onChange(e.target.value)}>
          <option value="">Select…</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      )
      break
    case 'DROPDOWN':
      control = (
        <select className="form-input" style={inputStyle} value={value} onChange={e => onChange(e.target.value)}>
          <option value="">Select…</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      )
      break
    case 'SINGLE':
      control = (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {options.map(o => (
            <button key={o} type="button" onClick={() => onChange(o)}
              style={{
                padding: '0.5rem 0.875rem', borderRadius: '100px', cursor: 'pointer',
                border: `1.5px solid ${value === o ? 'var(--color-forest)' : 'var(--color-beige)'}`,
                background: value === o ? 'var(--color-forest)' : 'white',
                color: value === o ? 'white' : 'var(--color-text-dark)',
                fontFamily: 'var(--font-body)', fontSize: '0.875rem',
              }}>
              {o}
            </button>
          ))}
        </div>
      )
      break
    case 'MULTIPLE': {
      const picked = value ? value.split(', ').filter(Boolean) : []
      const toggle = o => onChange(
        picked.includes(o) ? picked.filter(x => x !== o).join(', ') : [...picked, o].join(', ')
      )
      control = (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {options.map(o => (
            <button key={o} type="button" onClick={() => toggle(o)}
              style={{
                padding: '0.5rem 0.875rem', borderRadius: '100px', cursor: 'pointer',
                border: `1.5px solid ${picked.includes(o) ? 'var(--color-forest)' : 'var(--color-beige)'}`,
                background: picked.includes(o) ? 'var(--color-forest)' : 'white',
                color: picked.includes(o) ? 'white' : 'var(--color-text-dark)',
                fontFamily: 'var(--font-body)', fontSize: '0.875rem',
              }}>
              {o}
            </button>
          ))}
        </div>
      )
      break
    }
    case 'NUMBER':
      control = <input className="form-input" type="number" style={inputStyle} value={value} onChange={e => onChange(e.target.value)} />
      break
    case 'DATE':
      control = <input className="form-input" type="date" style={inputStyle} value={value} onChange={e => onChange(e.target.value)} />
      break
    default:
      control = <input className="form-input" type="text" style={inputStyle} value={value} onChange={e => onChange(e.target.value)} />
  }

  return (
    <Field label={`${q.label}${q.required ? ' *' : ''}`} error={error}>
      {control}
    </Field>
  )
}
