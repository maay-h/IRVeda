import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, FileText, Stethoscope, Sparkles, FlaskConical, PackageCheck } from 'lucide-react'

export default function AyurvedaMedicines() {
  const steps = [
    { icon: Calendar, title: 'Book Consultation', desc: 'Schedule an in-person appointment at our Mysore clinic.' },
    { icon: FileText, title: 'Clinical Health Evaluation', desc: 'Detailed review of your health history, diet, and lifestyle.' },
    { icon: Stethoscope, title: 'Doctor Consultation', desc: 'In-depth consultation and Prakriti assessment with Dr. Yakhooth Naveen.' },
    { icon: Sparkles, title: 'Personalized Recommendations', desc: 'Receive your customized Ayurvedic care and diet plan.' },
    { icon: FlaskConical, title: 'Medicine Preparation', desc: 'Medicines formulated specifically for your constitution and health needs.' },
    { icon: PackageCheck, title: 'Dispensing & Guidance', desc: 'Quality Ayurvedic formulations provided directly at the clinic with dosage instructions.' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <title>Personalized Ayurvedic Medicines — Custom Formulations | IR Veda Clinic Mysore</title>
      <meta name="description" content="Customized Ayurvedic medicines prepared based on individual consultation with Dr. Yakhooth Naveen at IR Veda Clinic, Mysore." />

      <section style={{ background: 'var(--color-cream)', paddingTop: '120px', paddingBottom: '5rem' }}>
        <div className="section-wrapper" style={{ maxWidth: '1280px' }}>
          <div className="section-tag" style={{ marginBottom: '0.75rem' }}>Personalized Medicines</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '1rem', lineHeight: 1.15, maxWidth: '700px' }}>
            Personalized Ayurvedic Medicines
          </h1>
          <p style={{ color: 'var(--color-text-body)', maxWidth: '580px', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '1.0625rem' }}>
            At IR Veda Clinic, every medicine recommendation is customized based on thorough individual consultation. No off-the-shelf solutions. No generic prescriptions.
          </p>
          {/* Pipeline */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', alignItems: 'center', marginBottom: '2.5rem' }}>
            {['Consult', 'Personalize', 'Formulate', 'Dispense'].map((s, i, arr) => (
              <React.Fragment key={s}>
                <span style={{ padding: '0.5rem 1.25rem', background: 'var(--color-forest)', color: 'white', borderRadius: '100px', fontSize: '0.875rem', fontWeight: 600 }}>{s}</span>
                {i < arr.length - 1 && <ArrowRight size={16} color="var(--color-earth)" />}
              </React.Fragment>
            ))}
          </div>
          <Link to="/book-appointment" className="btn-primary">Book Consultation</Link>
        </div>
      </section>

      <section style={{ background: 'white', padding: '5rem 0' }}>
        <div className="section-wrapper" style={{ maxWidth: '1280px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }} className="medicines-grid">
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '1.25rem' }}>
                Why Personalized Medicines?
              </h2>
              <p style={{ color: 'var(--color-text-body)', lineHeight: 1.8, marginBottom: '1rem' }}>
                Ayurveda recognizes that each individual has a unique constitution (Prakriti) and health profile. A formulation suitable for one person may not be suitable for another.
              </p>
              <p style={{ color: 'var(--color-text-body)', lineHeight: 1.8, marginBottom: '2rem' }}>
                All medicine recommendations at IR Veda Clinic are made after a thorough consultation and individual assessment by Dr. Yakhooth Naveen, ensuring that your care is truly personal.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {[
                  'Formulations based on your unique Prakriti',
                  'Combines traditional herbs with clinical experience',
                  'Prepared with quality-checked Ayurvedic herbs',
                  'Tailored specifically to your individual doshic balance',
                  'Complete dosage instructions and dietary guidelines provided',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-earth)', flexShrink: 0, marginTop: '8px' }} />
                    <span style={{ fontSize: '0.9375rem', color: 'var(--color-text-body)', lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '1.25rem' }}>
                The Medicine Journey
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {steps.map((s, i) => {
                  const StepIcon = s.icon
                  return (
                    <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '42px', height: '42px', borderRadius: '50%',
                        background: 'var(--color-cream)', border: '2px solid var(--color-beige)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <StepIcon size={18} color="var(--color-forest)" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '0.125rem' }}>{s.title}</div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{s.desc}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--color-forest)', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>Ready for Personalized Ayurvedic Medicine?</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>Start with a consultation and receive care tailored specifically for you.</p>
        <Link to="/book-appointment" className="btn-gold">Book Consultation</Link>
      </section>
      <style>{` @media (max-width: 768px) { .medicines-grid { grid-template-columns: 1fr !important; } } `}</style>
    </motion.div>
  )
}
