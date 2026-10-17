import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

const faqs = [
  { q: 'Is the Body Detox suitable for everyone?', a: 'Recommendations are made after an individual consultation. Suitability depends on your health profile, current conditions, and constitution. This will be assessed during your consultation.' },
  { q: 'How long does a Body Detox program take?', a: 'Duration varies based on individual needs and the personalized plan developed during consultation. There is no single standard timeline.' },
  { q: 'Do I need to stop my current medications?', a: 'No. Do not stop any existing medications without consulting your doctor. Dr. Yakhooth Naveen will take your current medications into account during the consultation.' },
  { q: 'Where is the Body Detox consultation conducted?', a: 'The consultation is conducted in-person by Dr. Yakhooth Naveen at IR Veda Clinic, #2828, B.N Street, Mandi Mohalla, Mysore.' },
]

export default function BodyDetox() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <title>Body Detox — Ayurvedic Detoxification | IR Veda Clinic Mysore</title>
      <meta name="description" content="Discover personalized Ayurvedic Body Detox at IR Veda Clinic in Mysore. Reset, rebalance, and rejuvenate with a customized detox program based on your individual constitution." />

      {/* Hero */}
      <section style={{ background: 'var(--color-forest)', padding: 'clamp(5rem, 8vw, 7.5rem) 0 clamp(3rem, 5vw, 4.5rem)', marginTop: '68px' }}>
        <div className="section-wrapper">
          <div style={{ maxWidth: '700px' }}>
            <div className="section-tag" style={{ color: 'var(--color-gold-light)', marginBottom: '0.75rem' }}>Signature Program</div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'white', lineHeight: 1.12, marginBottom: '1rem' }}>
              Body Detox — <em style={{ color: 'var(--color-gold-light)', fontStyle: 'italic' }}>Reset. Rebalance. Rejuvenate.</em>
            </h1>
            <p style={{ fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, marginBottom: '2rem' }}>
              A personalized Ayurvedic wellness program designed to support your body's natural processes through dietary guidance, herbal support, and lifestyle recommendations tailored to your individual constitution.
            </p>
            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
              <Link to="/book-appointment?service=body-detox" className="btn-gold" style={{ width: '100%', maxWidth: '300px' }}>
                Book a Body Detox Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image */}
      <section style={{ background: 'white' }}>
        <div className="section-wrapper" style={{ padding: '0 1.25rem' }}>
          <div style={{ marginTop: '-2.5rem', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(26,58,42,0.16)' }}>
            <img src="/images/body_detox.jpg" alt="Ayurvedic body detox herbs and preparations" style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* What is Ayurvedic Body Detox */}
      <section style={{ background: 'white', padding: 'clamp(3.5rem, 6vw, 5rem) 0' }}>
        <div className="section-wrapper">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }} className="two-col-grid">
            <div>
              <div className="section-tag" style={{ marginBottom: '0.5rem' }}>Understanding Detox</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '1rem' }}>
                What is Ayurvedic Body Detox?
              </h2>
              <p style={{ color: 'var(--color-text-body)', lineHeight: 1.7, marginBottom: '1rem', fontSize: '0.9375rem' }}>
                In Ayurveda, the body naturally accumulates metabolic waste (Ama) over time due to improper diet, stress, environmental factors, and irregular routines.
              </p>
              <p style={{ color: 'var(--color-text-body)', lineHeight: 1.7, marginBottom: '1rem', fontSize: '0.9375rem' }}>
                Ayurvedic body detox is not a crash diet or aggressive cleanse. It is a structured, gentle process designed to rekindle your digestive fire (Agni), eliminate accumulated toxins, and restore equilibrium to the three doshas — Vata, Pitta, and Kapha.
              </p>
              <p style={{ color: 'var(--color-text-body)', lineHeight: 1.7, fontSize: '0.9375rem' }}>
                Every detox program at IR Veda Clinic is individually tailored — guided by Dr. Yakhooth Naveen's clinical assessment rather than a generic protocol.
              </p>
            </div>
            <div style={{ background: 'var(--color-cream)', borderRadius: '20px', padding: '2rem', border: '1px solid var(--color-beige)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '1rem' }}>Who May Benefit?</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                A wellness-focused detox consultation may be helpful for individuals experiencing:
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {[
                  'Persistent sluggishness or lack of energy',
                  'Irregular digestion, bloating, or heaviness',
                  'Seasonal transitions and routine reset',
                  'Desire to improve overall dietary and lifestyle habits',
                  'Stress-related fatigue and mental fog',
                  'Individuals seeking proactive wellness maintenance',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
                    <CheckCircle2 size={16} color="var(--color-earth)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-body)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Process */}
      <section style={{ background: 'var(--color-cream)', padding: 'clamp(3.5rem, 6vw, 5rem) 0' }}>
        <div className="section-wrapper" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}>The Process</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 700, color: 'var(--color-forest)' }}>How the Consultation Works</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              { num: '01', title: 'Book Appointment', desc: 'Schedule a Body Detox consultation online or by phone.' },
              { num: '02', title: 'Clinical Health History', desc: 'Detailed review of your health background, dietary routine, and lifestyle.' },
              { num: '03', title: 'In-depth Consultation', desc: 'Discuss your health history, symptoms, and goals with Dr. Yakhooth Naveen.' },
              { num: '04', title: 'Personalized Assessment', desc: 'Assessment of your Prakriti and current doshic balance to create your plan.' },
              { num: '05', title: 'Diet & Lifestyle Guidance', desc: 'Receive individualized dietary, herbal, and daily routine recommendations.' },
              { num: '06', title: 'Ongoing Support', desc: 'Follow-up care and guidance throughout your wellness journey.' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(26,58,42,0.04)', border: '1px solid var(--color-beige)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '0.875rem', right: '0.875rem', fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: 'rgba(74,124,89,0.1)', lineHeight: 1 }}>{s.num}</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '0.375rem' }}>{s.title}</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'white', padding: 'clamp(3.5rem, 6vw, 5rem) 0' }}>
        <div className="section-wrapper" style={{ maxWidth: '760px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 700, color: 'var(--color-forest)' }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: 'var(--color-cream)', borderRadius: '14px', padding: '1.25rem', border: '1px solid var(--color-beige)' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '0.375rem' }}>{faq.q}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-body)', lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2rem', padding: '1rem 1.25rem', background: 'rgba(201,168,76,0.1)', borderRadius: '12px', border: '1px solid rgba(201,168,76,0.2)' }}>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-brown)', lineHeight: 1.6 }}>
              <strong>Disclaimer:</strong> Ayurvedic body detox is a supportive wellness program. Treatment recommendations are provided after clinical consultation and should not be interpreted as guaranteed medical outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--color-forest)', padding: 'clamp(3.5rem, 6vw, 4.5rem) 1.25rem', textAlign: 'center' }}>
        <div className="section-wrapper" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>
            Ready to Reset and Rebalance?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.76)', marginBottom: '1.75rem', fontSize: '0.9375rem' }}>
            Book your personalized Body Detox consultation with Dr. Yakhooth Naveen at IR Veda Clinic, Mysore.
          </p>
          <Link to="/book-appointment?service=body-detox" className="btn-gold" style={{ width: '100%', maxWidth: '280px' }}>
            Book Consultation
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .two-col-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.div>
  )
}
