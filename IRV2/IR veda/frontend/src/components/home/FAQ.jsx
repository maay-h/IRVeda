import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'What is Ayurveda?', a: 'Ayurveda is an ancient Indian system of medicine that focuses on maintaining health through balance of mind, body, and spirit. It uses individualized approaches including diet, lifestyle modifications, herbal preparations, and wellness practices.' },
  { q: 'Where is IR Veda Clinic located?', a: 'IR Veda Clinic is located at #2828, B.N Street, Mandi Mohalla, Mysore — 570001, Karnataka. You can visit us for in-person consultation with Dr. Yakhooth Naveen (BAMS, PGDHM).' },
  { q: 'What is Ayurvedic Body Detox?', a: 'Ayurvedic body detox is a personalized wellness program designed to help the body eliminate accumulated impurities through dietary adjustments, herbal support, and lifestyle guidance — based on your individual constitution (Prakriti).' },
  { q: 'How does the Body Detox consultation work?', a: 'The process begins with an in-depth clinical consultation with Dr. Yakhooth Naveen to understand your health profile, followed by a personalized plan. Recommendations are tailored to your individual needs, not a generic template.' },
  { q: 'How do I book an appointment?', a: 'Use the "Book Appointment" button on our website to select your health concern, choose a convenient date and time slot, and submit your details. You will receive a reference ID upon booking.' },
  { q: 'What should I bring to my consultation?', a: 'Please bring any previous medical reports, prescriptions, recent lab tests, or details of current supplements/medications so Dr. Yakhooth Naveen can conduct a complete evaluation.' },
  { q: 'Can I reschedule my appointment?', a: 'Yes. Please contact us via phone or WhatsApp at least 24 hours before your scheduled appointment time to reschedule.' },
  { q: 'What health concerns does IR Veda Clinic address?', a: 'IR Veda Clinic provides personalized Ayurvedic care for body detox, women\'s wellness (PCOD/PCOS), bone and joint health, psoriasis, thyroid concerns, diabetes wellness, kidney/gallbladder stone concerns, allergies, Suvarna Prasha for children, and general Ayurvedic health.' },
  { q: 'How are customized medicines prepared?', a: 'After your personal consultation, Dr. Yakhooth Naveen formulates customized Ayurvedic recommendations and medicines using traditional Ayurvedic methods and quality herbs, specific to your health profile.' },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section style={{ background: 'white', padding: '6rem 0' }}>
      <div className="section-wrapper" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>FAQ</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.875rem, 3.5vw, 2.875rem)', fontWeight: 700, color: 'var(--color-forest)' }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                background: openIdx === i ? 'var(--color-cream)' : 'white',
                border: `1.5px solid ${openIdx === i ? 'var(--color-earth)' : 'var(--color-beige)'}`,
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
              }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '1.25rem 1.5rem',
                  background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left', gap: '1rem',
                }}
                aria-expanded={openIdx === i}
              >
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-forest)', flex: 1 }}>
                  {faq.q}
                </span>
                <motion.div animate={{ rotate: openIdx === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={18} color="var(--color-earth)" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 1.5rem 1.25rem' }}>
                      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-body)', lineHeight: 1.7 }}>
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
