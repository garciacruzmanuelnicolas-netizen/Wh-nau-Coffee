import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FloatingButtons } from './components/FloatingButtons';
import { lazyWhenVisible } from './utils/lazyHydrate';
import { MenuItem } from './types';

// Secciones bajo la portada: su JavaScript se descarga e hidrata solo cuando el
// usuario se acerca a ellas (el HTML ya viene prerenderizado y se ve desde el principio).
const About = lazyWhenVisible('nosotros', () => import('./components/About').then((m) => ({ default: m.About })));
const Menu = lazyWhenVisible('menu', () => import('./components/Menu').then((m) => ({ default: m.Menu })));
const Specialties = lazyWhenVisible('especialidades', () =>
  import('./components/Specialties').then((m) => ({ default: m.Specialties })),
);
const Reviews = lazyWhenVisible('opiniones', () => import('./components/Reviews').then((m) => ({ default: m.Reviews })));
const Stats = lazyWhenVisible('cifras', () => import('./components/Stats').then((m) => ({ default: m.Stats })));
const Schedule = lazyWhenVisible('horario', () => import('./components/Schedule').then((m) => ({ default: m.Schedule })));
const Location = lazyWhenVisible('ubicacion', () => import('./components/Location').then((m) => ({ default: m.Location })));
const ContactForm = lazyWhenVisible('contacto', () =>
  import('./components/ContactForm').then((m) => ({ default: m.ContactForm })),
);
const Footer = lazyWhenVisible('pie', () => import('./components/Footer').then((m) => ({ default: m.Footer })));
// El modal de reserva solo se descarga cuando alguien lo abre
const ReservationModal = lazy(() =>
  import('./components/ReservationModal').then((m) => ({ default: m.ReservationModal })),
);

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

  // Callbacks estables + secciones memorizadas: abrir la reserva no vuelve a
  // renderizar las secciones que aún no se han hidratado (si no, React tendría
  // que tirar su HTML prerenderizado).
  const handleOpenReservation = useCallback(() => {
    setSelectedItemForReservation(null);
    setReservationModalOpen(true);
  }, []);

  const handleSelectItemForReservation = useCallback((item: MenuItem) => {
    setSelectedItemForReservation(item);
    setReservationModalOpen(true);
  }, []);

  const handleCloseReservation = useCallback(() => setReservationModalOpen(false), []);

  const sections = useMemo(
    () => (
      <>
        <div data-hydrate="nosotros">
          <Suspense fallback={null}><About /></Suspense>
        </div>
        <div data-hydrate="menu">
          <Suspense fallback={null}>
            <Menu onSelectItemForReservation={handleSelectItemForReservation} />
          </Suspense>
        </div>
        <div data-hydrate="especialidades">
          <Suspense fallback={null}>
            <Specialties onOpenReservation={handleOpenReservation} />
          </Suspense>
        </div>
        <div data-hydrate="opiniones">
          <Suspense fallback={null}><Reviews /></Suspense>
        </div>
        <div data-hydrate="cifras">
          <Suspense fallback={null}><Stats /></Suspense>
        </div>
        <div data-hydrate="horario">
          <Suspense fallback={null}><Schedule /></Suspense>
        </div>
        <div data-hydrate="ubicacion">
          <Suspense fallback={null}><Location /></Suspense>
        </div>
        <div data-hydrate="contacto">
          <Suspense fallback={null}><ContactForm /></Suspense>
        </div>
      </>
    ),
    [handleOpenReservation, handleSelectItemForReservation],
  );

  const footer = useMemo(
    () => (
      <div data-hydrate="pie">
        <Suspense fallback={null}><Footer /></Suspense>
      </div>
    ),
    [],
  );

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

        {/* 5-13. Secciones bajo la portada */}
        {sections}
      </main>

      {footer}

      {/* Modal de reserva: solo existe (y se descarga) cuando se abre */}
      {reservationModalOpen && (
        <Suspense fallback={null}>
          <ReservationModal
            isOpen
            onClose={handleCloseReservation}
            selectedItem={selectedItemForReservation}
          />
        </Suspense>
      )}

      {/* Botones flotantes de WhatsApp, llamada y volver arriba */}
      <FloatingButtons />
    </div>
  );
}
