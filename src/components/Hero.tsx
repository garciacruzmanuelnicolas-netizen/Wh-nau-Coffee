import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Coffee, MapPin, ChevronDown, Sparkles } from 'lucide-react';
import { STORE_INFO } from '../data/cafeData';

interface HeroProps {
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1A1716]"
    >
      {/* Background Image with subtle Parallax */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-100 ease-out scale-105"
        style={{
          backgroundImage: `url(${STORE_INFO.heroImage})`,
          transform: `translateY(${scrollY * 0.3}px) scale(1.05)`,
        }}
      >
        <img
          src={STORE_INFO.heroImage}
          alt="Café de especialidad Whānau Coffee"
          className="hidden"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Dark Overlay gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1A1716] via-black/60 to-black/70 backdrop-brightness-90" />

      {/* Floating Coffee Beans Deco */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-10 text-2xl animate-float-bean-slow">🫘</div>
        <div className="absolute top-1/3 right-12 text-3xl animate-float-bean-fast">🫘</div>
        <div className="absolute bottom-1/4 left-1/4 text-2xl animate-float-bean-slow" style={{ animationDelay: '1s' }}>🫘</div>
        <div className="absolute top-2/3 right-1/4 text-xl animate-float-bean-fast" style={{ animationDelay: '2s' }}>🫘</div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 flex flex-col items-center">
        {/* Top Badge with Steam Effect */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-6 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-amber-200/20 text-amber-100 text-xs sm:text-sm font-medium shadow-xl"
        >
          {/* Steam Effect */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex space-x-1 pointer-events-none">
            <span className="w-1 h-3 bg-amber-200/60 rounded-full steam-particle" style={{ animationDelay: '0s' }}></span>
            <span className="w-1 h-4 bg-amber-200/80 rounded-full steam-particle" style={{ animationDelay: '0.5s' }}></span>
            <span className="w-1 h-3 bg-amber-200/60 rounded-full steam-particle" style={{ animationDelay: '1s' }}></span>
          </div>

          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Garrucha • Almería</span>
          <span className="text-amber-200/40">•</span>
          <span className="text-amber-200">Café 100% Arábica</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white mb-6 leading-none drop-shadow-lg"
        >
          Whānau Coffee
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-2xl font-light text-amber-100/90 max-w-3xl mb-10 leading-relaxed drop-shadow-md font-serif italic"
        >
          "Café de especialidad, desayunos irresistibles y el mejor ambiente de Garrucha."
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => handleScrollTo('#menu')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#4B2E2B] hover:bg-[#351F1D] text-white font-medium text-base shadow-2xl hover:shadow-amber-900/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 border border-amber-300/20 group"
          >
            <Coffee className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform duration-300" />
            <span>☕ Ver Menú</span>
          </button>

          <button
            onClick={() => handleScrollTo('#ubicacion')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-medium text-base backdrop-blur-md border border-white/20 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
          >
            <MapPin className="w-5 h-5 text-emerald-400" />
            <span>📍 Cómo llegar</span>
          </button>
        </motion.div>

        {/* Quick Address banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-12 text-xs sm:text-sm text-gray-300/80 flex items-center space-x-2"
        >
          <MapPin className="w-4 h-4 text-amber-300" />
          <span>Calle Mayor 150, 04630 Garrucha, Almería</span>
        </motion.div>
      </div>

      {/* Bouncing Scroll Down Indicator */}
      <motion.button
        onClick={() => handleScrollTo('#nosotros')}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { duration: 0.6, delay: 1.2 }, y: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-colors border border-white/10"
        aria-label="Desplazarse hacia abajo"
      >
        <ChevronDown className="w-5 h-5 text-amber-200" />
      </motion.button>
    </section>
  );
};
