import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Utensils, Heart, Home, Award } from 'lucide-react';
import { STORE_INFO } from '../data/cafeData';

export const About: React.FC = () => {
  const features = [
    {
      icon: Coffee,
      title: 'Café de especialidad',
      description: 'Granos 100% arábica seleccionados con tueste artesanal para un perfil de sabor único.',
      color: 'bg-[#4B2E2B] text-amber-100',
    },
    {
      icon: Utensils,
      title: 'Ingredientes frescos',
      description: 'Pan de masa madre de pueblo y productos locales de la comarca de Almería.',
      color: 'bg-[#556B2F] text-emerald-100',
    },
    {
      icon: Heart,
      title: 'Atención cercana',
      description: 'Trato familiar y cálido para que cada visita se convierta en tu momento preferido del día.',
      color: 'bg-[#6E443F] text-rose-100',
    },
    {
      icon: Home,
      title: 'Ambiente acogedor',
      description: 'Un espacio moderno y luminoso pensado para desconectar, trabajar o compartir.',
      color: 'bg-[#351F1D] text-amber-200',
    },
  ];

  return (
    <section id="nosotros" className="scroll-mt-24 py-24 bg-[#FAF6F0] dark:bg-[#1A1716] text-[#1A1716] dark:text-[#FAF6F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#4B2E2B] dark:text-amber-400 font-semibold">
            Nuestra Filosofía
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold mt-2 text-[#4B2E2B] dark:text-white">
            Sobre Nosotros
          </h2>
          <div className="w-16 h-1 bg-[#4B2E2B] dark:bg-amber-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Interior Photo with Floating Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
              <img
                src={STORE_INFO.interiorImage}
                alt="Interior Whānau Coffee Garrucha"
                className="w-full h-[400px] sm:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Floating Quality Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -right-2 sm:right-6 bg-white dark:bg-[#2A2422] p-4 sm:p-5 rounded-2xl shadow-xl border border-amber-200/50 dark:border-amber-900/40 flex items-center space-x-3"
            >
              <div className="w-12 h-12 rounded-xl bg-[#4B2E2B] text-amber-200 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">Ubicación Prima</p>
                <p className="font-serif font-bold text-base text-[#4B2E2B] dark:text-amber-200">Calle Mayor 150 • Garrucha</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Narrative Text & Key Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4B2E2B] dark:text-amber-100 leading-snug">
              En Whānau Coffee creemos que cada taza cuenta una historia.
            </h3>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg font-sans">
              Nuestro objetivo es ofrecer café de calidad acompañado de desayunos, comidas y cenas elaboradas con ingredientes frescos, creando un ambiente acogedor donde cada cliente se sienta como en casa.
            </p>

            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
              Whānau es una palabra que significa <em className="font-serif text-[#4B2E2B] dark:text-amber-300">familia</em>. Esa es la esencia que respiras al cruzar nuestra puerta en pleno corazón de Garrucha: un refugio gastronómico cálido para vecinos y visitantes por igual.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {features.map((feat, idx) => {
                const IconComponent = feat.icon;
                return (
                  <motion.div
                    key={feat.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                    className="p-4 rounded-2xl bg-white dark:bg-[#25201E] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-9 h-9 rounded-xl ${feat.color} flex items-center justify-center shrink-0`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#4B2E2B] dark:text-white">
                        {feat.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feat.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
