import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Activity } from 'lucide-react'

const previews = [
  {
    title: 'Suvarna Prasha',
    subtitle: 'Traditional Ayurvedic Formulation',
    icon: Sparkles,
    desc: 'An ancient Ayurvedic tradition — consultation and personalized guidance available for those interested in exploring this classical formulation.',
    href: '/suvarna-prasha',
    bg: 'linear-gradient(135deg, #fdf6f0, #f5e8d0)',
    accent: 'var(--color-gold)',
    img: '/images/hero_ayurveda.jpg',
  },
  {
    title: 'Bone Health Ayurveda',
    subtitle: 'Personalized Bone & Joint Wellness',
    icon: Activity,
    desc: 'Individual assessment, dietary recommendations, and customized Ayurvedic support for bone health and overall musculoskeletal wellbeing.',
    href: '/bone-health',
    bg: 'linear-gradient(135deg, #f0f5f2, #e0ede5)',
    accent: 'var(--color-earth)',
    img: '/images/bone_health.jpg',
  },
]

export default function SpecialtyPreviews() {
  return (
    <section style={{ background: 'var(--color-cream-dark)', padding: 'clamp(3.5rem, 6vw, 6rem) 0', overflow: 'hidden' }}>
      <div className="section-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>Specialized Care</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 700, color: 'var(--color-forest)' }}>
            Specialized Ayurvedic Programs
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="specialty-grid">
          {previews.map((p, i) => {
            const IconComponent = p.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  background: p.bg,
                  borderRadius: '24px',
                  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                  border: `1px solid rgba(74,124,89,0.12)`,
                  position: 'relative', overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}
              >
                {/* Background image preview container */}
                <div style={{
                  position: 'absolute', top: 0, right: 0, width: '45%', height: '100%',
                  opacity: 0.12,
                  backgroundImage: `url(${p.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  maskImage: 'linear-gradient(to left, black, transparent)',
                  WebkitMaskImage: 'linear-gradient(to left, black, transparent)',
                  pointerEvents: 'none',
                }} />

                <div>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }}>
                    <IconComponent size={22} color={p.accent} />
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: p.accent, marginBottom: '0.375rem' }}>
                    {p.subtitle}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.375rem, 3vw, 1.75rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-body)', lineHeight: 1.65, marginBottom: '1.5rem', maxWidth: '440px' }}>
                    {p.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', position: 'relative', zIndex: 2, alignItems: 'center' }}>
                  <Link to={`/book-appointment?service=${p.href.replace('/', '')}`} className="btn-primary" style={{ padding: '0.625rem 1.375rem', fontSize: '0.875rem', width: '100%', maxWidth: '200px' }}>
                    Book Consultation
                  </Link>
                  <Link to={p.href} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                    fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500,
                    color: 'var(--color-earth)', textDecoration: 'none',
                    padding: '0.375rem',
                  }}>
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .specialty-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
