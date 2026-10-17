import Hero from '../components/home/Hero'
import BodyDetoxFeatured from '../components/home/BodyDetoxFeatured'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Services from '../components/home/Services'
import WomensWellness from '../components/home/WomensWellness'
import SpecialtyPreviews from '../components/home/SpecialtyPreviews'
import Testimonials from '../components/home/Testimonials'
import FAQ from '../components/home/FAQ'
import AppointmentCTA from '../components/home/AppointmentCTA'
import ContactSection from '../components/home/ContactSection'

export default function Home() {
  return (
    <>
      <title>IR Veda Clinic — Personalized Ayurvedic Care | Body Detox, PCOD, Women's Wellness</title>
      <meta name="description" content="IR Veda Clinic offers personalized Ayurvedic consultation, body detox programs, women's wellness (PCOD/PCOS), and healthcare guidance. Book your appointment today." />
      <Hero />
      <BodyDetoxFeatured />
      <WhyChooseUs />
      <Services />
      <WomensWellness />
      <SpecialtyPreviews />
      <Testimonials />
      <FAQ />
      <AppointmentCTA />
      <ContactSection />
    </>
  )
}
