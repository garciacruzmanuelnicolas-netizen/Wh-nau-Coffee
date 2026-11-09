// Prerender: después de `vite build`, mete en dist/index.html la web ya pintada.
// Así el móvil enseña la página nada más recibir el HTML, sin esperar al JavaScript.
import {readFile, rm, writeFile} from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const ssrDir = new URL('dist-ssr/', root);
const htmlFile = new URL('dist/index.html', root);
const marker = '<div id="root"></div>';

const {render} = await import(new URL('entry-server.js', ssrDir).href);
const template = await readFile(htmlFile, 'utf8');
if (!template.includes(marker)) {
  throw new Error(`No encuentro ${marker} en dist/index.html`);
}

const appHtml = await render();
await writeFile(htmlFile, template.replace(marker, () => `<div id="root">${appHtml}</div>`));
await rm(ssrDir, {recursive: true, force: true});

console.log(`Prerender OK (${(appHtml.length / 1024).toFixed(1)} KB de HTML)`);
