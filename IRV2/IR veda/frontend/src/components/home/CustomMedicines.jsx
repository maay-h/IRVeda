import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, FileText, Stethoscope, Sparkles, FlaskConical, Package } from 'lucide-react'

const steps = [
  { icon: Calendar, step: '01', title: 'Book Consultation', desc: 'Schedule your appointment online or via phone.' },
  { icon: FileText, step: '02', title: 'Clinical Evaluation', desc: 'Detailed review of your health history and symptoms.' },
  { icon: Stethoscope, step: '03', title: 'Consultation', desc: 'In-depth discussion of your health with Dr. Yakhooth Naveen.' },
  { icon: Sparkles, step: '04', title: 'Personalized Recommendations', desc: 'Receive your customized Ayurvedic wellness plan.' },
  { icon: FlaskConical, step: '05', title: 'Medicine Preparation', desc: 'Customized Ayurvedic formulations prepared for your needs.' },
  { icon: Package, step: '06', title: 'Clinic Dispensing', desc: 'Medicines provided at our Mysore clinic with full instructions.' },
]

export default function CustomMedicines() {
  return (
    <section style={{ background: 'var(--color-cream)', padding: 'clamp(3.5rem, 6vw, 6rem) 0', overflow: 'hidden' }}>
      <div className="section-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>Personalized Medicines</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.75rem' }}>
            Personalized Ayurvedic Medicines
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '560px', margin: '0 auto', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            No off-the-shelf solutions. Every medicine recommendation is created specifically for you after a thorough consultation.
          </p>
          {/* Process highlight */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['Consult', 'Personalize', 'Prepare', 'Deliver'].map((s, i, arr) => (
              <React.Fragment key={s}>
                <span style={{
                  padding: '0.375rem 0.875rem',
                  background: 'var(--color-forest)',
                  color: 'white',
                  borderRadius: '100px',
                  fontSize: '0.8125rem', fontWeight: 600,
                }}>
                  {s}
                </span>
                {i < arr.length - 1 && <ArrowRight size={14} color="var(--color-earth)" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="custom-meds-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {steps.map((s, i) => {
            const IconComponent = s.icon
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                style={{
                  background: 'white', borderRadius: '18px', padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                  boxShadow: '0 4px 20px rgba(26,58,42,0.06)',
                  border: '1px solid rgba(74,124,89,0.08)',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', top: '0.875rem', right: '0.875rem',
                  fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 700,
                  color: 'rgba(74,124,89,0.08)', lineHeight: 1,
                }}>
                  {s.step}
                </div>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(74,124,89,0.12), rgba(201,168,76,0.12))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '0.875rem',
                  border: '1px solid rgba(74,124,89,0.18)',
                }}>
                  <IconComponent size={20} color="var(--color-earth)" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '0.375rem' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                  {s.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/book-appointment" className="btn-primary" style={{ width: '100%', maxWidth: '240px' }}>
            Book Consultation
          </Link>
          <Link to="/ayurveda-medicines" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem',
            fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 500,
            color: 'var(--color-earth)', textDecoration: 'none',
            padding: '0.5rem',
          }}>
            Learn More <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .custom-meds-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
