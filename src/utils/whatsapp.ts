import { STORE_INFO } from '../data/store';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Fecha local (no UTC) en formato YYYY-MM-DD para inputs type="date". */
export function todayLocalISO(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
