// Verifica el build (diseño, sección 7): RNF-04, RNF-07, R1 y RF-02 sobre dist/. Sin dependencias.
// Uso: npm run build && node scripts/verificar-dist.mjs
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
const SITIO = 'https://tsorren.github.io';
const archivos = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? archivos(join(d, e.name)) : [join(d, e.name)]));
const todos = archivos(DIST);
const htmls = todos.filter((f) => f.endsWith('.html'));
const errores = [];
const mal = (f, m) => errores.push(`${relative(DIST, f).split(sep).join('/')}: ${m}`);

// URL del sitio (/es/, /en/#x, https://tsorren.github.io/en/) → archivo en dist.
const archivoDe = (ruta) => {
  const p = ruta.replace(SITIO, '').split('#')[0];
  const f = join(DIST, p.endsWith('/') ? join(p, 'index.html') : p);
  return existsSync(f) ? f : null;
};
const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const attr = (html, re) => re.exec(html)?.[1];

for (const f of htmls) {
  const html = readFileSync(f, 'utf8');
  const es404 = f.endsWith(`${sep}404.html`);
  if (!/<html[^>]*\slang="[a-z]{2}/.test(html)) mal(f, 'falta lang');
  if (!attr(html, /<title>([^<]+)<\/title>/)) mal(f, 'falta title');
  if (!es404) {
    for (const m of ['description']) if (!attr(html, new RegExp(`<meta name="${m}" content="([^"]+)"`))) mal(f, `falta meta ${m}`);
    for (const m of ['og:title', 'og:description', 'og:url']) if (!attr(html, new RegExp(`<meta property="${m}" content="([^"]+)"`))) mal(f, `falta ${m}`);
    const alternas = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
    for (const l of ['es', 'en']) if (!alternas.some((a) => a[1] === l)) mal(f, `falta hreflang ${l}`);
    for (const [, , href] of alternas) if (!archivoDe(href)) mal(f, `hreflang a un archivo que no existe: ${href}`);
  }
  // Enlaces internos y anclas.
  const propios = ids(html);
  for (const [, href] of html.matchAll(/\shref="([^"]+)"/g)) {
    if (href.startsWith('#')) {
      if (href.length > 1 && !propios.has(href.slice(1))) mal(f, `ancla rota ${href}`);
    } else if (href.startsWith('/') && !href.startsWith('//')) {
      const destino = archivoDe(href);
      if (!destino) mal(f, `enlace roto ${href}`);
      else if (href.includes('#') && !ids(readFileSync(destino, 'utf8')).has(href.split('#')[1])) mal(f, `ancla rota ${href}`);
    }
  }
  if (/\/(es|en)\/index\.html$/.test(f.split(sep).join('/'))) {
    const n = (html.match(/class="capitulo"/g) ?? []).length;
    if (n !== 5) mal(f, `tiene ${n} capítulos (deben ser 5)`);
    for (const id of ['hoy', 'cielo', 'cierre', 'contacto']) if (!propios.has(id)) mal(f, `falta #${id}`);
  }
}

// Privacidad y R1 sobre todo lo que es texto.
for (const f of todos.filter((x) => /\.(html|css|js|xml|txt|json)$/.test(x))) {
  const txt = readFileSync(f, 'utf8');
  if (/fonts\.(googleapis|gstatic)\.com/.test(txt)) mal(f, 'referencia a Google Fonts');
  if (f.endsWith('.js') && txt.includes('document.cookie')) mal(f, 'usa document.cookie');
  if (/3046|6804|Bella Vista|\+54 ?9/.test(txt)) mal(f, 'teléfono o localidad');
}

if (htmls.length < 4) errores.push(`solo hay ${htmls.length} HTML (se esperan raíz, es, en y 404)`);
if (errores.length) {
  console.error(`verificar-dist: ${errores.length} problema(s)\n- ${errores.join('\n- ')}`);
  process.exit(1);
}
console.log(`verificar-dist: OK · ${htmls.length} HTML · ${todos.length} archivos`);
