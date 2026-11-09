import {StrictMode} from 'react';
import {prerenderToNodeStream} from 'react-dom/static';
import App from './App';

/**
 * Genera el HTML de la web completa en el build (espera también a las
 * secciones cargadas con lazy). Lo usa scripts/prerender.mjs.
 */
export async function render(): Promise<string> {
  const {prelude} = await prerenderToNodeStream(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString('utf8');
}
