import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Utensils, Leaf, Dumbbell, Sparkles, ClipboardCheck } from 'lucide-react'

export default function BoneHealth() {
  const cards = [
    { icon: Search, title: 'Individual Assessment', desc: 'Comprehensive evaluation of your bone health profile, lifestyle, and dietary habits before any recommendations.' },
    { icon: Utensils, title: 'Dietary Recommendations', desc: 'Personalized guidance on calcium-rich foods, dietary habits, and nutritional support for bone wellness through Ayurvedic principles.' },
    { icon: Leaf, title: 'Ayurvedic Herbal Support', desc: 'Customized Ayurvedic herb and formulation recommendations based on your individual assessment and health profile.' },
    { icon: Dumbbell, title: 'Lifestyle Guidance', desc: 'Practical lifestyle recommendations including appropriate physical activity, sleep, and daily routine for bone health support.' },
    { icon: Sparkles, title: 'Customized Bone Health Medicines', desc: 'Individualized Ayurvedic bone health formulations prepared based on your specific consultation findings.' },
    { icon: ClipboardCheck, title: 'Ongoing Follow-up', desc: 'Regular check-ins to assess progress and adjust recommendations as your health journey evolves.' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ overflow: 'hidden' }}>
      <title>Bone Health Ayurveda — Personalized Joint & Bone Wellness | IR Veda Clinic</title>
      <meta name="description" content="Personalized Ayurvedic support for bone health, joint wellness, and musculoskeletal care. Individual assessment and customized recommendations at IR Veda Clinic." />

      <section style={{ background: 'linear-gradient(135deg, #f0f5f2, #e5ede8)', paddingTop: 'clamp(5rem, 8vw, 7.5rem)', paddingBottom: '3.5rem' }}>
        <div className="section-wrapper">
          <div className="section-tag" style={{ marginBottom: '0.5rem' }}>Bone & Joint Wellness</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.75rem', lineHeight: 1.15, maxWidth: '700px' }}>
            Personalized Ayurvedic Support for Bone Health
          </h1>
          <p style={{ color: 'var(--color-text-body)', maxWidth: '560px', lineHeight: 1.7, marginBottom: '2rem', fontSize: '0.9375rem' }}>
            A holistic, personalized approach to bone and joint health through Ayurvedic assessment, dietary guidance, and customized recommendations based on your individual needs.
          </p>
          <Link to="/book-appointment?service=bone-health" className="btn-primary" style={{ width: '100%', maxWidth: '280px' }}>Book Bone Health Consultation</Link>
        </div>
      </section>

      <section style={{ background: 'white', padding: 'clamp(3rem, 5vw, 5rem) 0' }}>
        <div className="section-wrapper">
          <div className="bone-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {cards.map((card, i) => {
              const IconComponent = card.icon
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.05 }} style={{
                  background: 'var(--color-cream)', borderRadius: '18px', padding: '1.5rem',
                  border: '1px solid rgba(74,124,89,0.1)',
                }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '12px',
                    background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '0.875rem', border: '1px solid var(--color-beige)',
                  }}>
                    <IconComponent size={20} color="var(--color-earth)" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '0.375rem' }}>{card.title}</h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{card.desc}</p>
                </motion.div>
              )
            })}
          </div>
          <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(74,124,89,0.06)', borderRadius: '14px', border: '1px solid rgba(74,124,89,0.15)' }}>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-body)', lineHeight: 1.6 }}>
              <strong>Note:</strong> Ayurvedic bone health support is complementary wellness care. It is not a replacement for medical diagnosis or treatment. Please consult your physician for any serious bone or joint conditions.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--color-forest)', padding: 'clamp(3.5rem, 6vw, 4.5rem) 1.25rem', textAlign: 'center' }}>
        <div className="section-wrapper" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>Start Your Bone Health Journey</h2>
          <p style={{ color: 'rgba(255,255,255,0.76)', marginBottom: '1.75rem', fontSize: '0.9375rem' }}>Personalized Ayurvedic support for stronger, healthier bones.</p>
          <Link to="/book-appointment?service=bone-health" className="btn-gold" style={{ width: '100%', maxWidth: '280px' }}>Book Bone Health Consultation</Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 600px) {
          .bone-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  )
}
