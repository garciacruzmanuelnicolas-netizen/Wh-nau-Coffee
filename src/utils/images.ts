/**
 * Devuelve src/srcSet/sizes para que cada móvil o PC descargue
 * solo el tamaño de imagen que necesita.
 */
export function responsiveImage(url: string, sizes: string) {
  if (url.includes('images.unsplash.com')) {
    const at = (w: number) => url.replace(/([?&])w=\d+/, `$1w=${w}`);
    return {
      src: at(800),
      srcSet: [400, 600, 800, 1200].map((w) => `${at(w)} ${w}w`).join(', '),
      sizes,
    };
  }
  const local = url.match(/^(.*)-(\d+)\.webp$/);
  if (local) {
    return {
      src: url,
      srcSet: [640, 960, 1376].map((w) => `${local[1]}-${w}.webp ${w}w`).join(', '),
      sizes,
    };
  }
  return { src: url };
}
