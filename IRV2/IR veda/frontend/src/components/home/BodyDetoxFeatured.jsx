import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Activity, Leaf, Utensils, RefreshCw, Sparkles, ClipboardCheck } from 'lucide-react'

const benefits = [
  { icon: Activity, title: 'Personalized Wellness Assessment', desc: 'Every program begins with an in-depth consultation to understand your unique constitution.' },
  { icon: Leaf, title: 'Ayurvedic Lifestyle Guidance', desc: 'Customized recommendations aligned with traditional Ayurvedic principles.' },
  { icon: Utensils, title: 'Diet & Nutrition Recommendations', desc: 'Individualized dietary guidance based on your health profile and goals.' },
  { icon: RefreshCw, title: 'Ongoing Support & Follow-up', desc: 'Regular guidance throughout your wellness journey for sustained results.' },
  { icon: Sparkles, title: 'Traditional Ayurvedic Practices', desc: 'Time-honoured methods adapted to your specific health requirements.' },
  { icon: ClipboardCheck, title: 'Customized Approach', desc: 'No generic programs — everything is tailored to your individual needs.' },
]

export default function BodyDetoxFeatured() {
  return (
    <section style={{
      background: 'var(--color-forest)',
      padding: '6rem 0',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative circles */}
      <div aria-hidden style={{ position: 'absolute', top: '-120px', right: '-120px', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(201,168,76,0.06)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

      <div className="section-wrapper" style={{ maxWidth: '1280px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag" style={{ color: 'var(--color-gold-light)', justifyContent: 'center', marginBottom: '1rem' }}>
            Featured Program
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 700, color: 'white', lineHeight: 1.15, marginBottom: '1rem' }}>
            Body Detox —{' '}
            <em style={{ color: 'var(--color-gold-light)', fontStyle: 'italic' }}>Reset. Rebalance. Rejuvenate.</em>
          </h2>
          <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.7)', maxWidth: '620px', margin: '0 auto', lineHeight: 1.75 }}>
            An Ayurvedic body detox program personalized to your individual constitution. Guided by traditional wisdom, designed around your unique health needs.
          </p>
        </div>

        {/* Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '4rem' }} className="detox-grid">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ borderRadius: '24px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
              <img
                src="/images/body_detox.jpg"
                alt="Ayurvedic body detox herbs and copper vessels"
                style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
              />
              {/* Overlay badge */}
              <div style={{
                position: 'absolute', top: '1.5rem', left: '1.5rem',
                background: 'rgba(201,168,76,0.92)',
                backdropFilter: 'blur(8px)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '100px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem', fontWeight: 600,
                letterSpacing: '0.05em',
                display: 'flex', alignItems: 'center', gap: '0.375rem',
              }}>
                <Sparkles size={14} /> Signature Program
              </div>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 600, color: 'white', marginBottom: '1.5rem' }}>
              Why Body Detox?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {benefits.map((b, i) => {
                const IconComponent = b.icon
                return (
                  <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '12px',
                      background: 'rgba(201,168,76,0.15)',
                      border: '1px solid rgba(201,168,76,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <IconComponent size={20} color="var(--color-gold-light)" />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 600, color: 'white', marginBottom: '0.125rem' }}>{b.title}</div>
                      <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{b.desc}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          <Link to="/book-appointment?service=body-detox" className="btn-gold" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
            Book a Body Detox Consultation
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .detox-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  )
}
