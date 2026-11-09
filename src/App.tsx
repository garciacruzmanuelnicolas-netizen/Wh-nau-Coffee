import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuItem } from './types';

// Lo que está debajo de la portada se descarga aparte para que el primer pintado sea rápido
const About = lazy(() => import('./components/About').then((m) => ({ default: m.About })));
const Menu = lazy(() => import('./components/Menu').then((m) => ({ default: m.Menu })));
const Specialties = lazy(() => import('./components/Specialties').then((m) => ({ default: m.Specialties })));
const Reviews = lazy(() => import('./components/Reviews').then((m) => ({ default: m.Reviews })));
const Stats = lazy(() => import('./components/Stats').then((m) => ({ default: m.Stats })));
const Schedule = lazy(() => import('./components/Schedule').then((m) => ({ default: m.Schedule })));
const Location = lazy(() => import('./components/Location').then((m) => ({ default: m.Location })));
const ContactForm = lazy(() => import('./components/ContactForm').then((m) => ({ default: m.ContactForm })));
const ReservationModal = lazy(() => import('./components/ReservationModal').then((m) => ({ default: m.ReservationModal })));
const FloatingButtons = lazy(() => import('./components/FloatingButtons').then((m) => ({ default: m.FloatingButtons })));
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })));

export default function App() {
  const [reservationModalOpen, setReservationModalOpen] = useState<boolean>(false);
  const [selectedItemForReservation, setSelectedItemForReservation] = useState<MenuItem | null>(null);

  // Modo oscuro automático según el ajuste del móvil/PC (la clase inicial la pone index.html)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => document.documentElement.classList.toggle('dark', mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const handleOpenReservation = () => {
    setSelectedItemForReservation(null);
    setReservationModalOpen(true);
  };

  const handleSelectItemForReservation = (item: MenuItem) => {
    setSelectedItemForReservation(item);
    setReservationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] dark:bg-[#1A1716] text-[#1A1716] dark:text-[#FAF6F0] font-sans antialiased selection:bg-[#4B2E2B] selection:text-white relative bg-paper-texture overflow-x-hidden">

      {/* 2. Sticky Navbar */}
      <Navbar
        onOpenReservation={handleOpenReservation}
      />

      {/* Main Content Sections */}
      <main className="relative">
        {/* 4. Fullscreen Parallax Hero */}
        <Hero onOpenReservation={handleOpenReservation} />

        <Suspense fallback={null}>
        {/* 5. About Us */}
        <About />

        {/* 6. Interactive Menu */}
        <Menu onSelectItemForReservation={handleSelectItemForReservation} />

        {/* 7. Specialties Section (Warm Beige) */}
        <Specialties onOpenReservation={handleOpenReservation} />

        {/* 8. Real Google Reviews Carousel */}
        <Reviews />

        {/* 10. Animated Statistics */}
        <Stats />

        {/* 11. Opening Hours Schedule */}
        <Schedule />

        {/* 12. Location & Google Map */}
        <Location />

        {/* 13. Contact Form */}
        <ContactForm />
        </Suspense>
      </main>

      <Suspense fallback={null}>
      {/* 14. Footer */}
      <Footer />

      {/* 15. Table Reservation Modal */}
      <ReservationModal
        isOpen={reservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
        selectedItem={selectedItemForReservation}
      />

      {/* 16. Floating WhatsApp, Call & ScrollToTop Buttons */}
      <FloatingButtons />
      </Suspense>
    </div>
  );
}
