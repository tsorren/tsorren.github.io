import { test } from 'node:test';
import assert from 'node:assert/strict';
import { encuadre, estrellas, paradas, subPos } from './logica.ts';

const caps = [
  { id: 'a', pasos: [{ id: 'a-1' }] as never },
  { id: 'b', pasos: [{ id: 'b-1' }, { id: 'b-2' }] as never },
  { id: 'c', pasos: [{ id: 'c-1' }] as never },
];
const ps = paradas(caps);
const n = [1, 2, 1];
// 0 hoy · 1 a · 2 a-1 · 3 b · 4 b-1 · 5 b-2 · 6 c · 7 c-1 · 8 cielo · 9 cierre

test('paradas: empieza en «Hoy», un título por capítulo, termina en cielo y cierre', () => {
  assert.deepEqual(ps.map((p) => p.id), ['hoy', 'a', 'a-1', 'b', 'b-1', 'b-2', 'c', 'c-1', 'cielo', 'cierre']);
});
test('RF-06: en «Hoy» solo brilla el capítulo de hoy y no hay líneas', () => {
  const e = estrellas(0, ps, n);
  assert.deepEqual(e.caps, ['off', 'off', 'on']);
  assert.deepEqual(e.lineas, [false, false]);
});
test('RF-06: el título activa su capítulo y traza la línea desde el anterior', () => {
  const e = estrellas(3, ps, n);
  assert.deepEqual(e.caps, ['on', 'act', 'off']);
  assert.deepEqual(e.pasos, [['on'], ['off', 'off'], ['off']]);
  assert.deepEqual(e.lineas, [true, false]);
});
test('RF-06: la última sub-estrella de un capítulo queda activa y las anteriores encendidas', () => {
  assert.deepEqual(estrellas(5, ps, n).pasos[1], ['on', 'act']);
});
test('RF-06: un capítulo de un solo paso funciona', () => {
  assert.deepEqual(estrellas(2, ps, n).pasos[0], ['act']);
});
test('RF-06: el cielo y el cierre encienden todo', () => {
  for (const i of [8, 9]) {
    const e = estrellas(i, ps, n);
    assert.ok(e.caps.every((b) => b === 'on'));
    assert.ok(e.pasos.flat().every((b) => b === 'on'));
    assert.ok(e.lineas.every(Boolean));
  }
});
test('cámara: zoom al capítulo con el foco arriba del centro (el subtítulo va abajo); cielo sin zoom', () => {
  const centros = [{ x: 10, y: 70 }, { x: 50, y: 50 }, { x: 80, y: 30 }];
  assert.deepEqual(encuadre(ps[4], centros, false), { cx: 50, cy: 50, s: 2.6, fy: 0.4 });
  assert.deepEqual(encuadre(ps[8], centros, true), { cx: 50, cy: 50, s: 1, fy: 0.5 });
});
test('subPos: un solo paso queda arriba del capítulo (el rótulo va abajo); varios se reparten', () => {
  const c = { x: 50, y: 50 };
  const uno = subPos(c, 0, 1, false);
  assert.ok(Math.abs(uno.x - 50) < 0.01 && uno.y < 50);
  assert.notDeepEqual(subPos(c, 0, 3, false), subPos(c, 2, 3, false));
});
