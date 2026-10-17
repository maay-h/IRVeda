import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, FileText, Stethoscope, Sparkles, Package } from 'lucide-react'

const steps = [
  { num: '01', title: 'Book Appointment', desc: 'Schedule your appointment online or by phone.', icon: Calendar },
  { num: '02', title: 'Health Assessment', desc: 'Review your health background, symptoms, and lifestyle.', icon: FileText },
  { num: '03', title: 'Doctor Consultation', desc: 'In-depth consultation with Dr. Yakhooth Naveen in Mysore.', icon: Stethoscope },
  { num: '04', title: 'Personalized Care', desc: 'Receive customized Ayurvedic recommendations and diet guidance.', icon: Sparkles },
  { num: '05', title: 'Ongoing Support', desc: 'Continuous wellness guidance and follow-up care.', icon: Package },
]

export default function HowItWorks() {
  return (
    <section style={{ background: 'white', padding: 'clamp(4rem, 6vw, 6rem) 0' }}>
      <div className="section-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>Your Journey</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.875rem, 3.5vw, 2.875rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.875rem' }}>
            How It Works
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '460px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.7 }}>
            A simple, guided journey from first visit to personalized Ayurvedic care.
          </p>
        </div>

        {/* Desktop Steps View */}
        <div className="desktop-steps" style={{ display: 'flex', gap: '0', alignItems: 'stretch' }}>
          {steps.map((step, i) => {
            const IconComponent = step.icon
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'stretch', flex: 1 }}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    flex: 1,
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    textAlign: 'center', padding: '1.5rem 0.75rem',
                    position: 'relative',
                  }}
                >
                  {/* Connector */}
                  {i < steps.length - 1 && (
                    <div style={{
                      position: 'absolute', top: '3.5rem', right: '-1px',
                      width: '50%', height: '2px',
                      background: 'linear-gradient(to right, var(--color-earth), transparent)',
                      zIndex: 0,
                    }} />
                  )}

                  <div style={{
                    width: '68px', height: '68px', borderRadius: '50%',
                    background: i === 0 ? 'var(--color-forest)' : 'var(--color-cream-dark)',
                    border: `2px solid ${i === 0 ? 'var(--color-forest)' : 'var(--color-beige)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.25rem', position: 'relative', zIndex: 1,
                    flexShrink: 0,
                    color: i === 0 ? 'white' : 'var(--color-forest)',
                    transition: 'all 0.3s',
                  }}
                  >
                    <IconComponent size={26} />
                  </div>

                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--color-earth)', marginBottom: '0.375rem' }}>
                    STEP {step.num}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* Mobile Steps View (Vertical Connected Timeline) */}
        <div className="mobile-steps" style={{ display: 'none', flexDirection: 'column', gap: '1.25rem' }}>
          {steps.map((step, i) => {
            const IconComponent = step.icon
            return (
              <div key={i} style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
                background: 'var(--color-cream)',
                padding: '1.25rem',
                borderRadius: '16px',
                border: '1px solid var(--color-beige)',
              }}>
                <div style={{
                  width: '46px', height: '46px', borderRadius: '50%',
                  background: i === 0 ? 'var(--color-forest)' : 'white',
                  color: i === 0 ? 'white' : 'var(--color-forest)',
                  border: '1.5px solid var(--color-beige)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}>
                  <IconComponent size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--color-earth)', marginBottom: '0.125rem' }}>
                    STEP {step.num}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '0.25rem' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to="/book-appointment" className="btn-primary" style={{ padding: '0.875rem 2.25rem', width: '100%', maxWidth: '280px' }}>
            Start Your Journey
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .desktop-steps { display: none !important; }
          .mobile-steps { display: flex !important; }
        }
      `}</style>
    </section>
  )
}
