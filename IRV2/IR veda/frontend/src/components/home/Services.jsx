import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Flower2, HeartPulse, Sparkles, Leaf, Scale, Droplets, ShieldCheck, Activity } from 'lucide-react'

const services = [
  {
    id: 'womens-wellness',
    category: "Women's Wellness",
    tagline: "Holistic care for PCOD, PCOS, fertility concerns, and women's overall vitality.",
    accent: '#c9a84c',
    icon: Flower2,
    count: 4,
  },
  {
    id: 'digestive-detox',
    category: 'Digestive & Detox',
    tagline: 'Signature body detox programs, digestive wellness, and metabolic balance.',
    accent: '#4a7c59',
    icon: Leaf,
    count: 3,
  },
  {
    id: 'skin-health',
    category: 'Skin Health',
    tagline: 'Traditional care for psoriasis, skin wellness, and deep cellular rejuvenation.',
    accent: '#7ab648',
    icon: Sparkles,
    count: 3,
  },
  {
    id: 'hormonal-metabolic',
    category: 'Hormonal & Metabolic',
    tagline: 'Personalized support for thyroid function, diabetes wellness, and hormonal balance.',
    accent: '#8b6b4a',
    icon: Scale,
    count: 3,
  },
  {
    id: 'kidney-urinary',
    category: 'Kidney & Urinary',
    tagline: 'Ayurvedic consultation for kidney and gallbladder stones and urinary wellness.',
    accent: '#4a7c59',
    icon: Droplets,
    count: 3,
  },
  {
    id: 'immune-allergy',
    category: 'Immune & Allergy',
    tagline: 'Targeted support for allergies, natural immunity building, and respiratory health.',
    accent: '#c9a84c',
    icon: ShieldCheck,
    count: 3,
  },
  {
    id: 'bone-joint',
    category: 'Bone & Joint',
    tagline: 'Bone health assessments, joint wellness, and custom Ayurvedic preparations.',
    accent: '#8b6b4a',
    icon: Activity,
    count: 4,
  },
  {
    id: 'specialized-ayurveda',
    category: 'Specialized Ayurveda',
    tagline: 'Suvarna Prasha consultations, bespoke formulations, and authentic classical care.',
    accent: '#c9a84c',
    icon: HeartPulse,
    count: 4,
  },
]

export default function Services() {
  return (
    <section style={{ background: 'var(--color-cream-dark)', padding: 'clamp(3.5rem, 6vw, 6rem) 0', overflow: 'hidden' }}>
      <div className="section-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>Our Services</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.75rem' }}>
            Treatments & Health Concerns
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '540px', margin: '0 auto', fontSize: '0.9375rem', lineHeight: 1.7 }}>
            All treatment recommendations are individualized based on your consultation. We follow responsible Ayurvedic care without making guaranteed outcome claims.
          </p>
        </div>

        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: '1.25rem' }}>
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <Link
                  to={`/treatments#${service.id}`}
                  style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                >
                  <div
                    className="card service-card"
                    style={{
                      padding: '1.5rem',
                      background: 'white',
                      borderTop: `3px solid ${service.accent}`,
                      borderRadius: '16px',
                      cursor: 'pointer',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.875rem',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                    }}
                  >
                    {/* Icon + badge row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{
                        width: '42px', height: '42px', borderRadius: '12px',
                        background: 'var(--color-cream)',
                        border: '1px solid var(--color-beige)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: service.accent,
                        flexShrink: 0,
                      }}>
                        <Icon size={20} />
                      </div>
                      <span style={{
                        fontSize: '0.75rem', fontWeight: 600,
                        color: service.accent,
                        background: 'var(--color-cream)',
                        border: '1px solid var(--color-beige)',
                        borderRadius: '999px',
                        padding: '0.2rem 0.65rem',
                        letterSpacing: '0.02em',
                      }}>
                        {service.count} treatments
                      </span>
                    </div>

                    {/* Category name & description */}
                    <div>
                      <h3 style={{
                        fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 600,
                        color: 'var(--color-forest)', marginBottom: '0.4rem', lineHeight: 1.3,
                      }}>
                        {service.category}
                      </h3>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                        {service.tagline}
                      </p>
                    </div>

                    {/* Explore CTA */}
                    <div style={{
                      marginTop: 'auto',
                      paddingTop: '0.5rem',
                      display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                      fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-earth)',
                    }}>
                      View Treatments <ArrowRight size={13} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to="/treatments" className="btn-secondary" style={{ width: '100%', maxWidth: '280px' }}>
            View All Treatments <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }
        @media (max-width: 580px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

