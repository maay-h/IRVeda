import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import FloatingActions from './components/layout/FloatingActions'
import Home from './pages/Home'
import BodyDetox from './pages/BodyDetox'
import Treatments from './pages/Treatments'
import WomensWellness from './pages/WomensWellness'
import SuvarnaPreview from './pages/SuvarnaPreview'
import BoneHealth from './pages/BoneHealth'
import AyurvedaMedicines from './pages/AyurvedaMedicines'
import BookAppointment from './pages/BookAppointment'
import About from './pages/About'
import Contact from './pages/Contact'
import ScrollToTop from './components/utils/ScrollToTop'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/body-detox" element={<BodyDetox />} />
              <Route path="/treatments" element={<Treatments />} />
              <Route path="/women-wellness" element={<WomensWellness />} />
              <Route path="/suvarna-prasha" element={<SuvarnaPreview />} />
              <Route path="/bone-health" element={<BoneHealth />} />
              <Route path="/ayurveda-medicines" element={<AyurvedaMedicines />} />
              <Route path="/pre-questionnaire" element={<Navigate to="/book-appointment" replace />} />
              <Route path="/book-appointment" element={<BookAppointment />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </BrowserRouter>
  )
}
