import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function SuvarnaPreview() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ overflow: 'hidden' }}>
      <title>Suvarna Prasha — Traditional Ayurvedic Formulation | IR Veda Clinic</title>
      <meta name="description" content="Learn about Suvarna Prasha — a classical Ayurvedic formulation. Consultation and personalized guidance available at IR Veda Clinic." />

      <section style={{ background: 'linear-gradient(135deg, #fdf8f0, #f5edd8)', paddingTop: 'clamp(5rem, 8vw, 7.5rem)', paddingBottom: '3.5rem' }}>
        <div className="section-wrapper" style={{ maxWidth: '800px' }}>
          <div className="section-tag" style={{ color: 'var(--color-gold)', marginBottom: '0.5rem' }}>Traditional Ayurveda</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.75rem', lineHeight: 1.15 }}>
            Suvarna Prasha
          </h1>
          <p style={{ color: 'var(--color-text-body)', lineHeight: 1.7, fontSize: '0.9375rem', marginBottom: '1.75rem' }}>
            An ancient Ayurvedic classical formulation with deep roots in traditional Indian medicine. Consultation and personalized guidance are available at IR Veda Clinic.
          </p>
          <Link to="/book-appointment?service=suvarna-prasha" className="btn-primary" style={{ width: '100%', maxWidth: '280px' }}>Consult About Suvarna Prasha</Link>
        </div>
      </section>

      <section style={{ background: 'white', padding: 'clamp(3rem, 5vw, 5rem) 0' }}>
        <div className="section-wrapper" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }} className="suvarna-grid">
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3.5vw, 1.875rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '1rem' }}>What is Suvarna Prasha?</h2>
              <p style={{ color: 'var(--color-text-body)', lineHeight: 1.75, marginBottom: '0.875rem', fontSize: '0.9375rem' }}>
                Suvarna Prasha is a classical Ayurvedic formulation mentioned in ancient Ayurvedic texts. It traditionally contains Swarna Bhasma (processed gold) combined with medicinal herbs and ghee.
              </p>
              <p style={{ color: 'var(--color-text-body)', lineHeight: 1.75, fontSize: '0.9375rem' }}>
                In traditional Ayurveda, it has been used as a Swarnprashana, a ritual practice with documented classical references. Its use and appropriateness are determined after thorough consultation.
              </p>
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3.5vw, 1.875rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '1rem' }}>Who May Consider It?</h2>
              <p style={{ color: 'var(--color-text-body)', lineHeight: 1.75, marginBottom: '0.875rem', fontSize: '0.9375rem' }}>
                Suvarna Prasha consultation is available for various age groups. Suitability, dosage, and administration are determined after a personal consultation with the practitioner.
              </p>
              <div style={{ padding: '1rem', background: 'rgba(201,168,76,0.08)', borderRadius: '12px', border: '1px solid rgba(201,168,76,0.2)' }}>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-brown)', lineHeight: 1.55 }}>
                  <strong>Disclaimer:</strong> We do not claim Suvarna Prasha guarantees immunity enhancement or disease prevention. All recommendations are provided after consultation.
                </p>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--color-cream)', borderRadius: '20px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '2.5rem', border: '1px solid var(--color-beige)' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.375rem', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '1.25rem' }}>Consultation Process</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '0.875rem' }}>
              {['Book Appointment', 'Health Assessment', 'Consultation with Doctor', 'Personalized Guidance'].map((s, i) => (
                <div key={i} style={{ background: 'white', borderRadius: '14px', padding: '1rem', textAlign: 'center', border: '1px solid var(--color-beige)' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: 'rgba(74,124,89,0.12)', marginBottom: '0.25rem' }}>0{i + 1}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-forest)' }}>{s}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {[
              { q: 'Is Suvarna Prasha safe?', a: 'Safety and suitability are assessed individually during consultation. It should only be used under appropriate Ayurvedic guidance.' },
              { q: 'What is the frequency of administration?', a: 'Administration frequency and duration are determined individually after consultation based on the person\'s health profile.' },
              { q: 'Can it be taken alongside other medicines?', a: 'This is addressed during your consultation. Please inform the practitioner of all current medicines and supplements.' },
            ].map((faq, i) => (
              <div key={i} style={{ background: 'var(--color-cream)', borderRadius: '14px', padding: '1.25rem', border: '1px solid var(--color-beige)' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '0.375rem' }}>{faq.q}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--color-forest)', padding: 'clamp(3.5rem, 6vw, 4.5rem) 1.25rem', textAlign: 'center' }}>
        <div className="section-wrapper" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>Book a Suvarna Prasha Consultation</h2>
          <p style={{ color: 'rgba(255,255,255,0.76)', marginBottom: '1.75rem', fontSize: '0.9375rem' }}>Get personalized guidance from our practitioner.</p>
          <Link to="/book-appointment?service=suvarna-prasha" className="btn-gold" style={{ width: '100%', maxWidth: '280px' }}>Consult About Suvarna Prasha</Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .suvarna-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.div>
  )
}
