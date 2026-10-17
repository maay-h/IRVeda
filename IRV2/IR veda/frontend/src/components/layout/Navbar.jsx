import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Leaf, ChevronDown, CalendarCheck, Phone, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Treatments',
    href: '/treatments',
    children: [
      { label: 'All Treatments', href: '/treatments' },
      { label: 'Body Detox', href: '/body-detox' },
      { label: "Women's Wellness", href: '/women-wellness' },
      { label: 'Suvarna Prasha', href: '/suvarna-prasha' },
      { label: 'Bone Health', href: '/bone-health' },
    ],
  },
  { label: 'Body Detox', href: '/body-detox' },
  { label: 'Ayurveda Medicines', href: '/ayurveda-medicines' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
    setMobileTreatmentsOpen(false)
  }, [location.pathname])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileOpen])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: scrolled || mobileOpen ? 'rgba(250,246,239,0.98)' : 'rgba(250,246,239,0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(74,124,89,0.14)' : '1px solid rgba(74,124,89,0.06)',
        boxShadow: scrolled ? '0 4px 20px rgba(26,58,42,0.08)' : 'none',
      }}
    >
      <div className="section-wrapper">
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'var(--color-forest)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(26,58,42,0.2)',
            }}>
              <Leaf size={18} color="white" />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3125rem', fontWeight: 700, color: 'var(--color-forest)', lineHeight: 1, letterSpacing: '0.01em' }}>
                IR Veda
              </span>
              <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.16em', color: 'var(--color-earth)', textTransform: 'uppercase', marginTop: '1px' }}>
                Clinic
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden-mobile">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button style={{
                    display: 'flex', alignItems: 'center', gap: '0.25rem',
                    padding: '0.5rem 0.75rem', border: 'none', background: 'none',
                    fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500,
                    color: 'var(--color-text-body)', cursor: 'pointer',
                    borderRadius: '8px', transition: 'color 0.2s',
                  }}>
                    {item.label}
                    <ChevronDown size={13} />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        style={{
                          position: 'absolute', top: '100%', left: 0,
                          background: 'white', borderRadius: '12px',
                          boxShadow: '0 12px 48px rgba(26,58,42,0.14)',
                          border: '1px solid rgba(74,124,89,0.1)',
                          minWidth: '200px', overflow: 'hidden', zIndex: 100,
                          padding: '0.5rem',
                        }}
                      >
                        {item.children.map((child) => (
                          <Link key={child.href} to={child.href} style={{
                            display: 'block', padding: '0.625rem 1rem',
                            fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                            color: 'var(--color-text-body)', textDecoration: 'none',
                            borderRadius: '8px', transition: 'background 0.15s',
                          }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-cream)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink key={item.href} to={item.href} style={({ isActive }) => ({
                  padding: '0.5rem 0.75rem',
                  fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500,
                  color: isActive ? 'var(--color-forest)' : 'var(--color-text-body)',
                  textDecoration: 'none', borderRadius: '8px',
                  transition: 'color 0.2s',
                  background: isActive ? 'rgba(74,124,89,0.08)' : 'transparent',
                })}>
                  {item.label}
                </NavLink>
              )
            )}
          </div>

          {/* CTA + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link to="/book-appointment" className="btn-primary hidden-mobile" style={{ padding: '0.5625rem 1.25rem', fontSize: '0.875rem' }}>
              <CalendarCheck size={16} />
              Book Appointment
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="show-mobile"
              style={{
                display: 'none',
                width: '42px', height: '42px',
                borderRadius: '10px',
                border: '1px solid rgba(74,124,89,0.2)',
                background: mobileOpen ? 'var(--color-forest)' : 'white',
                color: mobileOpen ? 'white' : 'var(--color-forest)',
                cursor: 'pointer',
                alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer (Full Height Scrollable) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100vh - 68px)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            style={{
              background: 'white',
              borderTop: '1px solid rgba(74,124,89,0.12)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ padding: '1.25rem 1.5rem' }}>
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => setMobileTreatmentsOpen(!mobileTreatmentsOpen)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.875rem 0',
                          fontFamily: 'var(--font-body)',
                          fontSize: '1.0625rem',
                          fontWeight: 600,
                          color: 'var(--color-forest)',
                          background: 'none',
                          border: 'none',
                          borderBottom: '1px solid var(--color-cream-dark)',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        {item.label}
                        <motion.div animate={{ rotate: mobileTreatmentsOpen ? 180 : 0 }}>
                          <ChevronDown size={18} color="var(--color-earth)" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {mobileTreatmentsOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ overflow: 'hidden', background: 'var(--color-cream)', borderRadius: '12px', margin: '0.5rem 0 0.75rem' }}
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                to={child.href}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '0.75rem 1rem',
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '0.9375rem',
                                  color: 'var(--color-forest)',
                                  textDecoration: 'none',
                                  borderBottom: '1px solid rgba(74,124,89,0.06)',
                                }}
                              >
                                {child.label}
                                <ArrowRight size={14} color="var(--color-earth)" />
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      style={({ isActive }) => ({
                        display: 'block',
                        padding: '0.875rem 0',
                        fontFamily: 'var(--font-body)',
                        fontSize: '1.0625rem',
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? 'var(--color-earth)' : 'var(--color-forest)',
                        textDecoration: 'none',
                        borderBottom: '1px solid var(--color-cream-dark)',
                      })}
                    >
                      {item.label}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Bottom CTA Area */}
            <div style={{ padding: '1.25rem 1.5rem 2.5rem', background: 'var(--color-cream)', borderTop: '1px solid var(--color-beige)' }}>
              <Link
                to="/book-appointment"
                onClick={() => setMobileOpen(false)}
                className="btn-primary"
                style={{ width: '100%', padding: '0.9375rem', fontSize: '1rem', marginBottom: '0.75rem' }}
              >
                <CalendarCheck size={18} />
                Book an Appointment
              </Link>
              <a
                href="tel:+918497005472"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--color-earth)',
                  textDecoration: 'none',
                  padding: '0.5rem',
                }}
              >
                <Phone size={15} /> Call: +91 84970 05472
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 901px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  )
}
