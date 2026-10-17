import { Link } from 'react-router-dom'
import { CalendarCheck, ArrowRight } from 'lucide-react'

export default function AppointmentCTA() {
  return (
    <section style={{
      background: 'var(--color-forest)',
      padding: 'clamp(3.5rem, 6vw, 5rem) 1.25rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div aria-hidden style={{ position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(201,168,76,0.07)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold-light)', marginBottom: '0.75rem' }}>
          ✦ Take the First Step
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.875rem, 4.5vw, 3.25rem)', fontWeight: 700, color: 'white', lineHeight: 1.15, marginBottom: '1rem' }}>
          Begin Your Ayurvedic Wellness Journey Today
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.76)', fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)', lineHeight: 1.7, marginBottom: '2rem' }}>
          Book your personalized consultation and take the first step towards balanced, holistic health guided by traditional Ayurvedic wisdom.
        </p>
        <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/book-appointment" className="btn-gold" style={{ fontSize: '0.9375rem', padding: '0.875rem 2rem', width: '100%', maxWidth: '280px' }}>
            <CalendarCheck size={18} />
            Book an Appointment
          </Link>
          <Link to="/contact" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            padding: '0.875rem 1.75rem',
            border: '1.5px solid rgba(255,255,255,0.4)',
            borderRadius: '100px',
            fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 500,
            color: 'rgba(255,255,255,0.9)', textDecoration: 'none',
            transition: 'all 0.3s',
            width: '100%', maxWidth: '260px',
            minHeight: '46px',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.9)' }}
          >
            Visit Our Clinic
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
