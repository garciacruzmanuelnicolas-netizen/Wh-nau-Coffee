// Genera "mini-fuentes" con SOLO las letras que se ven al entrar en la web
// (cabecera, portada y botones flotantes). Pesan ~16 KB en total frente a ~82 KB
// de las fuentes completas, así que llegan antes del primer pintado sin retrasarlo.
// El resto de la web usa las fuentes completas (@fontsource), que se cargan después.
//
// Si cambias algún texto de Navbar.tsx, Hero.tsx o FloatingButtons.tsx, añade aquí
// las letras nuevas y ejecuta:  npm run fonts:critical
// (si falta una letra no se rompe nada: el navegador usa la fuente completa para ella).
import subsetFont from 'subset-font';
import {mkdir, readFile, writeFile} from 'node:fs/promises';

const FONTSOURCE = new URL('../node_modules/@fontsource/', import.meta.url);
const OUT_DIR = new URL('../src/assets/fonts/critical/', import.meta.url);
const CSS_FILE = new URL('../src/fonts-critical.css', import.meta.url);

const FONTS = [
  {
    family: 'Playfair Critical',
    pkg: 'playfair-display',
    short: 'playfair',
    weight: 700,
    style: 'normal',
    text: 'Whānau Coffee', // logo de la cabecera + título de la portada
  },
  {
    family: 'Playfair Critical',
    pkg: 'playfair-display',
    short: 'playfair',
    weight: 400,
    style: 'italic',
    text: '"Café de especialidad, desayunos irresistibles y el mejor ambiente de Garrucha."',
  },
  {
    family: 'Poppins Critical',
    pkg: 'poppins',
    short: 'poppins',
    weight: 400,
    style: 'normal',
    text: 'Calle Mayor 150, 04630 Garrucha, Almería',
  },
  {
    family: 'Poppins Critical',
    pkg: 'poppins',
    short: 'poppins',
    weight: 500,
    style: 'normal',
    text:
      'Garrucha • Almería • Café 100% Arábica ☕ Ver Menú 📍 Cómo llegar ' +
      'Inicio Nosotros Especialidades Opiniones Horario Ubicación Contacto Reservar Mesa Abierto Cerrado',
  },
  {
    family: 'Poppins Critical',
    pkg: 'poppins',
    short: 'poppins',
    weight: 600,
    style: 'normal',
    text: 'Coffee • Garrucha WhatsApp', // "COFFEE • GARRUCHA" va en mayúsculas por CSS
  },
];

// Subconjuntos de @fontsource que se usan (cada archivo trae su unicode-range)
const SUBSETS = {latin: 'lat', 'latin-ext': 'ext'};

/** Lee el CSS de @fontsource y devuelve {subset: {file, codepoints}} */
async function readFaces(pkg, weight, style) {
  const cssName = `${weight}${style === 'italic' ? '-italic' : ''}.css`;
  const css = await readFile(new URL(`${pkg}/${cssName}`, FONTSOURCE), 'utf8');
  const faces = {};
  for (const block of css.split('@font-face').slice(1)) {
    const file = block.match(/url\(\.\/files\/([^)]+\.woff2)\)/)?.[1];
    const range = block.match(/unicode-range:\s*([^;]+);/)?.[1];
    const subset = Object.keys(SUBSETS).find((s) => file?.includes(`-${s}-${weight}-`));
    if (!file || !range || !subset) continue;
    const codepoints = new Set();
    for (const part of range.split(',')) {
      const [from, to] = part.trim().replace('U+', '').split('-');
      for (let cp = parseInt(from, 16); cp <= parseInt(to ?? from, 16); cp++) codepoints.add(cp);
    }
    faces[subset] = {file, codepoints};
  }
  return faces;
}

const hex = (cp) => `U+${cp.toString(16).toUpperCase()}`;
const both = (text) => text + text.toUpperCase() + text.toLowerCase();

await mkdir(OUT_DIR, {recursive: true});
let css = '/* Generado por scripts/critical-fonts.mjs (npm run fonts:critical): no editar a mano */\n';
let total = 0;

for (const font of FONTS) {
  const faces = await readFaces(font.pkg, font.weight, font.style);
  const chars = [...new Set(both(font.text))].map((ch) => ch.codePointAt(0));
  for (const [subset, suffix] of Object.entries(SUBSETS)) {
    const face = faces[subset];
    const wanted = chars.filter((cp) => face?.codepoints.has(cp)).sort((a, b) => a - b);
    if (!wanted.length) continue;
    const source = await readFile(new URL(`${font.pkg}/files/${face.file}`, FONTSOURCE));
    const subsetted = await subsetFont(source, String.fromCodePoint(...wanted), {targetFormat: 'woff2'});
    const name = `critical-${font.short}-${font.weight}${font.style === 'italic' ? '-italic' : ''}-${suffix}.woff2`;
    await writeFile(new URL(name, OUT_DIR), subsetted);
    total += subsetted.length;
    css +=
      `@font-face {\n  font-family: '${font.family}';\n  font-style: ${font.style};\n` +
      `  font-weight: ${font.weight};\n  font-display: swap;\n` +
      `  src: url('./assets/fonts/critical/${name}') format('woff2');\n` +
      `  unicode-range: ${wanted.map(hex).join(', ')};\n}\n`;
    console.log(`${name.padEnd(40)} ${String(subsetted.length).padStart(6)} bytes (${wanted.length} letras)`);
  }
}

await writeFile(CSS_FILE, css);
console.log(`Total: ${(total / 1024).toFixed(1)} KB -> src/fonts-critical.css`);
