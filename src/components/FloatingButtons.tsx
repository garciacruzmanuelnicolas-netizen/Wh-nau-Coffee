import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ArrowUp, MessageSquare } from 'lucide-react';
import { STORE_INFO } from '../data/cafeData';

export const FloatingButtons: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hola Whānau Coffee! Quisiera hacer una consulta sobre la carta o reserva de mesa.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3 pointer-events-none">
      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="p-3.5 rounded-full bg-[#4B2E2B] text-amber-100 shadow-2xl hover:bg-[#351F1D] active:scale-90 transition-all pointer-events-auto border border-amber-300/30"
            title="Volver arriba"
            aria-label="Volver arriba"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Direct Phone Call Button */}
      <a
        href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
        className="p-3.5 rounded-full bg-amber-600 text-white shadow-2xl hover:bg-amber-700 active:scale-90 transition-all pointer-events-auto border border-white/20 flex items-center justify-center group"
        title="Llamar directamente"
        aria-label="Llamar por teléfono"
      >
        <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      </a>

      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-3 rounded-full bg-emerald-600 text-white shadow-2xl hover:bg-emerald-700 active:scale-95 transition-all pointer-events-auto border border-white/20 flex items-center space-x-2 group"
        title="Chat en WhatsApp"
      >
        <MessageSquare className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline text-xs font-semibold">WhatsApp</span>
      </a>
    </div>
  );
};
