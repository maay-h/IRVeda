import { Link, useLocation } from 'react-router-dom'
import { MessageCircle, Phone, CalendarCheck } from 'lucide-react'

const rawNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '918497005472'
const WHATSAPP = rawNumber.replace(/[^0-9]/g, '')
const rawPhone = import.meta.env.VITE_CLINIC_PHONE || '+918497005472'
const PHONE = rawPhone.replace(/[^0-9+]/g, '')

const DEFAULT_MSG = encodeURIComponent("Hello Dr. Yakhooth Naveen, I would like to book an Ayurvedic consultation at IR Veda Clinic, Mysore.")
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}?text=${DEFAULT_MSG}`

export default function FloatingActions() {
  const location = useLocation()
  const isBookingPage = location.pathname === '/book-appointment'

  return (
    <>
      {/* Desktop: WhatsApp floating button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="hidden-mobile-fab"
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 500,
          width: '56px', height: '56px', borderRadius: '50%',
          background: '#25D366',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 24px rgba(37,211,102,0.4)',
          transition: 'all 0.3s ease',
          textDecoration: 'none',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,211,102,0.5)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(37,211,102,0.4)' }}
      >
        <MessageCircle size={26} color="white" fill="white" />
      </a>

      {/* Mobile: Floating Bottom Bar (Hidden on booking page to avoid clutter) */}
      {!isBookingPage && (
        <div className="mobile-fab-container">
          <div className="mobile-fab">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="fab-icon-btn whatsapp"
            >
              <MessageCircle size={20} color="white" fill="white" />
            </a>
            <a
              href={`tel:${PHONE}`}
              aria-label="Call IR Veda Clinic"
              className="fab-icon-btn call"
            >
              <Phone size={20} color="white" />
            </a>
            <Link
              to="/book-appointment"
              aria-label="Book Appointment"
              className="fab-book-btn"
            >
              <CalendarCheck size={17} />
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .mobile-fab-container {
          display: none;
          position: fixed;
          bottom: 1rem;
          left: 0;
          right: 0;
          padding: 0 1rem;
          justify-content: center;
          z-index: 500;
          pointer-events: none;
        }

        .mobile-fab {
          pointer-events: auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 100px;
          padding: 0.375rem 0.5rem;
          box-shadow: 0 10px 32px rgba(26, 58, 42, 0.22);
          border: 1px solid rgba(74, 124, 89, 0.18);
          max-width: 100%;
        }

        .fab-icon-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .fab-icon-btn:active {
          transform: scale(0.92);
        }
        .fab-icon-btn.whatsapp {
          background: #25D366;
        }
        .fab-icon-btn.call {
          background: var(--color-earth);
        }

        .fab-book-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6875rem 1.25rem;
          background: var(--color-forest);
          border-radius: 100px;
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.2s, transform 0.2s;
        }
        .fab-book-btn:active {
          background: var(--color-forest-light);
          transform: scale(0.97);
        }

        @media (max-width: 768px) {
          .mobile-fab-container { display: flex !important; }
          .hidden-mobile-fab { display: none !important; }
        }
      `}</style>
    </>
  )
}
