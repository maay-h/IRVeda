import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, MessageCircle, CalendarCheck, Navigation, User } from 'lucide-react'

const rawNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '918497005472'
const WHATSAPP = rawNumber.replace(/[^0-9]/g, '')
const DEFAULT_MSG = encodeURIComponent("Hello Dr. Yakhooth Naveen, I would like to book an Ayurvedic consultation at IR Veda Clinic, Mysore.")
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}?text=${DEFAULT_MSG}`

export default function ContactSection() {

  return (
    <section style={{ background: 'var(--color-cream)', padding: 'clamp(3.5rem, 6vw, 6rem) 0', overflow: 'hidden' }}>
      <div className="section-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>Find Us</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
            Get in Touch
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '520px', margin: '0 auto', fontSize: '0.9375rem' }}>
            Visit our clinic in Mysore or reach out for personalized Ayurvedic consultation.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2rem', alignItems: 'start' }} className="contact-grid">
          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Doctor */}
            <div style={{
              background: 'white', borderRadius: '16px', padding: '1rem 1.25rem',
              display: 'flex', gap: '0.875rem', alignItems: 'flex-start',
              boxShadow: '0 2px 12px rgba(26,58,42,0.04)',
              border: '1px solid var(--color-beige)',
            }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--color-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <User size={18} color="var(--color-forest)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.125rem' }}>Ayurvedic Physician</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-forest)', lineHeight: 1.3 }}>Dr. Yakhooth Naveen</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-earth)', fontWeight: 500 }}>BAMS, PGDHM</div>
              </div>
            </div>

            {/* Address */}
            <div style={{
              background: 'white', borderRadius: '16px', padding: '1rem 1.25rem',
              display: 'flex', gap: '0.875rem', alignItems: 'flex-start',
              boxShadow: '0 2px 12px rgba(26,58,42,0.04)',
              border: '1px solid var(--color-beige)',
            }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--color-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={18} color="var(--color-earth)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.125rem' }}>Clinic Address</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-dark)', lineHeight: 1.5, fontWeight: 500 }}>
                  #2828, B.N STREET, MANDI MOHALLA,<br />MYSORE — 570001, KARNATAKA
                </div>
              </div>
            </div>

            {/* Phone */}
            <div style={{
              background: 'white', borderRadius: '16px', padding: '1rem 1.25rem',
              display: 'flex', gap: '0.875rem', alignItems: 'flex-start',
              boxShadow: '0 2px 12px rgba(26,58,42,0.04)',
              border: '1px solid var(--color-beige)',
            }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--color-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={18} color="var(--color-brown)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.125rem' }}>Phone Numbers</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-dark)', lineHeight: 1.6 }}>
                  <a href="tel:+918497005472" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>+91 84970 05472</a> (Primary)<br />
                  <a href="tel:+918217001340" style={{ color: 'inherit', textDecoration: 'none' }}>+91 821 700 1340</a><br />
                  <a href="tel:+919960964395" style={{ color: 'inherit', textDecoration: 'none' }}>+91 99609 64395</a>
                </div>
              </div>
            </div>

            {/* Email & Hours */}
            <div style={{
              background: 'white', borderRadius: '16px', padding: '1rem 1.25rem',
              display: 'flex', gap: '0.875rem', alignItems: 'flex-start',
              boxShadow: '0 2px 12px rgba(26,58,42,0.04)',
              border: '1px solid var(--color-beige)',
            }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--color-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mail size={18} color="var(--color-gold-dark)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.125rem' }}>Email & Hours</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-dark)', lineHeight: 1.5 }}>
                  <a href="mailto:Irveda@gmail.com" style={{ color: 'var(--color-earth)', textDecoration: 'none', fontWeight: 600 }}>Irveda@gmail.com</a>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Mon–Sat: 9:00 AM – 7:00 PM | Sun: By Appt</div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
              background: '#25D366', color: 'white',
              padding: '0.875rem 1.25rem', borderRadius: '14px',
              textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem',
              transition: 'all 0.2s',
              minHeight: '46px',
            }}
            >
              <MessageCircle size={19} fill="white" />
              Chat on WhatsApp (+91 84970 05472)
            </a>
            <Link to="/book-appointment" className="btn-primary" style={{ justifyContent: 'center' }}>
              <CalendarCheck size={18} />
              Book Your Consultation
            </Link>
          </div>

          {/* Interactive Google Map */}
          <div style={{
            background: 'white', borderRadius: '20px', overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(26,58,42,0.08)',
            border: '1px solid var(--color-beige)',
            minHeight: '460px',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ padding: '1rem 1.25rem', background: 'var(--color-cream)', borderBottom: '1px solid var(--color-beige)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1875rem', fontWeight: 600, color: 'var(--color-forest)', margin: 0 }}>
                  IR Veda Clinic — Mysore
                </h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Mandi Mohalla, Mysore — 570001</div>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=2828+B.N+Street+Mandi+Mohalla+Mysore+570001"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ fontSize: '0.75rem', padding: '0.375rem 0.875rem', minHeight: '32px' }}
              >
                <Navigation size={13} /> Open Maps
              </a>
            </div>
            <div style={{ flex: 1, minHeight: '380px', width: '100%', position: 'relative' }}>
              <iframe
                title="IR Veda Clinic Location"
                src="https://maps.google.com/maps?q=2828,+B.N+STREET,+MANDI+MOHALLA,+MYSORE+570001&t=&z=15&ie=UTF8&iwloc=&output=embed"
                style={{ width: '100%', height: '100%', minHeight: '380px', border: 'none' }}
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
