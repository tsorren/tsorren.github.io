import { test } from 'node:test';
import assert from 'node:assert/strict';
import { debeSonar, leerPaleta, siguientePaleta } from './logica.ts';

test('R4: apagado por defecto y ante un valor desconocido', () => {
  assert.equal(leerPaleta(null), 'off');
  assert.equal(leerPaleta('ruido'), 'off');
  assert.equal(leerPaleta('ambiente'), 'ambiente');
});
test('R4: el botón cicla off → sistema → ambiente → off', () => {
  assert.equal(siguientePaleta('off'), 'sistema');
  assert.equal(siguientePaleta('sistema'), 'ambiente');
  assert.equal(siguientePaleta('ambiente'), 'off');
});
test('R4: suena solo con paleta, pestaña visible y gesto', () => {
  assert.equal(debeSonar('sistema', true, true), true);
  assert.equal(debeSonar('off', true, true), false);
  assert.equal(debeSonar('sistema', false, true), false);
  assert.equal(debeSonar('ambiente', true, false), false);
});
