import { test } from 'node:test';
import assert from 'node:assert/strict';
import { relato, ui, type Texto } from './relato.ts';

const textos: Texto[] = [];
const junta = (v: unknown): void => {
  if (!v || typeof v !== 'object') return;
  if ('es' in v && 'en' in v) textos.push(v as Texto);
  else Object.values(v).forEach(junta);
};
junta(relato);
junta(ui);

test('modelo: 5 capítulos, de 1 a 5 pasos, 3 cifras, 4 grupos, 3 líneas', () => {
  assert.equal(relato.capitulos.length, 5);
  for (const c of relato.capitulos) assert.ok(c.pasos.length >= 1 && c.pasos.length <= 5, c.id);
  assert.equal(relato.hoy.cifras.length, 3);
  assert.equal(relato.aporte.length, 4);
  assert.equal(relato.cierre.lineas.length, 3);
});
test('modelo: ids de capítulo y de paso únicos, en slug', () => {
  const ids = relato.capitulos.flatMap((c) => [c.id, ...c.pasos.map((p) => p.id)]);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^[a-z0-9-]+$/);
});
test('R1: todo texto tiene ES y EN no vacíos', () => {
  assert.ok(textos.length > 50);
  for (const x of textos) assert.ok(x.es.trim() && x.en.trim(), JSON.stringify(x));
});
test('R1: todo paso de tipo hecho declara su fuente', () => {
  for (const c of relato.capitulos) {
    assert.ok(c.fuente);
    for (const p of c.pasos) if (p.tipo === 'hecho') assert.ok(p.fuente, p.id);
  }
});
test('diccionario: largos máximos', () => {
  const max = (x: Texto, n: number, que: string) =>
    assert.ok(x.es.length <= n && x.en.length <= n, `${que}: ${x.es} / ${x.en}`);
  max(relato.hoy.frase, 90, 'hoy.frase');
  for (const c of relato.hoy.cifras) max(c.valor, 10, 'cifra');
  for (const c of relato.capitulos) {
    max(c.nombre, 40, 'capitulo.nombre');
    for (const p of c.pasos) {
      max(p.rotulo, 16, 'paso.rotulo');
      max(p.frase, 150, 'paso.frase');
    }
  }
  for (const l of relato.cierre.lineas) max(l, 60, 'cierre.linea');
  max(relato.cierre.meta, 90, 'cierre.meta');
});
test('R1: ningún texto lleva teléfono ni localidad', () => {
  assert.doesNotMatch(JSON.stringify(relato) + JSON.stringify(ui), /3046|6804|Bella Vista|\+54/);
});
