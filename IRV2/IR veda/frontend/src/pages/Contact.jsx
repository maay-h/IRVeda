import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, MessageCircle, CalendarCheck, Navigation, User } from 'lucide-react'

const rawNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '918497005472'
const WHATSAPP = rawNumber.replace(/[^0-9]/g, '')
const DEFAULT_MSG = encodeURIComponent("Hello Dr. Yakhooth Naveen, I would like to book an Ayurvedic consultation at IR Veda Clinic, Mysore.")
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}?text=${DEFAULT_MSG}`

export default function Contact() {

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ overflow: 'hidden' }}>
      <title>Contact IR Veda Clinic — Dr. Yakhooth Naveen | Mysore</title>
      <meta name="description" content="Get in touch with IR Veda Clinic in Mandi Mohalla, Mysore. Consult Dr. Yakhooth Naveen (BAMS, PGDHM) for personalized Ayurvedic care." />

      <section style={{ background: 'var(--color-cream)', paddingTop: 'clamp(5rem, 8vw, 7.5rem)', paddingBottom: '2.5rem' }}>
        <div className="section-wrapper">
          <div className="section-tag" style={{ marginBottom: '0.5rem' }}>Contact Us</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.75rem' }}>
            Get in Touch
          </h1>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '560px', lineHeight: 1.7, fontSize: '0.9375rem' }}>
            Visit our clinic in Mysore or reach out by phone, WhatsApp, or email for appointments and personalized guidance.
          </p>
        </div>
      </section>

      <section style={{ background: 'white', padding: 'clamp(3rem, 5vw, 5rem) 0' }}>
        <div className="section-wrapper">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2.5rem' }} className="contact-page-grid">

            {/* Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {/* Doctor */}
              <div style={{ background: 'var(--color-cream)', borderRadius: '16px', padding: '1rem 1.25rem', display: 'flex', gap: '0.875rem', border: '1px solid var(--color-beige)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--color-beige)' }}>
                  <User size={18} color="var(--color-forest)" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.125rem' }}>Ayurvedic Physician</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-forest)' }}>Dr. Yakhooth Naveen</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-earth)', fontWeight: 500 }}>BAMS, PGDHM</div>
                </div>
              </div>

              {/* Address */}
              <div style={{ background: 'var(--color-cream)', borderRadius: '16px', padding: '1rem 1.25rem', display: 'flex', gap: '0.875rem', border: '1px solid var(--color-beige)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--color-beige)' }}>
                  <MapPin size={18} color="var(--color-earth)" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.125rem' }}>Clinic Location</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-dark)', lineHeight: 1.5, fontWeight: 500 }}>
                    #2828, B.N STREET, MANDI MOHALLA,<br />MYSORE — 570001, KARNATAKA
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div style={{ background: 'var(--color-cream)', borderRadius: '16px', padding: '1rem 1.25rem', display: 'flex', gap: '0.875rem', border: '1px solid var(--color-beige)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--color-beige)' }}>
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
              <div style={{ background: 'var(--color-cream)', borderRadius: '16px', padding: '1rem 1.25rem', display: 'flex', gap: '0.875rem', border: '1px solid var(--color-beige)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--color-beige)' }}>
                  <Mail size={18} color="var(--color-gold-dark)" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.125rem' }}>Email & Hours</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-dark)' }}>
                    <a href="mailto:Irveda@gmail.com" style={{ color: 'var(--color-earth)', textDecoration: 'none', fontWeight: 600 }}>Irveda@gmail.com</a>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Mon–Sat: 9:00 AM – 7:00 PM | Sun: By Appt</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem', background: '#25D366', color: 'white', padding: '0.875rem 1.25rem', borderRadius: '14px', textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', minHeight: '46px' }}>
                <MessageCircle size={19} fill="white" /> Chat on WhatsApp (+91 84970 05472)
              </a>
              <Link to="/book-appointment" className="btn-primary" style={{ justifyContent: 'center' }}>
                <CalendarCheck size={18} /> Book Consultation
              </Link>
            </div>

            {/* Live Map */}
            <div style={{ background: 'var(--color-cream)', borderRadius: '20px', overflow: 'hidden', minHeight: '460px', display: 'flex', flexDirection: 'column', border: '1px solid var(--color-beige)' }}>
              <div style={{ padding: '1rem 1.25rem', background: 'white', borderBottom: '1px solid var(--color-beige)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-forest)', margin: 0 }}>IR Veda Clinic</h2>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Mandi Mohalla, Mysore — 570001</div>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=2828+B.N+Street+Mandi+Mohalla+Mysore+570001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.375rem 0.875rem', minHeight: '32px' }}
                >
                  <Navigation size={13} /> Open in Maps
                </a>
              </div>
              <div style={{ flex: 1, minHeight: '400px', width: '100%' }}>
                <iframe
                  title="IR Veda Clinic Location Map"
                  src="https://maps.google.com/maps?q=2828,+B.N+STREET,+MANDI+MOHALLA,+MYSORE+570001&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  style={{ width: '100%', height: '100%', minHeight: '400px', border: 'none' }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{` @media (max-width: 768px) { .contact-page-grid { grid-template-columns: 1fr !important; } } `}</style>
    </motion.div>
  )
}
