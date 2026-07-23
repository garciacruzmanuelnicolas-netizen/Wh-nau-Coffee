import React, { useState } from 'react';
import { Coffee, MapPin, Phone, Mail, Instagram, Facebook, Heart, Shield, FileText } from 'lucide-react';
import { STORE_INFO } from '../data/cafeData';
import { motion, AnimatePresence } from 'motion/react';

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1A1716] text-[#FAF6F0] pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[#4B2E2B] text-[#FAF6F0] flex items-center justify-center font-bold text-xl shadow-md border border-amber-900/30">
                <Coffee className="w-5 h-5 text-[#FAF6F0]" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight block leading-none text-white">
                  Whānau
                </span>
                <span className="text-[10px] tracking-widest uppercase text-amber-400 block font-semibold">
                  Coffee • Garrucha
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Café de especialidad 100% arábica, desayunos irresistibles, tostadas gourmet y hamburguesas artesanales en el corazón de Garrucha, Almería.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={STORE_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#4B2E2B] text-amber-200 flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={STORE_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#4B2E2B] text-amber-200 flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h4 className="font-serif font-bold text-base text-amber-200 mb-4 uppercase tracking-wider text-xs">
              Navegación Rápida
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className="hover:text-amber-300 transition-colors">Inicio</a></li>
              <li><a href="#nosotros" onClick={(e) => handleLinkClick(e, '#nosotros')} className="hover:text-amber-300 transition-colors">Sobre Nosotros</a></li>
              <li><a href="#menu" onClick={(e) => handleLinkClick(e, '#menu')} className="hover:text-amber-300 transition-colors">Nuestro Menú</a></li>
              <li><a href="#especialidades" onClick={(e) => handleLinkClick(e, '#especialidades')} className="hover:text-amber-300 transition-colors">Especialidades de la Casa</a></li>
              <li><a href="#galeria" onClick={(e) => handleLinkClick(e, '#galeria')} className="hover:text-amber-300 transition-colors">Galería Fotográfica</a></li>
              <li><a href="#opiniones" onClick={(e) => handleLinkClick(e, '#opiniones')} className="hover:text-amber-300 transition-colors">Opiniones en Google</a></li>
            </ul>
          </div>

          {/* Horario Sintetizado */}
          <div>
            <h4 className="font-serif font-bold text-base text-amber-200 mb-4 uppercase tracking-wider text-xs">
              Horario Habitual
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>Lunes a Jueves: <span className="text-white font-medium">7:30 a 22:00</span></li>
              <li>Viernes: <span className="text-white font-medium">7:30 a 23:00</span></li>
              <li>Sábado: <span className="text-white font-medium">8:00 a 23:00</span></li>
              <li>Domingo: <span className="text-white font-medium">8:00 a 21:00</span></li>
            </ul>
          </div>

          {/* Datos de Contacto */}
          <div>
            <h4 className="font-serif font-bold text-base text-amber-200 mb-4 uppercase tracking-wider text-xs">
              Contacto & Dirección
            </h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Calle Mayor 150, 04630 Garrucha, Almería</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                <a href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`} className="hover:underline">{STORE_INFO.phone}</a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{STORE_INFO.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p className="flex items-center space-x-1">
            <span>© {new Date().getFullYear()} Whānau Coffee. Todos los derechos reservados. Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-1 inline" />
            <span>en Garrucha.</span>
          </p>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-amber-300 transition-colors underline"
            >
              Política de Privacidad
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-amber-300 transition-colors underline"
            >
              Aviso Legal & Cookies
            </button>
          </div>
        </div>

      </div>

      {/* Legal Modals */}
      <AnimatePresence>
        {legalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#25201E] text-white p-6 sm:p-8 rounded-3xl max-w-lg w-full shadow-2xl border border-amber-200/30 relative"
            >
              <button
                onClick={() => setLegalModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                ✕
              </button>

              <div className="flex items-center space-x-2 mb-4 text-amber-300 font-serif font-bold text-xl">
                {legalModal === 'privacy' ? <Shield className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                <h3>{legalModal === 'privacy' ? 'Política de Privacidad' : 'Aviso Legal'}</h3>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed font-sans space-y-2">
                En Whānau Coffee cumplimos con el Reglamento General de Protección de Datos (RGPD) y la normativa española vigente. Tus datos personales recopilados a través de nuestro formulario de contacto y reservas sólo se utilizan para gestionar tu solicitud. No cedemos datos a terceros. Puedes ejercer tus derechos de acceso, rectificación y supresión enviando un correo a {STORE_INFO.email}.
              </p>

              <button
                onClick={() => setLegalModal(null)}
                className="mt-6 w-full py-2.5 rounded-xl bg-[#4B2E2B] text-amber-200 text-xs font-semibold hover:bg-[#351F1D]"
              >
                Cerrar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
