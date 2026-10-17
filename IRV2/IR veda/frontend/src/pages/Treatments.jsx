import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Flower2, HeartPulse, Sparkles, Activity, ShieldCheck, Droplets, Scale, Leaf } from 'lucide-react'

const allTreatments = [
  { id: 'womens-wellness', category: "Women's Wellness", icon: Flower2, accent: '#c9a84c', items: ['PCOD Wellness Support', 'PCOS Wellness Support', "Women's Fertility Wellness Consultation", "Women's General Health"] },
  { id: 'digestive-detox', category: 'Digestive & Detox', icon: Leaf, accent: '#4a7c59', items: ['Body Detox Program', 'Digestive Wellness', 'Metabolic Support'] },
  { id: 'skin-health', category: 'Skin Health', icon: Sparkles, accent: '#7ab648', items: ['Psoriasis Support', 'Skin Wellness', 'Ayurvedic Skin Care'] },
  { id: 'hormonal-metabolic', category: 'Hormonal & Metabolic', icon: Scale, accent: '#8b6b4a', items: ['Thyroid-Related Wellness', 'Diabetes-Related Wellness', 'Hormonal Balance Support'] },
  { id: 'kidney-urinary', category: 'Kidney & Urinary', icon: Droplets, accent: '#4a7c59', items: ['Kidney Stone-Related Wellness', 'Gallbladder Stone Support', 'Urinary Wellness'] },
  { id: 'immune-allergy', category: 'Immune & Allergy', icon: ShieldCheck, accent: '#c9a84c', items: ['Allergy Support', 'Immunity Wellness', 'Respiratory Support'] },
  { id: 'bone-joint', category: 'Bone & Joint', icon: Activity, accent: '#8b6b4a', items: ['Bone Health Assessment', 'Joint Wellness', 'Customized Bone Health Medicines', 'Ayurvedic Bone Support'] },
  { id: 'specialized-ayurveda', category: 'Specialized Ayurveda', icon: HeartPulse, accent: '#c9a84c', items: ['Suvarna Prasha Consultation', 'Customized Ayurvedic Medicines', 'Personalized Formulations', 'General Ayurvedic Consultation'] },
]

export default function Treatments() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '')
      const element = document.getElementById(targetId)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 120)
      }
    }
  }, [location.hash])
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ overflow: 'hidden' }}>
      <title>Treatments — Ayurvedic Services | IR Veda Clinic</title>
      <meta name="description" content="Explore all Ayurvedic treatments at IR Veda Clinic — Body Detox, Women's Wellness (PCOD/PCOS), Bone Health, Suvarna Prasha, Customized Medicines and more." />

      {/* Page Header */}
      <section style={{ background: 'var(--color-cream)', paddingTop: 'clamp(5rem, 8vw, 7.5rem)', paddingBottom: '3.5rem' }}>
        <div className="section-wrapper">
          <div className="section-tag" style={{ marginBottom: '0.5rem' }}>Our Services</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.75rem' }}>
            Treatments & Health Concerns
          </h1>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '560px', lineHeight: 1.7, fontSize: '0.9375rem' }}>
            Every treatment recommendation is personalized based on individual consultation. We do not offer generic programs or claim guaranteed outcomes.
          </p>
        </div>
      </section>

      {/* Treatments Grid */}
      <section style={{ background: 'white', padding: 'clamp(3rem, 5vw, 5rem) 0' }}>
        <div className="section-wrapper">
          {allTreatments.map((group, gi) => {
            const GroupIcon = group.icon
            return (
              <div key={gi} id={group.id} style={{ marginBottom: '3rem', scrollMarginTop: '5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '10px',
                    background: 'var(--color-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid var(--color-beige)',
                    color: group.accent,
                    flexShrink: 0,
                  }}>
                    <GroupIcon size={18} />
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.375rem', fontWeight: 600, color: 'var(--color-forest)' }}>
                    {group.category}
                  </h2>
                  <div style={{ flex: 1, height: '1px', background: 'var(--color-beige)' }} />
                </div>
                <div className="treatments-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: '1rem' }}>
                  {group.items.map((item, ii) => (
                    <motion.div
                      key={ii}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: ii * 0.05 }}
                      style={{
                        background: 'var(--color-cream)',
                        borderRadius: '16px', padding: '1.25rem',
                        border: '1px solid var(--color-beige)',
                        display: 'flex', flexDirection: 'column',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: group.accent, flexShrink: 0 }} />
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.0625rem', fontWeight: 600, color: 'var(--color-forest)' }}>
                          {item}
                        </h3>
                      </div>
                      <Link to="/book-appointment" style={{
                        marginTop: 'auto',
                        display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                        fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-earth)',
                        textDecoration: 'none',
                      }}
                      >
                        Book Consultation <ArrowRight size={12} />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--color-forest)', padding: 'clamp(3.5rem, 6vw, 4.5rem) 1.25rem', textAlign: 'center' }}>
        <div className="section-wrapper" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>
            Not Sure Which Service is Right for You?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.76)', marginBottom: '1.75rem', fontSize: '0.9375rem' }}>
            Book a general Ayurvedic consultation and our practitioner will guide you.
          </p>
          <Link to="/book-appointment" className="btn-gold" style={{ width: '100%', maxWidth: '280px' }}>
            Book a General Consultation
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 580px) {
          .treatments-card-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  )
}
