// Sonido sintetizado con Web Audio (D5): sin archivos. Sistema = avisos cortos; Ambiente = avisos + un colchón.
import { debeSonar, type Paleta } from '../lib/logica.ts';

export type Evento = 'avanzar' | 'retroceder' | 'estrella' | 'cierre';
const TONO: Record<Evento, number[]> = { avanzar: [660], retroceder: [440], estrella: [988], cierre: [523, 659, 784] };

export function crearSonido() {
  let ctx: AudioContext | null = null;
  let paleta: Paleta = 'off';
  let gesto = false;
  let colchon: (() => void) | null = null;
  const suena = () => debeSonar(paleta, document.visibilityState === 'visible', gesto);

  function actualizar() {
    if (!suena()) {
      colchon?.();
      colchon = null;
      ctx?.suspend();
      return;
    }
    ctx ??= new AudioContext();
    ctx.resume();
    if (paleta === 'ambiente' && !colchon) colchon = crearColchon(ctx);
    if (paleta !== 'ambiente' && colchon) {
      colchon();
      colchon = null;
    }
  }

  function blip(f: number, cuando: number) {
    if (!ctx || !suena()) return;
    const t = ctx.currentTime + cuando;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.value = f;
    g.gain.setValueAtTime(0.045, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + 0.14);
  }

  document.addEventListener('visibilitychange', actualizar);
  return {
    gesto() {
      gesto = true;
      actualizar();
    },
    set(p: Paleta) {
      paleta = p;
      actualizar();
    },
    evento(e: Evento) {
      TONO[e].forEach((f, k) => blip(f, k * 0.12));
    },
  };
}

// Tres senos graves detrás de un pasabajos, con entrada y salida suaves.
function crearColchon(c: AudioContext) {
  const g = c.createGain();
  const filtro = c.createBiquadFilter();
  filtro.type = 'lowpass';
  filtro.frequency.value = 500;
  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(0.03, c.currentTime + 2);
  filtro.connect(g).connect(c.destination);
  const osc = [110, 164.8, 220.6].map((f) => {
    const o = c.createOscillator();
    o.frequency.value = f;
    o.connect(filtro);
    o.start();
    return o;
  });
  return () => {
    g.gain.cancelScheduledValues(c.currentTime);
    g.gain.setValueAtTime(g.gain.value, c.currentTime);
    g.gain.linearRampToValueAtTime(0, c.currentTime + 0.6);
    osc.forEach((o) => o.stop(c.currentTime + 0.7));
  };
}
