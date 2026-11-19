import { test } from 'node:test';
import assert from 'node:assert/strict';
import { llegada } from './logica.ts';

const ids = ['hoy', 'empezar', 'produccion-2', 'cierre'];

test('R3: un ancla válida va a ese paso, sin revelado', () => {
  assert.deepEqual(llegada('#produccion-2', ids, false), { destino: 'produccion-2', revelar: false });
  assert.deepEqual(llegada('#produccion-2', ids, true), { destino: 'produccion-2', revelar: false });
});
test('R3: un ancla que no existe se trata como sin ancla', () => {
  assert.deepEqual(llegada('#no-existe', ids, false), { destino: 'hoy', revelar: true });
});
test('R3: movimiento reducido muestra «Hoy» estático', () => {
  assert.deepEqual(llegada('', ids, true), { destino: 'hoy', revelar: false });
});
test('R3: sin ancla ni movimiento reducido, revelado en 3 tiempos', () => {
  assert.deepEqual(llegada('', ids, false), { destino: 'hoy', revelar: true });
});
