import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Navigation, ExternalLink, Clock } from 'lucide-react';
import { STORE_INFO } from '../data/cafeData';

export const Location: React.FC = () => {
  return (
    <section id="ubicacion" className="scroll-mt-24 py-24 bg-[#F2EBE1] dark:bg-[#231F1E] text-[#1A1716] dark:text-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#4B2E2B] dark:text-amber-400 font-semibold flex items-center justify-center space-x-1">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Encuéntranos en Garrucha</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold mt-2 text-[#4B2E2B] dark:text-white">
            Ubicación & Contacto Directo
          </h2>
          <div className="w-16 h-1 bg-[#4B2E2B] dark:bg-amber-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* 2-Column Grid: Left Map, Right Address Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Google Maps iframe embed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 rounded-3xl overflow-hidden border border-amber-200/50 dark:border-gray-800 shadow-xl h-[400px] lg:h-full min-h-[380px]"
          >
            <iframe
              title="Ubicación de Whānau Coffee en Garrucha"
              src="https://maps.google.com/maps?q=Wh%C4%81nau%20Coffee%20Garrucha%20Calle%20Mayor&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter saturate-110"
            />
          </motion.div>

          {/* Right: Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-white dark:bg-[#2A2422] rounded-3xl p-8 border border-amber-200/40 dark:border-gray-800 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#4B2E2B] text-amber-200 flex items-center justify-center font-bold text-xl shadow-md">
                  ☕
                </div>
                <div>
                  <h3 className="font-serif font-bold text-2xl text-[#4B2E2B] dark:text-white">
                    Whānau Coffee
                  </h3>
                  <p className="text-xs text-amber-700 dark:text-amber-300">Garrucha • Almería</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Address Item */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-[#4B2E2B] dark:text-amber-200 shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 uppercase font-semibold">Dirección física</h4>
                    <p className="font-serif font-bold text-base text-gray-800 dark:text-gray-100">
                      Calle Mayor 150
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      04630 Garrucha, Almería, España
                    </p>
                  </div>
                </div>

                {/* Phone Item */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-[#4B2E2B] dark:text-amber-200 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 uppercase font-semibold">Teléfono de atención</h4>
                    <a
                      href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
                      className="font-serif font-bold text-lg text-[#4B2E2B] dark:text-amber-300 hover:underline"
                    >
                      {STORE_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Email Item */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-[#4B2E2B] dark:text-amber-200 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 uppercase font-semibold">Correo electrónico</h4>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {STORE_INFO.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-3">
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 rounded-xl bg-[#4B2E2B] text-white hover:bg-[#351F1D] transition-colors text-sm font-medium flex items-center justify-center space-x-2 shadow-lg"
              >
                <Navigation className="w-4 h-4 text-emerald-400" />
                <span>Cómo llegar (GPS)</span>
              </a>

              <a
                href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
                className="py-3.5 px-4 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-[#4B2E2B] dark:text-amber-300" />
                <span>Llamar</span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
