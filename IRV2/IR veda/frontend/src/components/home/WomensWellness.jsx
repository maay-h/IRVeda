import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Flower2, Sparkles, Heart, Activity, UserCheck, ShieldCheck, Check } from 'lucide-react'

export default function WomensWellness() {
  const cards = [
    { icon: Flower2, title: 'PCOD Care', desc: 'Personalized wellness support' },
    { icon: Sparkles, title: 'PCOS Care', desc: 'Holistic Ayurvedic guidance' },
    { icon: Heart, title: 'Fertility Support', desc: 'Compassionate consultation' },
    { icon: Activity, title: 'Hormone Balance', desc: 'Lifestyle-based approach' },
    { icon: ShieldCheck, title: 'Stress & Wellness', desc: 'Mind-body care & routine' },
    { icon: UserCheck, title: 'Personal Assessment', desc: 'Individual health review' },
  ]

  return (
    <section style={{ background: 'white', padding: 'clamp(3rem, 6vw, 5.5rem) 0', overflow: 'hidden' }}>
      <div className="section-wrapper">
        <div style={{
          background: 'linear-gradient(135deg, #fdf6f0 0%, rgba(201,168,76,0.08) 100%)',
          borderRadius: 'clamp(16px, 3vw, 28px)',
          padding: 'clamp(1.25rem, 3.5vw, 3rem)',
          border: '1px solid rgba(201,168,76,0.2)',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 'clamp(1.75rem, 3.5vw, 3rem)',
          alignItems: 'center',
          boxSizing: 'border-box',
          width: '100%',
          overflow: 'hidden',
        }} className="womens-home-grid">

          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', minWidth: 0 }}
          >
            <div className="section-tag" style={{ marginBottom: '0.5rem', color: 'var(--color-gold-dark)' }}>
              Women's Health
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.625rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--color-forest)',
              lineHeight: 1.18,
              marginBottom: '0.875rem',
              wordBreak: 'break-word',
            }}>
              Personalized Ayurvedic Care for{' '}
              <em style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Women's Wellness</em>
            </h2>
            <p style={{ color: 'var(--color-text-body)', lineHeight: 1.65, marginBottom: '1.25rem', fontSize: '0.9375rem' }}>
              We offer individualized Ayurvedic consultation for women's health concerns — approached with empathy, respect, and clinical care. Our assessments are personal, not generic.
            </p>

            {/* Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem', width: '100%' }}>
              {[
                'PCOD & PCOS wellness support',
                "Women's reproductive health guidance",
                'Fertility-related wellness consultation',
                'Lifestyle & nutrition counseling',
                'Hormonal wellness & balance',
                'Ongoing empathetic care',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', width: '100%' }}>
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: 'rgba(201,168,76,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}>
                    <Check size={11} color="var(--color-gold-dark)" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-text-body)', lineHeight: 1.45, flex: 1, minWidth: 0 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Disclaimer Box */}
            <div style={{
              padding: '0.75rem 1rem',
              background: 'rgba(201,168,76,0.12)',
              borderRadius: '10px',
              border: '1px solid rgba(201,168,76,0.25)',
              marginBottom: '1.5rem',
              width: '100%',
              boxSizing: 'border-box',
            }}>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-brown)', lineHeight: 1.5, margin: 0 }}>
                <strong>Note:</strong> Ayurvedic support for fertility-related concerns is provided after thorough consultation. We do not claim guaranteed outcomes for fertility or reproductive concerns.
              </p>
            </div>

            {/* CTA Button */}
            <div style={{ width: '100%' }}>
              <Link
                to="/book-appointment?service=womens-wellness"
                className="btn-primary"
                style={{
                  width: '100%',
                  maxWidth: '320px',
                  padding: '0.75rem 1.25rem',
                  fontSize: '0.875rem',
                  lineHeight: 1.35,
                  textAlign: 'center',
                  whiteSpace: 'normal',
                  display: 'inline-flex',
                }}
              >
                Book Women's Wellness Consultation
              </Link>
            </div>
          </motion.div>

          {/* Right Cards Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ width: '100%', minWidth: 0 }}
          >
            <div className="womens-sub-cards" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem',
              width: '100%',
              boxSizing: 'border-box',
            }}>
              {cards.map((card, i) => {
                const IconComponent = card.icon
                return (
                  <div
                    key={i}
                    style={{
                      background: 'white',
                      borderRadius: '14px',
                      padding: '0.875rem',
                      boxShadow: '0 2px 10px rgba(26,58,42,0.04)',
                      border: '1px solid rgba(201,168,76,0.2)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      boxSizing: 'border-box',
                      minWidth: 0,
                      overflow: 'hidden',
                      wordBreak: 'break-word',
                    }}
                  >
                    <div style={{
                      width: '34px', height: '34px', borderRadius: '8px',
                      background: 'linear-gradient(135deg, rgba(201,168,76,0.18), rgba(74,124,89,0.1))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '0.5rem',
                      flexShrink: 0,
                    }}>
                      <IconComponent size={17} color="var(--color-gold-dark)" />
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      color: 'var(--color-forest)',
                      marginBottom: '0.125rem',
                      lineHeight: 1.25,
                      wordBreak: 'break-word',
                    }}>
                      {card.title}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.35,
                      wordBreak: 'break-word',
                    }}>
                      {card.desc}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .womens-home-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 420px) {
          .womens-sub-cards {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
