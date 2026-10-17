import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Flower2, Sparkles, Heart, Activity, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react'

export default function WomensWellness() {
  const cards = [
    { icon: Flower2, title: 'PCOD Wellness', desc: 'Personalized Ayurvedic support for managing PCOD through lifestyle modifications, dietary guidance, and individualized recommendations.' },
    { icon: Sparkles, title: 'PCOS Wellness', desc: 'Holistic Ayurvedic consultation for PCOS, focusing on balance through individualized wellness approaches.' },
    { icon: Heart, title: 'Fertility Wellness Consultation', desc: 'Supportive Ayurvedic consultation for women exploring fertility wellness options. We do not claim guaranteed fertility outcomes.' },
    { icon: Activity, title: 'Hormonal Balance Support', desc: 'Lifestyle and dietary guidance to support hormonal wellness through traditional Ayurvedic principles.' },
    { icon: ShieldCheck, title: 'Menstrual Wellness', desc: 'Personalized guidance for menstrual health concerns and cycle-related wellness.' },
    { icon: HeartHandshake, title: 'General Women\'s Health', desc: 'Comprehensive Ayurvedic consultation covering various aspects of women\'s overall health and wellbeing.' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ overflow: 'hidden' }}>
      <title>Women's Wellness — Ayurvedic Care for PCOD, PCOS & More | IR Veda Clinic</title>
      <meta name="description" content="Personalized Ayurvedic care for women's health concerns — PCOD, PCOS, hormonal wellness, and fertility-related consultation at IR Veda Clinic." />

      <section style={{ background: 'linear-gradient(135deg, #fdf6f0, #faf0e0)', paddingTop: 'clamp(5rem, 8vw, 7.5rem)', paddingBottom: '3rem' }}>
        <div className="section-wrapper">
          <div className="section-tag" style={{ color: 'var(--color-gold)', marginBottom: '0.5rem' }}>Women's Health</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.875rem, 5vw, 3.25rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.75rem', maxWidth: '700px', lineHeight: 1.15, wordBreak: 'break-word' }}>
            Personalized Ayurvedic Care for Women's Wellness
          </h1>
          <p style={{ color: 'var(--color-text-body)', maxWidth: '580px', lineHeight: 1.7, marginBottom: '1.75rem', fontSize: '0.9375rem' }}>
            We offer individualized Ayurvedic consultation for women's health concerns with empathy, respect, and clinical care. Every assessment is personal and confidential.
          </p>
          <Link to="/book-appointment?service=womens-wellness" className="btn-primary" style={{ width: '100%', maxWidth: '320px', whiteSpace: 'normal', textAlign: 'center', lineHeight: 1.35, padding: '0.75rem 1.25rem' }}>
            Book Women's Wellness Consultation
          </Link>
        </div>
      </section>

      <section style={{ background: 'white', padding: 'clamp(2.5rem, 5vw, 4.5rem) 0' }}>
        <div className="section-wrapper">
          <div className="womens-page-cards" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.25rem',
            width: '100%',
          }}>
            {cards.map((card, i) => {
              const IconComponent = card.icon
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.05 }} style={{
                  background: 'var(--color-cream)', borderRadius: '16px', padding: '1.25rem',
                  border: '1px solid rgba(201,168,76,0.18)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  wordBreak: 'break-word',
                  boxSizing: 'border-box',
                }}>
                  <div>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '10px',
                      background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '0.75rem', border: '1px solid var(--color-beige)',
                      flexShrink: 0,
                    }}>
                      <IconComponent size={20} color="var(--color-gold-dark)" />
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '0.375rem', wordBreak: 'break-word' }}>{card.title}</h2>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.55, marginBottom: '1rem', wordBreak: 'break-word' }}>{card.desc}</p>
                  </div>
                  <Link to="/book-appointment?service=womens-wellness" style={{
                    fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-gold-dark)',
                    textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                  }}>
                    Book Consultation <ArrowRight size={13} />
                  </Link>
                </motion.div>
              )
            })}
          </div>
          <div style={{ marginTop: '2rem', padding: '1rem 1.25rem', background: 'rgba(201,168,76,0.08)', borderRadius: '12px', border: '1px solid rgba(201,168,76,0.2)', width: '100%', boxSizing: 'border-box' }}>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-body)', lineHeight: 1.55, margin: 0, wordBreak: 'break-word' }}>
              <strong>Important Note:</strong> Ayurvedic support for fertility-related and reproductive health concerns is provided after thorough consultation. IR Veda Clinic does not claim guaranteed outcomes for fertility, PCOD, or PCOS management. All recommendations are individualized and subject to consultation.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--color-forest)', padding: 'clamp(3rem, 6vw, 4.5rem) 1.25rem', textAlign: 'center' }}>
        <div className="section-wrapper" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>Begin Your Women's Wellness Journey</h2>
          <p style={{ color: 'rgba(255,255,255,0.76)', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>Personalized, empathetic Ayurvedic care for women's health concerns.</p>
          <Link to="/book-appointment?service=womens-wellness" className="btn-gold" style={{ width: '100%', maxWidth: '320px', whiteSpace: 'normal', lineHeight: 1.35, padding: '0.75rem 1.25rem', display: 'inline-flex', textAlign: 'center' }}>Book Women's Wellness Consultation</Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 600px) {
          .womens-page-cards {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  )
}
