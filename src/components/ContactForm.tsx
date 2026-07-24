import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Consulta General',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Por favor introduce tu nombre.';
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor introduce tu correo electrónico.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Introduce un correo electrónico válido.';
    }
    if (!formData.message.trim()) newErrors.message = 'Escribe tu mensaje o consulta.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: 'Consulta General', message: '' });
    }, 1200);
  };

  return (
    <section id="contacto" className="scroll-mt-24 py-24 bg-[#FAF6F0] dark:bg-[#1A1716] text-[#1A1716] dark:text-[#FAF6F0] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#4B2E2B] dark:text-amber-400 font-semibold flex items-center justify-center space-x-1">
            <MessageCircle className="w-4 h-4 text-amber-500" />
            <span>Atención al Cliente</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold mt-2 text-[#4B2E2B] dark:text-white">
            Escríbenos un Mensaje
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">
            ¿Tienes alguna consulta o quieres organizar un evento en Whānau Coffee? Rellena el formulario y te responderemos con la mayor brevedad.
          </p>
          <div className="w-16 h-1 bg-[#4B2E2B] dark:bg-amber-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-[#25201E] rounded-3xl p-8 sm:p-12 border border-amber-200/50 dark:border-gray-800 shadow-2xl relative">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#4B2E2B] dark:text-white">
                  ¡Mensaje Enviado con Éxito!
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                  Muchas gracias por contactar con Whānau Coffee. Te responderemos en menos de 24 horas.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#4B2E2B] text-white text-xs font-semibold hover:bg-[#351F1D] transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div>
                    <label className="block text-xs uppercase font-semibold text-gray-600 dark:text-gray-300 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre"
                      className={`w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-[#2D2725] border ${
                        errors.name ? 'border-rose-500' : 'border-gray-200 dark:border-gray-700'
                      } text-sm focus:outline-none focus:ring-2 focus:ring-[#4B2E2B] dark:focus:ring-amber-400`}
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Correo */}
                  <div>
                    <label className="block text-xs uppercase font-semibold text-gray-600 dark:text-gray-300 mb-2">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ejemplo@correo.com"
                      className={`w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-[#2D2725] border ${
                        errors.email ? 'border-rose-500' : 'border-gray-200 dark:border-gray-700'
                      } text-sm focus:outline-none focus:ring-2 focus:ring-[#4B2E2B] dark:focus:ring-amber-400`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Teléfono */}
                  <div>
                    <label className="block text-xs uppercase font-semibold text-gray-600 dark:text-gray-300 mb-2">
                      Teléfono (Opcional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="600 00 00 00"
                      className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-[#2D2725] border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#4B2E2B] dark:focus:ring-amber-400"
                    />
                  </div>

                  {/* Asunto */}
                  <div>
                    <label className="block text-xs uppercase font-semibold text-gray-600 dark:text-gray-300 mb-2">
                      Asunto de la consulta
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-[#2D2725] border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#4B2E2B] dark:focus:ring-amber-400"
                    >
                      <option value="Consulta General">Consulta General</option>
                      <option value="Reserva Especial">Reserva de Grupo / Evento</option>
                      <option value="Sugerencia">Sugerencias o Comentarios</option>
                      <option value="Proveedores">Proveedores / Trabajo</option>
                    </select>
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-600 dark:text-gray-300 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="¿En qué te podemos ayudar?"
                    className={`w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-[#2D2725] border ${
                      errors.message ? 'border-rose-500' : 'border-gray-200 dark:border-gray-700'
                    } text-sm focus:outline-none focus:ring-2 focus:ring-[#4B2E2B] dark:focus:ring-amber-400`}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-[#4B2E2B] text-white font-medium text-base hover:bg-[#351F1D] transition-all duration-300 shadow-xl flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-amber-200 border-t-transparent" />
                  ) : (
                    <>
                      <Send className="w-5 h-5 text-amber-200" />
                      <span>Enviar Mensaje</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
