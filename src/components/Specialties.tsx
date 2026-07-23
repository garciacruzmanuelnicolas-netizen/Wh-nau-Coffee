import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Utensils, Flame, Sparkles, ArrowRight } from 'lucide-react';
import { SPECIALTIES } from '../data/cafeData';

interface SpecialtiesProps {
  onOpenReservation: () => void;
}

export const Specialties: React.FC<SpecialtiesProps> = ({ onOpenReservation }) => {
  return (
    <section id="especialidades" className="py-24 bg-[#F7F1E8] dark:bg-[#1E1918] text-[#1A1716] dark:text-[#FAF6F0] relative overflow-hidden">
      
      {/* Background Decorative Graphic */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4B2E2B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#4B2E2B] dark:text-amber-400 font-semibold flex items-center justify-center space-x-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Selección de la Casa</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold mt-2 text-[#4B2E2B] dark:text-white">
            Nuestras Especialidades
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Platos emblemáticos y creaciones preparadas con el máximo cuidado artesanal.
          </p>
          <div className="w-16 h-1 bg-[#4B2E2B] dark:bg-amber-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* 2x2 Grid of Massive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SPECIALTIES.map((spec, index) => {
            return (
              <motion.div
                key={spec.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative rounded-3xl bg-white dark:bg-[#282220] border border-amber-200/40 dark:border-gray-800 shadow-xl overflow-hidden flex flex-col sm:flex-row hover:shadow-2xl transition-all duration-300"
              >
                {/* Massive Image Container */}
                <div className="relative w-full sm:w-1/2 h-64 sm:h-auto overflow-hidden shrink-0">
                  <img
                    src={spec.image}
                    alt={spec.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/60 via-transparent to-transparent opacity-80 sm:opacity-50" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-[#4B2E2B] text-amber-100 text-xs font-semibold px-3 py-1 rounded-full shadow-md border border-amber-300/30">
                    {spec.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-serif font-bold text-[#4B2E2B] dark:text-amber-300">
                        {spec.price}
                      </span>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-[#4B2E2B] dark:text-white mt-2 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                      {spec.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-3 leading-relaxed font-sans">
                      {spec.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">Receta Exclusiva Whānau</span>
                    <button
                      onClick={onOpenReservation}
                      className="text-xs font-bold text-[#4B2E2B] dark:text-amber-300 flex items-center space-x-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Probar en Local</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
