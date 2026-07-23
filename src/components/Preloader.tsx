import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee } from 'lucide-react';

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#2D1A18] text-[#FAF6F0]"
        >
          <div className="relative flex flex-col items-center">
            {/* Steam particles */}
            <div className="flex space-x-2 mb-2">
              <span className="w-1.5 h-4 bg-amber-200/50 rounded-full steam-particle" style={{ animationDelay: '0s' }}></span>
              <span className="w-1.5 h-6 bg-amber-200/60 rounded-full steam-particle" style={{ animationDelay: '0.4s' }}></span>
              <span className="w-1.5 h-4 bg-amber-200/50 rounded-full steam-particle" style={{ animationDelay: '0.8s' }}></span>
            </div>

            {/* Coffee Cup filling SVG animation */}
            <div className="relative w-20 h-20 flex items-center justify-center rounded-2xl bg-[#3D2523] border border-[#5C3A36] shadow-2xl p-4">
              <Coffee className="w-10 h-10 text-[#FAF6F0] z-10" />
              <motion.div
                initial={{ height: '0%' }}
                animate={{ height: '100%' }}
                transition={{ duration: 1.0, ease: 'easeInOut' }}
                className="absolute bottom-0 left-0 right-0 bg-[#6E443F]/80 rounded-b-2xl"
              />
            </div>

            {/* Brand Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-2xl font-serif tracking-wide text-white"
            >
              Whānau Coffee
            </motion.h1>
            
            <p className="mt-1 text-xs text-amber-200/70 tracking-widest uppercase">
              Garrucha • Almería
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
