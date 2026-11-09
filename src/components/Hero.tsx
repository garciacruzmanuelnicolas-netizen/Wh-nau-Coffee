import React, { useEffect, useRef } from 'react';
import { Coffee, MapPin, ChevronDown, Sparkles } from 'lucide-react';
import { STORE_INFO } from '../data/store';
import { renderAllSections } from '../utils/sections';

interface HeroProps {
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation }) => {
  const bgRef = useRef<HTMLDivElement>(null);

  // Parallax sin re-renderizar React en cada scroll
  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (bgRef.current && y < window.innerHeight * 1.5) {
          bgRef.current.style.transform = `translate3d(0, ${y * 0.3}px, 0) scale(1.05)`;
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollTo = (id: string) => {
    renderAllSections();
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="critical-fonts relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1A1716]"
    >
      {/* Background Image with subtle Parallax */}
      {/* Foto de fondo (CSS .hero-photo en index.css): decorativa, se pide justo
          después del primer pintado para no retrasar el título */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="hero-photo absolute inset-0 z-0 scale-105 will-change-transform bg-cover bg-center"
      />

      {/* Dark Overlay gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1A1716] via-black/60 to-black/70" />

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
        <div
          className="animate-fade-down relative mb-6 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-amber-200/20 text-amber-100 text-xs sm:text-sm font-medium shadow-xl"
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
        </div>

        {/* Main Title */}
        <h1
          className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white mb-6 leading-none drop-shadow-lg"
        >
          Whānau Coffee
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-2xl font-light text-amber-100/90 max-w-3xl mb-10 leading-relaxed drop-shadow-md font-serif italic"
        >
          "Café de especialidad, desayunos irresistibles y el mejor ambiente de Garrucha."
        </p>

        {/* Action Buttons */}
        <div
          className="animate-fade-up [animation-delay:200ms] flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
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
        </div>

        {/* Quick Address banner */}
        <div
          className="animate-fade-in [animation-delay:400ms] mt-12 text-xs sm:text-sm text-gray-300/80 flex items-center space-x-2"
        >
          <MapPin className="w-4 h-4 text-amber-300" />
          <span>Calle Mayor 150, 04630 Garrucha, Almería</span>
        </div>
      </div>

      {/* Bouncing Scroll Down Indicator */}
      <button
        onClick={() => handleScrollTo('#nosotros')}
        className="animate-bob absolute bottom-8 left-1/2 -translate-x-1/2 z-20 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-colors border border-white/10"
        aria-label="Desplazarse hacia abajo"
      >
        <ChevronDown className="w-5 h-5 text-amber-200" />
      </button>
    </section>
  );
};
