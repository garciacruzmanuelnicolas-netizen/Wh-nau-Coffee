import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { MessageSquare, Star, Coffee, Heart } from 'lucide-react';

export const Stats: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [counts, setCounts] = useState({ reviews: 0, rating: 0, coffees: 0, satisfaction: 0 });

  useEffect(() => {
    if (!isInView) return;

    let frame = 0;
    const totalFrames = 60;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      setCounts({
        reviews: Math.floor(progress * 53),
        rating: parseFloat((progress * 4.4).toFixed(1)),
        coffees: Math.floor(progress * 1000),
        satisfaction: Math.floor(progress * 100),
      });

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCounts({ reviews: 53, rating: 4.4, coffees: 1000, satisfaction: 100 });
      }
    }, 25);

    return () => clearInterval(timer);
  }, [isInView]);

  const statsList = [
    {
      value: `${counts.reviews}+`,
      label: 'Opiniones en Google',
      icon: MessageSquare,
      color: 'text-amber-600 dark:text-amber-400',
    },
    {
      value: `${counts.rating}★`,
      label: 'Valoración Media',
      icon: Star,
      color: 'text-amber-500',
    },
    {
      value: `${counts.coffees}+`,
      label: 'Cafés Servidos',
      icon: Coffee,
      color: 'text-[#4B2E2B] dark:text-amber-200',
    },
    {
      value: `${counts.satisfaction}%`,
      label: 'Clientes Satisfechos',
      icon: Heart,
      color: 'text-rose-600 dark:text-rose-400',
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-[#4B2E2B] text-white relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {statsList.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-3">
                  <IconComp className="w-6 h-6 text-amber-200" />
                </div>
                <span className="font-serif font-bold text-3xl sm:text-5xl text-amber-100 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-amber-200/80 font-medium mt-1">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
