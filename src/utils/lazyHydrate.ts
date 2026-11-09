import { lazy, type ComponentType } from 'react';

/** Se resuelve cuando el bloque `[data-hydrate="name"]` está cerca de la pantalla. */
function whenNearViewport(name: string, rootMargin: string): Promise<void> {
  return new Promise((resolve) => {
    const el = document.querySelector(`[data-hydrate="${name}"]`);
    // Sin HTML prerenderizado (npm run dev) o sin IntersectionObserver: cargar ya
    if (!el || !el.firstElementChild || typeof IntersectionObserver === 'undefined') {
      resolve();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          resolve();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
  });
}

/**
 * Como React.lazy, pero en el navegador no descarga ni hidrata la sección hasta
 * que el usuario se acerca a ella. Mientras tanto se ve el HTML prerenderizado
 * tal cual, así que el móvil no gasta CPU en lo que todavía no se ve.
 * En el prerender (Node) carga directamente.
 */
export function lazyWhenVisible<T extends ComponentType<any>>(
  name: string,
  load: () => Promise<{ default: T }>,
  rootMargin = '600px 0px',
) {
  return lazy(() =>
    typeof window === 'undefined' ? load() : whenNearViewport(name, rootMargin).then(load),
  );
}
