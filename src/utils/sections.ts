/**
 * Las secciones bajo la portada usan `content-visibility: auto`: el navegador no
 * las maqueta hasta que están cerca de la pantalla (carga mucho más rápida).
 *
 * Dos cosas necesitan la página entera maquetada y llaman antes a esta función:
 * - los enlaces internos (#menu, #contacto...), para calcular bien la posición;
 * - los modales que viven dentro de una sección, para que `position: fixed`
 *   cubra la pantalla y no solo su sección.
 * Se hace una sola vez; después la página se comporta como una normal.
 */
export function renderAllSections(): void {
  document.documentElement.classList.add('cv-off');
}
