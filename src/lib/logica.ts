// Reglas del sitio como funciones puras (diseño, sección 5): se testean sin navegador.
import type { Capitulo, Idioma, Pos } from '../data/relato.ts';

// ---------- R2. Idioma ----------
export function elegirIdioma(ruta: string, pref: string | null, languages: readonly string[]): Idioma {
  const m = /^\/(es|en)(\/|$)/.exec(ruta);
  if (m) return m[1] as Idioma;
  if (pref === 'es' || pref === 'en') return pref;
  return languages[0]?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export const enlaceOtroIdioma = (idioma: Idioma, ancla = '') =>
  `/${idioma === 'es' ? 'en' : 'es'}/${ancla && ancla !== '#' ? ancla : ''}`;

// ---------- Paradas del recorrido ----------
export type Parada =
  | { tipo: 'hoy'; id: 'hoy' }
  | { tipo: 'titulo'; id: string; cap: number }
  | { tipo: 'paso'; id: string; cap: number; paso: number }
  | { tipo: 'cielo'; id: 'cielo' }
  | { tipo: 'cierre'; id: 'cierre' };

export function paradas(capitulos: readonly Pick<Capitulo, 'id' | 'pasos'>[]): Parada[] {
  const r: Parada[] = [{ tipo: 'hoy', id: 'hoy' }];
  capitulos.forEach((c, cap) => {
    r.push({ tipo: 'titulo', id: c.id, cap });
    c.pasos.forEach((p, paso) => r.push({ tipo: 'paso', id: p.id, cap, paso }));
  });
  r.push({ tipo: 'cielo', id: 'cielo' }, { tipo: 'cierre', id: 'cierre' });
  return r;
}

// ---------- R3. Llegada ----------
export function llegada(ancla: string, ids: readonly string[], reducido: boolean) {
  const id = ancla.replace(/^#/, '');
  if (id && ids.includes(id)) return { destino: id, revelar: false };
  return { destino: 'hoy', revelar: !reducido };
}

// ---------- R5. OSD ----------
export type Glifo = 'rec' | 'play' | 'rew' | 'ff' | 'pause';

export function glifo(prev: number, i: number, ps: readonly Parada[]): Glifo {
  const d = i - prev;
  if (d === 0) return 'rec';
  if (ps[prev]?.tipo === 'hoy' && ps[i]?.tipo !== 'cielo' && ps[i]?.tipo !== 'cierre') return 'rew'; // vuelve a 2016
  if (d < 0) return 'rew';
  return d === 1 ? 'play' : 'ff';
}

export const capituloDe = (p: Parada | undefined) => (p && 'cap' in p ? p.cap : -1);

// ---------- RF-06. Estrellas y líneas ----------
export type Brillo = 'off' | 'on' | 'act';

export function estrellas(i: number, ps: readonly Parada[], pasosPorCap: readonly number[]) {
  const p = ps[i];
  const todo = p.tipo === 'cielo' || p.tipo === 'cierre';
  const cur = capituloDe(p);
  const ultimo = pasosPorCap.length - 1;
  const caps: Brillo[] = pasosPorCap.map((_, c) => {
    if (todo || c < cur) return 'on';
    if (c === cur) return p.tipo === 'titulo' ? 'act' : 'on';
    return p.tipo === 'hoy' && c === ultimo ? 'on' : 'off';
  });
  const pasos: Brillo[][] = pasosPorCap.map((n, c) =>
    Array.from({ length: n }, (_, k): Brillo => {
      if (todo || c < cur) return 'on';
      if (c !== cur || p.tipo !== 'paso') return 'off';
      return k < p.paso ? 'on' : k === p.paso ? 'act' : 'off';
    }),
  );
  // línea j une el capítulo j con el j+1
  const lineas = pasosPorCap.slice(1).map((_, j) => todo || j + 1 <= cur);
  return { caps, pasos, lineas };
}

// Posición de la sub-estrella k de n alrededor de su capítulo (en % del cielo).
export function subPos(c: Pos, k: number, n: number, movil: boolean): Pos {
  const a = ((-150 + (n === 1 ? 60 : (k * 300) / (n - 1))) * Math.PI) / 180;
  const [rx, ry] = movil ? [11, 4.6] : [5.2, 9];
  return { x: +(c.x + Math.cos(a) * rx).toFixed(2), y: +(c.y + Math.sin(a) * ry).toFixed(2) };
}

// ---------- Cámara ----------
// cx, cy: punto del cielo (%) que se lleva al foco; s: zoom; fy: altura del foco en la pantalla (0–1).
export function encuadre(p: Parada, centros: readonly Pos[], movil: boolean) {
  if (p.tipo === 'titulo' || p.tipo === 'paso') {
    const c = centros[p.cap];
    return { cx: c.x, cy: c.y, s: movil ? 2.2 : 2.6, fy: 0.4 };
  }
  if (p.tipo === 'hoy' && !movil) return { cx: 62, cy: 42, s: 1.25, fy: 0.5 };
  return { cx: 50, cy: 50, s: 1, fy: 0.5 };
}

// ---------- R4. Sonido ----------
export type Paleta = 'off' | 'sistema' | 'ambiente';
export const PALETAS: readonly Paleta[] = ['off', 'sistema', 'ambiente'];

export const siguientePaleta = (p: Paleta): Paleta => PALETAS[(PALETAS.indexOf(p) + 1) % PALETAS.length];
export const leerPaleta = (v: string | null): Paleta => (PALETAS.includes(v as Paleta) ? (v as Paleta) : 'off');
export const debeSonar = (p: Paleta, visible: boolean, huboGesto: boolean) => p !== 'off' && visible && huboGesto;
