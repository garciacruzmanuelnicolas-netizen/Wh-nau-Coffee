import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Menu as MenuIcon, X, CalendarCheck } from 'lucide-react';
import { getCurrentOpeningStatus } from '../utils/timeUtils';

interface NavbarProps {
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState(getCurrentOpeningStatus());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getCurrentOpeningStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Menú', href: '#menu' },
    { name: 'Especialidades', href: '#especialidades' },
    { name: 'Opiniones', href: '#opiniones' },
    { name: 'Horario', href: '#horario' },
    { name: 'Ubicación', href: '#ubicacion' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-[#1A1716]/90 backdrop-blur-md shadow-md py-3 text-[#1A1716] dark:text-[#FAF6F0]'
            : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center space-x-2.5 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#4B2E2B] text-[#FAF6F0] flex items-center justify-center shadow-md border border-amber-900/30 group-hover:scale-105 transition-transform duration-200">
              <Coffee className="w-5 h-5 text-[#FAF6F0]" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight block leading-none">
                Whānau
              </span>
              <span className="text-[10px] tracking-widest uppercase text-amber-700 dark:text-amber-300 block font-semibold">
                Coffee • Garrucha
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`transition-colors duration-200 hover:text-[#4B2E2B] dark:hover:text-amber-300 ${
                  isScrolled
                    ? 'text-gray-700 dark:text-gray-200'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Open / Closed Status Badge */}
            <span
              className={`text-xs px-2.5 py-1 rounded-full border font-medium flex items-center space-x-1.5 ${status.badgeClass}`}
            >
              <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
              <span>{status.isOpen ? 'Abierto' : 'Cerrado'}</span>
            </span>

            {/* Primary CTA - Reserve Table */}
            <button
              onClick={onOpenReservation}
              className="px-4 py-2.5 rounded-xl bg-[#4B2E2B] text-white hover:bg-[#351F1D] active:scale-95 transition-all duration-200 shadow-md font-medium text-sm flex items-center space-x-2"
            >
              <CalendarCheck className="w-4 h-4 text-amber-200" />
              <span>Reservar Mesa</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#4B2E2B] text-white focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[68px] left-0 right-0 z-30 bg-[#FAF6F0] dark:bg-[#1A1716] border-b border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden lg:hidden"
          >
            <div className="px-5 py-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
                <span className={`text-xs px-3 py-1 rounded-full border font-medium flex items-center space-x-1.5 ${status.badgeClass}`}>
                  <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                  <span>{status.statusText} • {status.nextDetail}</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="px-3 py-2.5 rounded-lg bg-white/60 dark:bg-white/5 text-gray-800 dark:text-gray-200 hover:bg-[#4B2E2B] hover:text-white transition-colors text-sm font-medium text-center"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReservation();
                  }}
                  className="w-full py-3 rounded-xl bg-[#4B2E2B] text-white font-medium text-sm flex items-center justify-center space-x-2 shadow-lg"
                >
                  <CalendarCheck className="w-4 h-4 text-amber-200" />
                  <span>Reservar Mesa</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
