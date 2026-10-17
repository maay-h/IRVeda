import { Link } from 'react-router-dom'
import { Leaf, Phone, Mail, MapPin, ArrowRight, Share2, Rss, Play, User } from 'lucide-react'
const Instagram = Share2, Facebook = Rss, Youtube = Play

const footerLinks = {
  Services: [
    { label: 'Body Detox', href: '/body-detox' },
    { label: "Women's Wellness", href: '/women-wellness' },
    { label: 'Suvarna Prasha', href: '/suvarna-prasha' },
    { label: 'Bone Health', href: '/bone-health' },
    { label: 'Ayurveda Medicines', href: '/ayurveda-medicines' },
    { label: 'All Treatments', href: '/treatments' },
  ],
  'Quick Links': [
    { label: 'Home', href: '/' },
    { label: 'About Dr. Yakhooth', href: '/about' },
    { label: 'Book Appointment', href: '/book-appointment' },
    { label: 'Contact Us', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-forest-dark)', color: 'rgba(255,255,255,0.8)' }}>
      {/* Main Footer */}
      <div className="section-wrapper" style={{ padding: 'clamp(3rem, 5vw, 4.5rem) 1.25rem 2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '2.5rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'var(--color-gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Leaf size={18} color="white" />
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.375rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>
                  IR Veda
                </span>
                <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--color-gold-light)', textTransform: 'uppercase' }}>
                  Clinic
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.7)', marginBottom: '0.75rem', maxWidth: '280px' }}>
              Led by <strong style={{ color: 'var(--color-gold-light)' }}>Dr. Yakhooth Naveen</strong> (BAMS, PGDHM). Personalized Ayurvedic care combining traditional wisdom with modern healthcare guidance.
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social Link" style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)', transition: 'all 0.2s',
                  textDecoration: 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-gold)'; e.currentTarget.style.color = 'white' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, items]) => (
            <div key={group}>
              <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold-light)', marginBottom: '1.125rem' }}>
                {group}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {items.map(item => (
                  <li key={item.href}>
                    <Link to={item.href} style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.65)', textDecoration: 'none',
                      transition: 'color 0.2s',
                      display: 'flex', alignItems: 'center', gap: '0.375rem',
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = 'white'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                    >
                      <ArrowRight size={12} />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold-light)', marginBottom: '1.125rem' }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Doctor */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <User size={14} color="var(--color-gold-light)" />
                </div>
                <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>
                  <strong>Dr. Yakhooth Naveen</strong><br />
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-light)' }}>BAMS, PGDHM</span>
                </span>
              </div>

              {/* Address */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={14} color="var(--color-gold-light)" />
                </div>
                <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                  #2828, B.N STREET, MANDI MOHALLA, MYSORE 570001
                </span>
              </div>

              {/* Phones */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={14} color="var(--color-gold-light)" />
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  <a href="tel:+918497005472" style={{ color: 'inherit', textDecoration: 'none' }}>+91 84970 05472</a><br />
                  <a href="tel:+918217001340" style={{ color: 'inherit', textDecoration: 'none' }}>+91 821 700 1340</a><br />
                  <a href="tel:+919960964395" style={{ color: 'inherit', textDecoration: 'none' }}>+91 99609 64395</a>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={14} color="var(--color-gold-light)" />
                </div>
                <a href="mailto:Irveda@gmail.com" style={{ fontSize: '0.8125rem', color: 'var(--color-gold-light)', textDecoration: 'none', lineHeight: 1.5 }}>
                  Irveda@gmail.com
                </a>
              </div>
            </div>
            <div style={{ marginTop: '1.25rem' }}>
              <h5 style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '0.375rem' }}>Clinic Hours</h5>
              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.65)' }}>Mon–Sat: 9:00 AM – 7:00 PM</p>
              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.65)' }}>Sunday: By Appointment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer + Copyright */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem 1.25rem' }}>
        <div className="section-wrapper">
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '0.75rem', textAlign: 'center' }}>
            <strong style={{ color: 'rgba(255,255,255,0.6)' }}>Medical Disclaimer:</strong> The information provided on this website is for general educational purposes only and is not a substitute for professional medical consultation. Treatment recommendations are individualized and provided after appropriate consultation.
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
            © {new Date().getFullYear()} IR Veda Clinic — Dr. Yakhooth Naveen (BAMS, PGDHM). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
