import { DaySchedule } from '../types';

// Datos básicos del local. Van en un archivo aparte (y pequeño) porque la
// portada y el menú de navegación los necesitan nada más cargar; la carta
// completa (cafeData.ts) solo se descarga cuando hace falta.

// Imágenes optimizadas (WebP en 640/960/1376px) servidas desde /public/images
export const heroCoffeeToast = '/images/hero-1376.webp';
export const cafeInteriorImg = '/images/interior-1376.webp';

export const STORE_INFO = {
  name: 'Whānau Coffee',
  tagline: 'Café de especialidad, desayunos irresistibles y el mejor ambiente de Garrucha.',
  address: 'Calle Mayor 150',
  postalCode: '04630',
  city: 'Garrucha',
  province: 'Almería',
  country: 'España',
  phone: '649 18 91 74',
  formattedPhone: '+34 649 18 91 74',
  whatsappNumber: '34649189174',
  email: 'hola@whanaucoffee.es',
  googleRating: 4.4,
  reviewCount: 53,
  googleMapsUrl: 'https://maps.app.goo.gl/EyCHTfuHCbnLqPAU6',
  heroImage: heroCoffeeToast,
  interiorImage: cafeInteriorImg,
  instagram: 'https://instagram.com/whanaucoffee',
  facebook: 'https://facebook.com/whanaucoffee',
};

export const WEEKLY_SCHEDULE: DaySchedule[] = [
  { day: 'Lunes', hours: '7:30 a 22:00', openTime: 7.5, closeTime: 22.0 },
  { day: 'Martes', hours: '7:30 a 22:00', openTime: 7.5, closeTime: 22.0 },
  { day: 'Miércoles', hours: '7:30 a 22:00', openTime: 7.5, closeTime: 22.0 },
  { day: 'Jueves', hours: '7:30 a 22:00', openTime: 7.5, closeTime: 22.0 },
  { day: 'Viernes', hours: '7:30 a 23:00', openTime: 7.5, closeTime: 23.0 },
  { day: 'Sábado', hours: '8:00 a 23:00', openTime: 8.0, closeTime: 23.0 },
  { day: 'Domingo', hours: '8:00 a 21:00', openTime: 8.0, closeTime: 21.0 },
];
