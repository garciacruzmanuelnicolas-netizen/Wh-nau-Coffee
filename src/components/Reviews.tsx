import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { REVIEWS, STORE_INFO } from '../data/cafeData';

export const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  return (
    <section id="opiniones" className="py-24 bg-[#F2EBE1] dark:bg-[#231F1E] text-[#1A1716] dark:text-[#FAF6F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#4B2E2B] dark:text-amber-400 font-semibold flex items-center justify-center space-x-1">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Opiniones Reales</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold mt-2 text-[#4B2E2B] dark:text-white">
            Lo que dicen nuestros clientes
          </h2>
          <div className="w-16 h-1 bg-[#4B2E2B] dark:bg-amber-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Google Rating Summary Badge */}
        <div className="max-w-sm mx-auto mb-12 bg-white dark:bg-[#2B2523] p-6 rounded-3xl border border-amber-200/50 dark:border-gray-800 shadow-xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-serif font-bold text-xl shadow-md">
              4.4
            </div>
            <div>
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 font-medium mt-1">
                Basado en <strong className="text-[#4B2E2B] dark:text-amber-200">53 opiniones</strong> en Google
              </p>
            </div>
          </div>

          <a
            href={STORE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-[#4B2E2B] dark:text-amber-300 hover:bg-[#4B2E2B] hover:text-white transition-colors"
            title="Ver en Google Maps"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        {/* Carousel Slider Box */}
        <div className="max-w-3xl mx-auto relative px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-[#2A2422] p-8 sm:p-12 rounded-3xl border border-amber-200/40 dark:border-gray-800 shadow-2xl relative"
            >
              <Quote className="w-12 h-12 text-amber-200 dark:text-amber-900/40 absolute top-6 right-6 pointer-events-none" />

              {/* Stars */}
              <div className="flex text-amber-400 space-x-1 mb-4">
                {[...Array(REVIEWS[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-lg sm:text-2xl font-serif italic text-gray-800 dark:text-amber-100 leading-relaxed mb-6">
                "{REVIEWS[currentIndex].text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#4B2E2B] dark:text-white">
                    {REVIEWS[currentIndex].author}
                  </h4>
                  <span className="text-xs text-gray-400">
                    {REVIEWS[currentIndex].source} • {REVIEWS[currentIndex].date}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-[#4B2E2B] hover:text-white transition-colors"
                    aria-label="Opinión anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-[#4B2E2B] hover:text-white transition-colors"
                    aria-label="Opinión siguiente"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-[#4B2E2B] dark:bg-amber-400' : 'bg-gray-300 dark:bg-gray-700'
                }`}
                aria-label={`Ir a la opinión ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
