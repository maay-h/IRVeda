import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarCheck, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Full-width background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/images/hero_bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
      }} aria-hidden />

      {/* Dark overlay gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(105deg, rgba(10,28,18,0.88) 0%, rgba(10,28,18,0.72) 60%, rgba(10,28,18,0.45) 100%)',
        zIndex: 1,
      }} aria-hidden />

      {/* Subtle radial warmth */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)',
        zIndex: 2,
      }} aria-hidden />

      {/* Content */}
      <div className="section-wrapper" style={{ width: '100%', position: 'relative', zIndex: 3, paddingTop: '80px', paddingBottom: '3rem' }}>
        <div style={{ maxWidth: '680px' }} className="hero-content-box">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            {/* Tag */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.375rem 0.875rem',
              background: 'rgba(201,168,76,0.18)',
              border: '1px solid rgba(201,168,76,0.35)',
              borderRadius: '100px',
              marginBottom: '1.25rem',
            }}>
              <Sparkles size={13} color="var(--color-gold-light)" />
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold-light)',
              }}>
                Personalized Ayurvedic Care
              </span>
            </div>

            {/* Heading */}
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.25rem, 6vw, 4.25rem)',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.12,
              marginBottom: '1.25rem',
              letterSpacing: '-0.01em',
            }}>
              Personalized Ayurveda<br />
              <em style={{ color: 'var(--color-gold-light)', fontStyle: 'italic', fontWeight: 600 }}>
                for a Healthier You
              </em>
            </h1>

            {/* Subtext */}
            <p style={{
              fontSize: 'clamp(0.9375rem, 2vw, 1.125rem)',
              color: 'rgba(255,255,255,0.84)',
              lineHeight: 1.7,
              maxWidth: '520px',
              marginBottom: '2rem',
            }}>
              Discover personalized Ayurvedic care designed around your individual health, lifestyle and wellness needs. Traditional wisdom, modern approach.
            </p>

            {/* CTAs */}
            <div className="hero-cta-group" style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link
                to="/book-appointment"
                className="btn-gold hero-btn"
                style={{ fontSize: '0.9375rem', padding: '0.875rem 1.875rem' }}
              >
                <CalendarCheck size={18} />
                Book an Appointment
              </Link>
              <Link
                to="/treatments"
                className="hero-btn"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '0.875rem 1.75rem',
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  borderRadius: '100px',
                  fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 500,
                  color: 'rgba(255,255,255,0.9)',
                  textDecoration: 'none',
                  backdropFilter: 'blur(8px)',
                  background: 'rgba(255,255,255,0.08)',
                  transition: 'all 0.3s ease',
                  minHeight: '46px',
                }}
              >
                Explore Treatments
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-pills"
            style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', marginTop: '2.5rem' }}
          >
            {[
              { img: '/images/body_detox.jpg', label: 'Body Detox' },
              { img: '/images/hero_ayurveda.jpg', label: "Women's Wellness" },
              { img: '/images/bone_health.jpg', label: 'Bone Health' },
            ].map(({ img, label }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.375rem 0.875rem 0.375rem 0.375rem',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '100px',
              }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  overflow: 'hidden', flexShrink: 0,
                  border: '1px solid rgba(255,255,255,0.4)',
                }}>
                  <img src={img} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 500,
                  color: 'rgba(255,255,255,0.92)',
                  whiteSpace: 'nowrap',
                }}>
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
        background: 'linear-gradient(to top, var(--color-forest) 0%, transparent 100%)',
        zIndex: 3,
      }} aria-hidden />

      <style>{`
        @media (max-width: 640px) {
          .hero-cta-group {
            flex-direction: column;
            align-items: stretch !important;
          }
          .hero-btn {
            width: 100% !important;
            justify-content: center;
          }
          .hero-content-box {
            padding: 3rem 0 1rem !important;
          }
        }
      `}</style>
    </section>
  )
}
