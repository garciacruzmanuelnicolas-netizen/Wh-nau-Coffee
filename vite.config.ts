import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

/**
 * Optimiza el index.html del build:
 * 1. Mete el CSS dentro del HTML (el navegador pinta sin pedir otro archivo).
 * 2. Precarga las mini-fuentes que no hayan quedado dentro del CSS (ver
 *    assetsInlineLimit: normalmente van todas en línea y no hace falta ninguna).
 * 3. Descarga el JS pronto pero con prioridad baja y lo ejecuta cuando la página
 *    ya se ha visto (afterFirstPaint, definido en index.html): la web prerenderizada
 *    se ve al instante y luego React la "hidrata".
 */
function optimizeHtml(): Plugin {
  return {
    name: 'optimize-html',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const html = bundle['index.html'];
      if (!html || html.type !== 'asset') return;
      let source = String(html.source);

      // 1. CSS en línea
      for (const [fileName, file] of Object.entries(bundle)) {
        if (file.type !== 'asset' || !fileName.endsWith('.css')) continue;
        const escaped = fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const tag = new RegExp(`<link rel="stylesheet"[^>]*href="/${escaped}"[^>]*>`);
        if (!tag.test(source)) continue;
        source = source.replace(tag, () => `<style>${file.source}</style>`);
        delete bundle[fileName];
      }

      // 2. Precarga de las mini-fuentes
      const fontLinks = Object.keys(bundle)
        .filter((f) => /\/critical-[^/]+\.woff2$/.test(f))
        .map((f) => `<link rel="preload" as="font" type="font/woff2" href="/${f}" crossorigin>`);
      if (!fontLinks.length) this.warn('No hay mini-fuentes "critical-*" para precargar');
      source = source.replace('<title>', () => `${fontLinks.join('\n    ')}\n    <title>`);

      // 3. JS después del primer pintado
      source = source.replace(
        /<script type="module" crossorigin src="(\/assets\/[^"]+\.js)"><\/script>/,
        (_match, src: string) =>
          `<link rel="modulepreload" crossorigin href="${src}" fetchpriority="low">\n    ` +
          `<script type="module">(window.afterFirstPaint||(f=>f()))(()=>import("${src}"))</script>`,
      );

      html.source = source;
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), optimizeHtml()],
    build: {
      // Las mini-fuentes de lo que se ve al entrar (~17 KB, `npm run fonts:critical`)
      // van dentro del CSS, y este dentro del HTML: el primer pintado ya sale con la
      // tipografía buena sin pedir nada más. Las fuentes completas nunca van en línea.
      assetsInlineLimit: (filePath: string) => {
        if (filePath.includes('/fonts/critical/')) return true;
        if (/\.woff2?$/.test(filePath)) return false;
        return undefined;
      },
    },
    define: {
      __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
