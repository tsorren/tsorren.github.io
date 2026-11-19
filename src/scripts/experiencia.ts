// Capa de experiencia (mejora progresiva): el documento ya se lee solo; esto mueve el cielo con el scroll.
import { relato, type Idioma } from '../data/relato.ts';
import {
  capituloDe,
  encuadre,
  enlaceOtroIdioma,
  estrellas,
  glifo,
  OSD_MS,
  leerPaleta,
  llegada,
  paradas,
  siguientePaleta,
  type Glifo,
} from '../lib/logica.ts';
import { crearSonido } from './sonido.ts';

const raiz = document.documentElement;
const L: Idioma = raiz.lang.startsWith('es') ? 'es' : 'en';
const caps = relato.capitulos;
const ps = paradas(caps);
const n = caps.map((c) => c.pasos.length);
const reducido = matchMedia('(prefers-reduced-motion: reduce)');
const movil = matchMedia('(max-width: 640px)');
const $$ = <T extends Element = HTMLElement>(s: string) => [...document.querySelectorAll<T>(s as never)] as T[];
const leer = (k: string) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const guardar = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* ventana privada: se comporta como la primera visita */
  }
};

// ---------- Elementos ----------
const mundo = document.querySelector<HTMLElement>('.mundo')!;
const capEst = $$('.est.cap');
const capLbl = $$('.lbl.cap');
const subEst = caps.map((_, c) => $$(`.est.sub[data-c="${c}"]`));
const subLbl = caps.map((_, c) => $$(`.lbl.sub[data-c="${c}"]`));
const lineas = $$<SVGLineElement>('.trazos .linea');
const subl = $$<SVGLineElement>('.trazos .subl');
const cinta = $$<HTMLAnchorElement>('.cinta a');
const osd = document.querySelector<HTMLElement>('.osd')!;
const osdLab = osd.querySelector('.osd-lab')!;
const osdFecha = osd.querySelector('.osd-fecha')!;
const glifoSvg = osd.querySelector('svg')!;
const anuncio = document.getElementById('anuncio')!;
const enlaceIdioma = document.getElementById('idioma') as HTMLAnchorElement;
const botonSonido = document.getElementById('sonido') as HTMLButtonElement;
const cierre = document.getElementById('cierre')!;
const elParada = $$('[data-i]');

// ---------- OSD (R5) ----------
const GLIFOS: Record<Glifo, [string, string]> = {
  rec: ['<circle cx="8" cy="8" r="5"/>', 'REC'],
  play: ['<path d="M4 3l9 5-9 5z"/>', 'PLAY'],
  rew: ['<path d="M8 3 1 8l7 5zM15 3 8 8l7 5z"/>', 'REW'],
  ff: ['<path d="M1 3l7 5-7 5zM8 3l7 5-7 5z"/>', 'FF'],
  pause: ['<path d="M3 3h3.5v10H3zM9.5 3H13v10H9.5z"/>', 'PAUSE'],
};
let reposoFecha = '';
let osdT = 0;
function pintarOsd(g: Glifo) {
  osd.dataset.g = g;
  glifoSvg.innerHTML = GLIFOS[g][0];
  osdLab.textContent = GLIFOS[g][1];
  osdFecha.textContent = g === 'rec' ? reposoFecha : '';
}
function flash(g: Glifo) {
  pintarOsd(g);
  clearTimeout(osdT);
  if (g !== 'rec') osdT = window.setTimeout(() => pintarOsd('rec'), OSD_MS);
}

// ---------- Sonido (R4) ----------
const sonido = crearSonido();
let paleta = leerPaleta(leer('pref.sonido'));
function pintarSonido() {
  botonSonido.setAttribute('aria-pressed', String(paleta !== 'off'));
  const txt = botonSonido.dataset[paleta]!;
  botonSonido.querySelector('span')!.textContent = txt;
  botonSonido.setAttribute('aria-label', `${botonSonido.dataset.nombre}: ${txt}`);
}
botonSonido.dataset.nombre = botonSonido.getAttribute('aria-label') ?? '';
botonSonido.hidden = false;
pintarSonido();
sonido.set(paleta);
botonSonido.addEventListener('click', () => {
  paleta = siguientePaleta(paleta);
  guardar('pref.sonido', paleta);
  pintarSonido();
  sonido.set(paleta);
  if (paleta === 'off') flash('pause');
});
const alPrimerGesto = () => sonido.gesto();
for (const ev of ['pointerdown', 'keydown'] as const) addEventListener(ev, alPrimerGesto, { once: true });

// ---------- Cámara y estrellas (RF-06) ----------
function camara(i: number) {
  const m = movil.matches;
  const { cx, cy, s, fy } = encuadre(ps[i], caps.map((c) => (m ? c.pos.movil : c.pos.escritorio)), m);
  const W = innerWidth;
  const H = innerHeight;
  mundo.style.transform = `translate(${W / 2 - (cx / 100) * W * s}px, ${H * fy - (cy / 100) * H * s}px) scale(${s})`;
  mundo.style.setProperty('--s', String(s));
}

const marcar = (el: Element, b: string) => {
  el.classList.toggle('on', b !== 'off');
  el.classList.toggle('act', b === 'act');
};

