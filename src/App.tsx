import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { CoffeeCursor } from './components/CoffeeCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Menu } from './components/Menu';
import { Specialties } from './components/Specialties';
import { Reviews } from './components/Reviews';
import { Stats } from './components/Stats';
import { Schedule } from './components/Schedule';
import { Location } from './components/Location';
import { ContactForm } from './components/ContactForm';
import { ReservationModal } from './components/ReservationModal';
import { FloatingButtons } from './components/FloatingButtons';
import { Footer } from './components/Footer';
import { MenuItem } from './types';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isCursorEnabled, setIsCursorEnabled] = useState<boolean>(true);
  const [reservationModalOpen, setReservationModalOpen] = useState<boolean>(false);
  const [selectedItemForReservation, setSelectedItemForReservation] = useState<MenuItem | null>(null);

  useEffect(() => {
    // Sync Dark Mode class with root document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const toggleCursor = () => setIsCursorEnabled((prev) => !prev);

  const handleOpenReservation = () => {
    setSelectedItemForReservation(null);
    setReservationModalOpen(true);
  };

  const handleSelectItemForReservation = (item: MenuItem) => {
    setSelectedItemForReservation(item);
    setReservationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] dark:bg-[#1A1716] text-[#1A1716] dark:text-[#FAF6F0] font-sans antialiased selection:bg-[#4B2E2B] selection:text-white relative bg-paper-texture">
      {/* 1. Preloader */}
      <Preloader />

      {/* 2. Custom Coffee Cursor */}
      <CoffeeCursor enabled={isCursorEnabled} />

      {/* 3. Sticky Navbar */}
      <Navbar
        onOpenReservation={handleOpenReservation}
      />

      {/* Main Content Sections */}
      <main className="relative">
        {/* 4. Fullscreen Parallax Hero */}
        <Hero onOpenReservation={handleOpenReservation} />

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
      </main>

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
    </div>
  );
}
