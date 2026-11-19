import { test } from 'node:test';
import assert from 'node:assert/strict';
import { elegirIdioma, enlaceOtroIdioma } from './logica.ts';

test('R2: la URL gana a la preferencia y al navegador', () => {
  assert.equal(elegirIdioma('/en/', 'es', ['es-AR']), 'en');
  assert.equal(elegirIdioma('/es/', 'en', ['en-US']), 'es');
});
test('R2: sin idioma en la URL, gana la preferencia guardada', () => {
  assert.equal(elegirIdioma('/', 'es', ['en-US']), 'es');
});
test('R2: sin preferencia, el navegador; español si empieza con es', () => {
  assert.equal(elegirIdioma('/', null, ['es-AR', 'en']), 'es');
  assert.equal(elegirIdioma('/', null, ['pt-BR', 'es']), 'en');
  assert.equal(elegirIdioma('/', null, []), 'en');
});
test('R2: una preferencia inválida se ignora', () => {
  assert.equal(elegirIdioma('/', 'fr', ['es']), 'es');
});
test('RF-04: el enlace al otro idioma conserva el ancla', () => {
  assert.equal(enlaceOtroIdioma('es', '#produccion-2'), '/en/#produccion-2');
  assert.equal(enlaceOtroIdioma('en', ''), '/es/');
  assert.equal(enlaceOtroIdioma('en', '#'), '/es/');
});
