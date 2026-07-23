import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, CheckCircle2, Coffee } from 'lucide-react';
import { MenuItem } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: MenuItem | null;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  selectedItem,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    guests: 2,
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setFormData((prev) => ({
        ...prev,
        notes: `Deseo reservar probando: ${selectedItem.name} (${selectedItem.price})`,
      }));
    }
  }, [selectedItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
    }, 1200);
  };

  const resetAndClose = () => {
    setIsConfirmed(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white dark:bg-[#25201E] text-[#1A1716] dark:text-[#FAF6F0] max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl border border-amber-200/40 relative my-8"
      >
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-[#4B2E2B] hover:text-white transition-colors"
          aria-label="Cerrar modal de reserva"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-[#4B2E2B] text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-white/10 text-amber-200 flex items-center justify-center mx-auto mb-3">
            <Coffee className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold">
            Reservar Mesa
          </h3>
          <p className="text-xs text-amber-200/80 mt-1">
            Whānau Coffee • Calle Mayor 150, Garrucha
          </p>
        </div>

        {/* Form Body or Confirmation */}
        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {isConfirmed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-serif font-bold text-2xl text-[#4B2E2B] dark:text-amber-200">
                  ¡Reserva Confirmada!
                </h4>
                <div className="bg-amber-50 dark:bg-[#2D2725] p-4 rounded-2xl text-xs space-y-1 text-left border border-amber-200/50">
                  <p><strong>Nombre:</strong> {formData.name}</p>
                  <p><strong>Fecha y hora:</strong> {formData.date} a las {formData.time}</p>
                  <p><strong>Comensales:</strong> {formData.guests} personas</p>
                  {selectedItem && <p><strong>Producto de interés:</strong> {selectedItem.name}</p>}
                </div>
                <p className="text-xs text-gray-500">
                  Te hemos enviado un recordatorio al correo electrónico. ¡Te esperamos en Garrucha!
                </p>
                <button
                  onClick={resetAndClose}
                  className="w-full py-3 rounded-xl bg-[#4B2E2B] text-white font-medium text-sm hover:bg-[#351F1D] transition-colors"
                >
                  Entendido
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {selectedItem && (
                  <div className="p-3 rounded-2xl bg-amber-100/70 dark:bg-amber-900/30 text-xs flex items-center justify-between border border-amber-300/40">
                    <div>
                      <span className="font-semibold text-[#4B2E2B] dark:text-amber-200">Mesa con consumo:</span>{' '}
                      {selectedItem.name} ({selectedItem.price})
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-gray-500 mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Fecha
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#2D2725] border border-gray-200 dark:border-gray-700 text-xs focus:ring-2 focus:ring-[#4B2E2B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-gray-500 mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Hora
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#2D2725] border border-gray-200 dark:border-gray-700 text-xs focus:ring-2 focus:ring-[#4B2E2B]"
                    >
                      <option value="08:00">08:00 h</option>
                      <option value="09:00">09:00 h</option>
                      <option value="10:00">10:00 h (Desayuno)</option>
                      <option value="11:30">11:30 h</option>
                      <option value="13:30">13:30 h (Comida)</option>
                      <option value="14:30">14:30 h</option>
                      <option value="17:00">17:00 h (Merienda)</option>
                      <option value="20:00">20:00 h (Cena)</option>
                      <option value="21:30">21:30 h</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-gray-500 mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> Personas
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#2D2725] border border-gray-200 dark:border-gray-700 text-xs focus:ring-2 focus:ring-[#4B2E2B]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Persona' : 'Personas'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-gray-500 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre y apellidos"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#2D2725] border border-gray-200 dark:border-gray-700 text-xs focus:ring-2 focus:ring-[#4B2E2B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-gray-500 mb-1">
                      Correo *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="correo@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#2D2725] border border-gray-200 dark:border-gray-700 text-xs focus:ring-2 focus:ring-[#4B2E2B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-gray-500 mb-1">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="600 00 00 00"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#2D2725] border border-gray-200 dark:border-gray-700 text-xs focus:ring-2 focus:ring-[#4B2E2B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-gray-500 mb-1">
                    Peticiones especiales / Alergias
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Mesa en terraza, trona de bebé, etc."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#2D2725] border border-gray-200 dark:border-gray-700 text-xs focus:ring-2 focus:ring-[#4B2E2B]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#4B2E2B] text-white font-medium text-sm hover:bg-[#351F1D] transition-colors shadow-lg mt-2"
                >
                  {isSubmitting ? 'Confirmando...' : 'Confirmar Reserva de Mesa'}
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
