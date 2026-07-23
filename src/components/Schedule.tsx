import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import { WEEKLY_SCHEDULE } from '../data/cafeData';
import { getCurrentOpeningStatus } from '../utils/timeUtils';

export const Schedule: React.FC = () => {
  const [status, setStatus] = useState(getCurrentOpeningStatus());
  const todayIndex = new Date().getDay(); // 0 = Sun, 1 = Mon, ...
  const currentDayName = WEEKLY_SCHEDULE[todayIndex === 0 ? 6 : todayIndex - 1].day;

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(getCurrentOpeningStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="horario" className="py-24 bg-[#FAF6F0] dark:bg-[#1A1716] text-[#1A1716] dark:text-[#FAF6F0] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#4B2E2B] dark:text-amber-400 font-semibold flex items-center justify-center space-x-1">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Siempre listos para atenderte</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold mt-2 text-[#4B2E2B] dark:text-white">
            Horario de Apertura
          </h2>
          <div className="w-16 h-1 bg-[#4B2E2B] dark:bg-amber-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Dynamic Status Box */}
        <div className="mb-10 text-center">
          <div
            className={`inline-flex items-center space-x-3 px-6 py-3 rounded-2xl border text-sm font-semibold shadow-lg backdrop-blur-md ${status.badgeClass}`}
          >
            {status.isOpen ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            )}
            <div>
              <span className="text-base">{status.statusText}</span>
              <span className="mx-2 opacity-40">•</span>
              <span className="font-normal">{status.nextDetail}</span>
            </div>
          </div>
        </div>

        {/* Elegant Schedule Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-[#25201E] rounded-3xl border border-amber-200/50 dark:border-gray-800 shadow-xl overflow-hidden p-6 sm:p-8"
        >
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {WEEKLY_SCHEDULE.map((item) => {
              const isToday = item.day === currentDayName;
              return (
                <div
                  key={item.day}
                  className={`py-4 px-4 sm:px-6 flex items-center justify-between rounded-xl transition-colors ${
                    isToday
                      ? 'bg-[#4B2E2B] text-white shadow-md font-semibold'
                      : 'hover:bg-amber-50/50 dark:hover:bg-gray-800/50 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-sm sm:text-base font-serif">{item.day}</span>
                    {isToday && (
                      <span className="text-[10px] bg-amber-400 text-[#4B2E2B] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Hoy
                      </span>
                    )}
                  </div>
                  <span className={`text-sm sm:text-base ${isToday ? 'text-amber-200' : 'text-gray-600 dark:text-gray-300 font-medium'}`}>
                    {item.hours}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            * Abierto todos los días festivos en Garrucha. Cocina y cafetera activas ininterrumpidamente.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