let actual = -1;
// Un salto por enlace (cinta, «Contacto», cielo) recorre varias paradas: R5 lo trata como un solo FF o REW.
let salto: { de: number; a: number } | null = null;
let saltoT = 0;
document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
  const el = a && document.getElementById(a.hash.slice(1));
  if (!el) return;
  const parada = el.matches('[data-i]') ? el : (el.querySelector('[data-i]') ?? el.closest('[data-i]'));
  if (!(parada instanceof HTMLElement)) return;
  salto = Number(parada.dataset.i) === actual ? null : { de: actual, a: Number(parada.dataset.i) };
  clearTimeout(saltoT);
  saltoT = window.setTimeout(() => (salto = null), 3000);
});

function mostrar(i: number) {
  if (i === actual || i < 0) return;
  const prev = actual;
  actual = i;
  const p = ps[i];
  const e = estrellas(i, ps, n);
  e.caps.forEach((b, c) => {
    marcar(capEst[c], b);
    marcar(capLbl[c], b);
  });
  e.pasos.forEach((fila, c) => fila.forEach((b, k) => {
    marcar(subEst[c][k], b);
    marcar(subLbl[c][k], b);
  }));
  lineas.forEach((l) => l.classList.toggle('on', e.lineas[Number(l.dataset.linea)]));
  subl.forEach((l) => {
    const [c, k] = l.dataset.subl!.split('-').map(Number);
    l.classList.toggle('on', e.pasos[c][k] !== 'off');
  });
  camara(i);

  const cap = capituloDe(p);
  cinta.forEach((a, c) => (c === cap ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
  reposoFecha = cap >= 0 ? caps[cap].fecha[L] : '';
  for (const t of ['hoy', 'cielo', 'cierre']) raiz.classList.toggle(`en-${t}`, p.tipo === t);

  if (salto && i !== salto.a) {
    // paso intermedio de un salto: se mueve el cielo, pero el OSD y el sonido esperan a la llegada
  } else if (prev >= 0) {
    const desde = salto ? salto.de : prev;
    salto = null;
    flash(glifo(desde, i, ps));
    if (cap !== capituloDe(ps[desde])) {
      anuncio.textContent = cap >= 0 ? `${caps[cap].fecha[L]} · ${caps[cap].nombre[L]}` : '';
    }
    sonido.evento(i < desde ? 'retroceder' : p.tipo === 'paso' ? 'estrella' : 'avanzar');
  } else {
    // El primer encuadre no se anima: la cámara ya está donde llegó el visitante.
    pintarOsd('rec');
    requestAnimationFrame(() => requestAnimationFrame(() => mundo.classList.remove('sin-transicion')));
  }
  if (p.tipo === 'cierre' && !cierre.classList.contains('armada')) {
    cierre.classList.add('armada');
    sonido.evento('cierre');
  }

  // D7: la posición vive en el ancla, sin llenar el historial.
  history.replaceState(null, '', i === 0 ? location.pathname : `#${p.id}`);
  enlaceIdioma.href = enlaceOtroIdioma(L, location.hash);
}

// ---------- Llegada (R3) ----------
const ids = [...ps.map((p) => p.id), 'contacto'];
const ll = llegada(location.hash, ids, reducido.matches);
if (ll.revelar) {
  raiz.classList.add('revelar');
  const completar = () => raiz.classList.add('completo');
  for (const ev of ['keydown', 'pointerdown', 'wheel', 'touchstart'] as const) addEventListener(ev, completar, { once: true, passive: true });
}
mundo.classList.add('sin-transicion');

// ---------- Avance (D3): el scroll nativo decide el paso activo ----------
// R3, columna 1: con un ancla válida, se arranca en ese paso sin recorrer las paradas intermedias.
history.scrollRestoration = 'manual'; // al recargar manda el ancla (D7), no la posición vieja del navegador
if (ll.destino !== 'hoy') {
  const el = document.getElementById(ll.destino)!;
  el.scrollIntoView({ behavior: 'instant' });
  const p = el.closest<HTMLElement>('[data-i]') ?? el.querySelector<HTMLElement>('[data-i]');
  if (p) mostrar(Number(p.dataset.i));
}
const io = new IntersectionObserver(
  (entradas) => {
    for (const en of entradas) if (en.isIntersecting) mostrar(Number((en.target as HTMLElement).dataset.i));
  },
  { rootMargin: '-48% 0px -51% 0px' },
);
elParada.forEach((el) => io.observe(el));
addEventListener('resize', () => actual >= 0 && camara(actual));

const ir = (i: number) => {
  const el = elParada[Math.max(0, Math.min(ps.length - 1, i))];
  el.scrollIntoView({ behavior: reducido.matches ? 'auto' : 'smooth' });
};
addEventListener('keydown', (e) => {
  if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
  if ((e.target as HTMLElement).closest('summary, input, textarea, select')) return;
  const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
  if (!d) return;
  e.preventDefault();
  ir(Math.max(actual, 0) + d);
});

// Cielo completo: tocar una estrella de capítulo lleva a su título.
capEst.forEach((el, c) =>
  el.addEventListener('click', () => {
    if (!raiz.classList.contains('en-cielo')) return;
    salto = { de: actual, a: ps.findIndex((p) => p.id === caps[c].id) };
    document.getElementById(caps[c].id)!.scrollIntoView({ behavior: reducido.matches ? 'auto' : 'smooth' });
  }),
);

enlaceIdioma.addEventListener('click', () => guardar('pref.idioma', L === 'es' ? 'en' : 'es'));
