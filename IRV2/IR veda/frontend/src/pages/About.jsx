import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Target, Leaf, MessageCircle, Package, RefreshCw, Award, Stethoscope, MapPin, Phone, Mail, CalendarCheck } from 'lucide-react'

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ overflow: 'hidden' }}>
      <title>About Dr. Yakhooth Naveen — IR Veda Clinic Mysore</title>
      <meta name="description" content="Learn about Dr. Yakhooth Naveen (BAMS, PGDHM) and IR Veda Clinic in Mysore. Traditional Ayurvedic wisdom, body detox, and personalized wellness." />

      <section style={{ background: 'var(--color-cream)', paddingTop: 'clamp(5rem, 8vw, 7.5rem)', paddingBottom: '3.5rem' }}>
        <div className="section-wrapper">
          <div className="section-tag" style={{ marginBottom: '0.5rem' }}>About the Clinic & Practitioner</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '1rem', lineHeight: 1.12, maxWidth: '750px' }}>
            Traditional Ayurvedic Wisdom.<br />
            <em style={{ color: 'var(--color-earth)', fontStyle: 'italic' }}>Led by Dr. Yakhooth Naveen</em>
          </h1>
          <p style={{ color: 'var(--color-text-body)', maxWidth: '640px', lineHeight: 1.7, fontSize: '0.9375rem' }}>
            Located in Mandi Mohalla, Mysore, IR Veda Clinic provides personalized Ayurvedic consultation, wellness treatments, body detox programs, and customized medicines tailored to individual health needs.
          </p>
        </div>
      </section>

      {/* Practitioner Profile */}
      <section style={{ background: 'white', padding: 'clamp(3rem, 5vw, 5rem) 0' }}>
        <div className="section-wrapper">
          <div style={{
            background: 'linear-gradient(135deg, #fdfaf4 0%, #f7efe2 100%)',
            borderRadius: '24px',
            border: '1px solid var(--color-beige)',
            padding: 'clamp(1.75rem, 4vw, 3.5rem)',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '2.5rem',
            alignItems: 'center',
          }} className="practitioner-card-grid">
            <div>
              <div className="section-tag" style={{ marginBottom: '0.5rem' }}>Chief Ayurvedic Physician</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.25rem' }}>
                Dr. Yakhooth Naveen
              </h2>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(201,168,76,0.18)', color: 'var(--color-brown)', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '1.25rem' }}>
                <Award size={14} color="var(--color-gold-dark)" />
                BAMS, PGDHM
              </div>
              <p style={{ color: 'var(--color-text-body)', lineHeight: 1.7, marginBottom: '1rem', fontSize: '0.9375rem' }}>
                Dr. Yakhooth Naveen is dedicated to authentic, patient-first Ayurvedic healthcare. With extensive clinical training in traditional Ayurvedic diagnostics, Prakriti assessment, and holistic health management, Dr. Naveen emphasizes addressing the root cause of imbalances rather than merely masking symptoms.
              </p>
              <p style={{ color: 'var(--color-text-body)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
                At IR Veda Clinic, each consultation is personal and detailed — integrating dietary guidance, lifestyle modifications, herbal formulations, and therapeutic wellness regimens tailored to each individual.
              </p>
              <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
                <Link to="/book-appointment" className="btn-primary">
                  <CalendarCheck size={17} /> Book Consultation
                </Link>
                <a href="tel:+918497005472" className="btn-secondary">
                  <Phone size={16} /> +91 84970 05472
                </a>
              </div>
            </div>

            {/* Highlights Box */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '1.75rem', border: '1px solid var(--color-beige)', boxShadow: '0 8px 32px rgba(26,58,42,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-cream-dark)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(74,124,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Stethoscope size={20} color="var(--color-earth)" />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-forest)' }}>Clinical Focus Areas</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>IR Veda Clinic, Mysore</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'Personalized Body Detox & Rejuvenation',
                  "Women's Wellness (PCOD, PCOS, Hormonal Balance)",
                  'Bone & Joint Health Management',
                  'Customized Herbal Medicines & Formulations',
                  'Chronic Disorder Consultation & Dietetics',
                  'Suvarna Prasha Child Immunity Guidance',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-earth)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-body)' }}>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-cream-dark)', fontSize: '0.8125rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={15} color="var(--color-earth)" style={{ flexShrink: 0 }} />
                <span>#2828, B.N Street, Mandi Mohalla, Mysore 570001</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section style={{ background: 'var(--color-cream)', padding: 'clamp(3rem, 5vw, 5rem) 0' }}>
        <div className="section-wrapper">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }} className="about-grid">
            <div>
              <div className="section-tag" style={{ marginBottom: '0.5rem' }}>Our Philosophy</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '1rem' }}>
                Patient-First, Always Personal
              </h2>
              <p style={{ color: 'var(--color-text-body)', lineHeight: 1.7, marginBottom: '0.875rem', fontSize: '0.9375rem' }}>
                At IR Veda Clinic, we believe that every individual is unique. Two people may present with the same health concern but require entirely different care approaches based on their constitution (Prakriti), lifestyle, and history.
              </p>
              <p style={{ color: 'var(--color-text-body)', lineHeight: 1.7, marginBottom: '0.875rem', fontSize: '0.9375rem' }}>
                Our practice is rooted in the foundational principles of Ayurveda — understanding the whole person rather than just treating symptoms. We listen, assess, and guide.
              </p>
              <p style={{ color: 'var(--color-text-body)', lineHeight: 1.7, fontSize: '0.9375rem' }}>
                We are committed to responsible Ayurvedic practice — communicating clearly, setting realistic expectations, and providing care that supports your individual wellness journey.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[
                { icon: Target, title: 'Individual Assessment', desc: 'Every patient receives a thorough evaluation by Dr. Yakhooth Naveen before recommendations are made.' },
                { icon: Leaf, title: 'Personalized Plans', desc: 'Your wellness plan is tailored to your specific health profile and Ayurvedic constitution.' },
                { icon: MessageCircle, title: 'Clear Communication', desc: 'We explain everything clearly without making unsupported medical claims.' },
                { icon: Package, title: 'Dedicated In-Clinic Care', desc: 'Thorough personal evaluation, authentic formulations, and holistic health guidance at our Mysore clinic.' },
                { icon: RefreshCw, title: 'Ongoing Guidance', desc: 'Your wellness journey is supported with follow-ups and continuous practitioner care.' },
              ].map((item, i) => {
                const IconComponent = item.icon
                return (
                  <div key={i} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start', padding: '1rem', background: 'white', borderRadius: '14px', border: '1px solid var(--color-beige)' }}>
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '10px',
                      background: 'var(--color-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, border: '1px solid var(--color-beige)',
                    }}>
                      <IconComponent size={18} color="var(--color-earth)" />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '0.125rem' }}>{item.title}</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--color-forest)', padding: 'clamp(3.5rem, 6vw, 4.5rem) 1.25rem', textAlign: 'center' }}>
        <div className="section-wrapper" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>
            Start Your Wellness Journey with Us
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.76)', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
            Consult Dr. Yakhooth Naveen at IR Veda Clinic in Mandi Mohalla, Mysore.
          </p>
          <Link to="/book-appointment" className="btn-gold" style={{ width: '100%', maxWidth: '280px' }}>
            Book a Consultation
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .practitioner-card-grid { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </motion.div>
  )
}
