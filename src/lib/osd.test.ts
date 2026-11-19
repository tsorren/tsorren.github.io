import { test } from 'node:test';
import assert from 'node:assert/strict';
import { glifo, OSD_MS, paradas } from './logica.ts';

const ps = paradas([
  { id: 'a', pasos: [{ id: 'a-1' }] as never },
  { id: 'b', pasos: [{ id: 'b-1' }, { id: 'b-2' }] as never },
]);
// 0 hoy · 1 a · 2 a-1 · 3 b · 4 b-1 · 5 b-2 · 6 cielo · 7 cierre

test('R5: un paso adelante es PLAY y uno atrás es REW', () => {
  assert.equal(glifo(2, 3, ps), 'play');
  assert.equal(glifo(3, 2, ps), 'rew');
});
test('R5: saltar más de un paso es FF adelante y REW atrás', () => {
  assert.equal(glifo(2, 5, ps), 'ff');
  assert.equal(glifo(7, 3, ps), 'rew');
});
test('R5: de «Hoy» al capítulo 1 es REW (vuelve a 2016); saltar más lejos por la cinta o al contacto es FF', () => {
  assert.equal(glifo(0, 1, ps), 'rew');
  assert.equal(glifo(0, 2, ps), 'rew');
  assert.equal(glifo(0, 3, ps), 'ff');
  assert.equal(glifo(0, 7, ps), 'ff');
});
test('R5: los avisos vuelven a REC a los 1,6 s', () => {
  assert.equal(OSD_MS, 1600);
});
test('R5: sin cambio, REC', () => {
  assert.equal(glifo(3, 3, ps), 'rec');
});
