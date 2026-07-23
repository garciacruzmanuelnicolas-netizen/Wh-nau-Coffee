import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, X, Heart, ShoppingBag } from 'lucide-react';
import { MENU_ITEMS } from '../data/cafeData';
import { MenuItem } from '../types';

interface MenuProps {
  onSelectItemForReservation?: (item: MenuItem) => void;
}

export const Menu: React.FC<MenuProps> = ({ onSelectItemForReservation }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'coffee', label: 'Café ☕' },
    { id: 'cold', label: 'Fríos & Batidos 🧊' },
    { id: 'toasts', label: 'Tostadas 🍞' },
    { id: 'bakery', label: 'Bollería 🥐' },
    { id: 'savory', label: 'Salados 🥪' },
    { id: 'drinks', label: 'Bebidas 🥤' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="py-24 bg-[#F2EBE1] dark:bg-[#231F1E] text-[#1A1716] dark:text-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#4B2E2B] dark:text-amber-400 font-semibold">
            Carta & Especialidades
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold mt-2 text-[#4B2E2B] dark:text-white">
            Nuestro Menú
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Elaborado con café 100% arábica de especialidad y productos frescos de Almería.
          </p>
          <div className="w-16 h-1 bg-[#4B2E2B] dark:bg-amber-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Controls (Search + Tabs) */}
        <div className="mb-10 space-y-6">
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar espresso, tostada, hamburguesa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#2D2725] border border-amber-200/60 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#4B2E2B] dark:focus:ring-amber-400 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 shadow-sm ${
                  activeCategory === cat.id
                    ? 'bg-[#4B2E2B] text-white shadow-md scale-105'
                    : 'bg-white/80 dark:bg-[#2D2725] text-gray-700 dark:text-gray-200 hover:bg-amber-100 dark:hover:bg-gray-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer rounded-3xl bg-white dark:bg-[#2A2422] border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1.5"
              >
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Price Pill */}
                  <div className="absolute top-4 right-4 bg-[#4B2E2B] text-amber-100 font-serif font-bold text-sm px-3.5 py-1.5 rounded-full shadow-md border border-amber-200/30">
                    {item.price}
                  </div>

                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-4 left-4 bg-amber-500 text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Destacado</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-widest">
                      {item.categoryLabel}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#4B2E2B] dark:text-white mt-1 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex flex-wrap gap-1">
                      {item.tags?.map((t) => (
                        <span
                          key={t}
                          className="bg-amber-100/70 dark:bg-gray-800 text-[#4B2E2B] dark:text-amber-200 text-[10px] px-2 py-0.5 rounded-md font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-[#4B2E2B] dark:text-amber-300 font-medium underline underline-offset-2">
                      Ver detalle
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-base">No hemos encontrado ningún producto con esa búsqueda.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-sm text-[#4B2E2B] font-semibold underline"
            >
              Ver todo el menú
            </button>
          </div>
        )}
      </div>

      {/* Item Detail Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-[#25201E] max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl border border-amber-200/30 relative"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-amber-300 uppercase font-semibold">
                      {selectedItem.categoryLabel}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white">
                      {selectedItem.name}
                    </h3>
                  </div>
                  <span className="text-xl font-serif font-bold text-amber-200 bg-[#4B2E2B] px-4 py-1.5 rounded-full shadow-lg">
                    {selectedItem.price}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                  {selectedItem.description}
                </p>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                  <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">Etiquetas de elaboración</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedItem.tags?.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-[#4B2E2B] dark:text-amber-200 font-medium">
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => {
                      if (onSelectItemForReservation) {
                        onSelectItemForReservation(selectedItem);
                      }
                      setSelectedItem(null);
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#4B2E2B] text-white font-medium text-sm flex items-center justify-center space-x-2 shadow-lg hover:bg-[#351F1D] transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-200" />
                    <span>Reservar Mesa con este Producto</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
