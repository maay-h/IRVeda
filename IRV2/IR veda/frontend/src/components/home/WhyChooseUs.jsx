import { motion } from 'framer-motion'
import { Stethoscope, Leaf, ClipboardList, Pill, HeartHandshake, UserCheck } from 'lucide-react'

const reasons = [
  { icon: Stethoscope, title: 'In-Clinic Personal Consultation', desc: 'Comprehensive one-on-one consultation with Dr. Yakhooth Naveen at our Mysore clinic.' },
  { icon: Leaf, title: 'Customized Ayurvedic Approach', desc: 'Treatments and wellness recommendations tailored to your unique constitution (Prakriti).' },
  { icon: ClipboardList, title: 'Root-Cause Health Assessment', desc: 'Holistic evaluation of physical, dietary, and lifestyle factors before recommending therapies.' },
  { icon: Pill, title: 'Personalized Herbal Formulations', desc: 'Authentic Ayurvedic medicines formulated specifically for each patient\'s health needs.' },
  { icon: UserCheck, title: 'Experienced Physician Care', desc: 'Qualified medical guidance by Dr. Yakhooth Naveen (BAMS, PGDHM) with patient-first ethics.' },
  { icon: HeartHandshake, title: 'Compassionate Patient Guidance', desc: 'Your health journey is guided with ongoing follow-up, clarity, and dedicated support.' },
]

export default function WhyChooseUs() {
  return (
    <section style={{ background: 'var(--color-cream)', padding: 'clamp(3.5rem, 6vw, 6rem) 0', overflow: 'hidden' }}>
      <div className="section-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>Why IR Veda Clinic</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.75rem' }}>
            What Makes Us Different
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '520px', margin: '0 auto', fontSize: '0.9375rem', lineHeight: 1.7 }}>
            We believe every patient is unique. Our approach centers on individual care, not one-size-fits-all solutions.
          </p>
        </div>

        <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
          {reasons.map((r, i) => {
            const IconComponent = r.icon
            return (
              <motion.div
                key={i}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)', background: 'white', border: '1px solid var(--color-beige)' }}
              >
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(74,124,89,0.12), rgba(201,168,76,0.12))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1rem',
                  border: '1px solid rgba(74,124,89,0.2)',
                }}>
                  <IconComponent size={22} color="var(--color-earth)" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '0.375rem' }}>
                  {r.title}
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {r.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .why-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
