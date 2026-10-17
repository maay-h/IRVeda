import { Link } from 'react-router-dom'
import { CalendarCheck, MessageSquareHeart } from 'lucide-react'

export default function Testimonials() {
  return (
    <section style={{ background: 'var(--color-cream-dark)', padding: '6rem 0' }}>
      <div className="section-wrapper" style={{ maxWidth: '1280px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>Patient Stories</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.875rem, 3.5vw, 2.875rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.875rem' }}>
            Patient Testimonials
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            We are in the process of collecting authentic patient experiences. Genuine testimonials will be added here shortly.
          </p>
        </div>

        <div style={{
          background: 'white', borderRadius: '24px',
          padding: '4rem 2.5rem',
          textAlign: 'center',
          boxShadow: '0 4px 24px rgba(26,58,42,0.06)',
          border: '1px solid var(--color-beige)',
        }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'rgba(74,124,89,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}>
            <MessageSquareHeart size={32} color="var(--color-earth)" />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '1rem' }}>
            Patient Stories Coming Soon
          </h3>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            We believe in authentic experiences. Only genuine, verified patient testimonials will appear here — provided directly by patients.
          </p>
          <Link to="/book-appointment" className="btn-primary">
            <CalendarCheck size={17} />
            Be Part of the IR Veda Story
          </Link>
        </div>
      </div>
    </section>
  )
}
