import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/cafeData';
import { GalleryItem } from '../types';

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters = [
    { id: 'all', label: 'Todas' },
    { id: 'coffees', label: 'Cafés & Desayunos' },
    { id: 'interior', label: 'Interior' },
    { id: 'food', label: 'Comida & Tostadas' },
    { id: 'terrace', label: 'Terraza & Exterior' },
  ];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  return (
    <section id="galeria" className="py-24 bg-[#FAF6F0] dark:bg-[#1A1716] text-[#1A1716] dark:text-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#4B2E2B] dark:text-amber-400 font-semibold flex items-center justify-center space-x-1">
            <ImageIcon className="w-4 h-4 text-amber-500" />
            <span>Nuestros Momentos</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold mt-2 text-[#4B2E2B] dark:text-white">
            Galería Fotográfica
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Un recorrido visual por nuestros cafés, desayunos, interior y la energía de Garrucha.
          </p>
          <div className="w-16 h-1 bg-[#4B2E2B] dark:bg-amber-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-6 scrollbar-none mb-8">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap shadow-sm ${
                activeFilter === f.id
                  ? 'bg-[#4B2E2B] text-white scale-105 shadow-md'
                  : 'bg-white dark:bg-[#282220] text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Container */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => openLightbox(index)}
                className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-lg break-inside-avoid bg-gray-100 dark:bg-gray-800"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] text-amber-300 uppercase font-semibold tracking-wider">
                    {item.categoryLabel}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-white mt-0.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-200 mt-1 line-clamp-2">
                    {item.caption}
                  </p>

                  <div className="mt-3 flex items-center space-x-1 text-xs text-amber-200">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Ampliar</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Cerrar imagen"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Image Box */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
            >
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="mt-4 text-center max-w-lg">
                <h3 className="text-xl font-serif font-bold text-white">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-xs text-amber-200/80 mt-1">
                  {filteredItems[lightboxIndex].caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
