---
status: aceptado
date: 2026-11-19
decision-makers: Tadeo Sorrentino
---

# Stack y arquitectura del sitio: Astro estático con una capa de experiencia en TypeScript

## Contexto y problema

El sitio se rehace desde cero. Es un portfolio bilingüe (español e inglés) contado como un relato en
constelación: una portada «Hoy» y, de 2016 a hoy, cinco capítulos que avanzan con el scroll mientras una
cámara recorre un cielo de estrellas; al final, el cielo completo y un cierre con contacto. No hay páginas de
caso. El sonido es opcional. Se publica en GitHub Pages, que sirve archivos estáticos: no hay reescrituras de
URL ni código de servidor.

¿Con qué se construye para que cada URL sea una página real, el contenido se lea sin JavaScript y la
experiencia viva como una capa encima del texto?

## Factores de decisión

- Cada URL (`/es/`, `/en/`) es un HTML propio, con `lang`, `hreflang` y Open Graph propios, porque Pages
  no reescribe rutas; cada paso del relato tiene un ancla compartible.
- El contenido se lee sin JS, con lector de pantalla y con movimiento reducido.
- Poco JavaScript en el cliente: el sitio es casi todo texto.
- Los datos viven en un solo lugar, con los dos idiomas juntos, y los mantiene una persona.
- El relato (unas 27 paradas por idioma) sale de un único archivo de datos, sin escribirlo dos veces a mano.

## Opciones consideradas

- A. Astro en modo estático, con la interactividad en TypeScript sin framework.
- B. Seguir con Vite + React como aplicación de una sola página (el stack del sitio anterior).
- C. Vite en modo multipágina, con los HTML escritos a mano.
- D. Eleventy.

## Decisión

Opción elegida: **A, Astro estático con una capa de experiencia en TypeScript sin framework**, porque es la única
que cumple todos los factores sin escribir un generador propio.

| Criterio (peso) | A | B | C | D |
|---|---|---|---|---|
| HTML real por URL, lectura sin JS (30) | 5 | 2 | 5 | 5 |
| JS mínimo en el cliente (20) | 5 | 2 | 5 | 5 |
| Mantenimiento: datos en un lugar, plantilla compartida (20) | 4 | 4 | 2 | 4 |
| Interactividad en TS con módulos y tipos (15) | 4 | 5 | 4 | 3 |
| Costo de cambio (15) | 3 | 5 | 4 | 2 |
| **Total** | **4,35** | 3,30 | 4,10 | 4,05 |

Decisiones derivadas:

- **Rutas por idioma** en carpetas (`src/pages/es/`, `src/pages/en/`), sin el módulo i18n de Astro: con dos
  páginas no hace falta. La raíz `/` elige el idioma en el navegador (preferencia guardada, después
  `navigator.languages`) y, sin JS, ofrece los dos enlaces y redirige a `/en/` con `<noscript>`.
- **Navegación por recarga simple**. Con dos páginas, la única navegación es el cambio de idioma, que conserva
  el paso en el ancla. Se descartó el `<ClientRouter />` de Astro:

  | Criterio (peso) | `ClientRouter` | Recarga simple |
  |---|---|---|
  | Continuidad del sonido al cambiar de idioma (10) | 5 | 1 |
  | JS extra en el cliente (30) | 2 | 5 |
  | Complejidad: reinicialización en `astro:page-load`, conteo a mano (30) | 2 | 5 |
  | Soporte de navegadores (15) | 5 | 5 |
  | Analytics con el script estándar (15) | 2 | 5 |
  | **Total** | 2,75 | **4,60** |

- **Avance con el scroll nativo** del documento y *scroll snap* de proximidad: cada paso es un bloque de texto de
  una pantalla; un `IntersectionObserver` decide el paso activo. Se descartó capturar la rueda
  (`preventDefault`): deja la página vacía sin JS y pelea con la inercia de los trackpads.
- **Cielo en el DOM y SVG**: estrellas posicionadas con CSS, líneas en un SVG, y la cámara como un
  `transform` sobre esa capa. Se descartaron canvas (no es accesible) y WebGL (dependencia pesada para un zoom 2D).
- **Sonido sintetizado con Web Audio**, sin archivos de audio.
- **Datos como módulos TypeScript tipados** (`src/data/`), con los textos ES y EN en el mismo registro. Se
  descartaron las Content Collections: suman esquema y carpetas para un solo registro que el tipo ya valida.

### Consecuencias

- Bueno: cada página existe como archivo; se comparte, se indexa y se lee sin JS.
- Bueno: el JS del cliente es solo la capa de experiencia; sin runtime de framework.
- Malo: se cambia de herramienta de build y se reescribe todo; nada del sitio anterior se reutiliza salvo el
  workflow de Pages.
- Malo: al cambiar de idioma la página se recarga; el sonido vuelve con el primer gesto en la otra página.

### Confirmación

- `npm test` corre las reglas de idioma, llegada, sonido, OSD y relato como funciones puras (`node --test`).
- `scripts/verificar-dist.mjs` revisa el build: cada HTML con `lang`, `hreflang` válidos, título, descripción y
  Open Graph; enlaces internos que existen; sin cookies ni fuentes de terceros.
- El workflow de Pages corre los dos antes de publicar.

## Pros y contras de las opciones

### A. Astro estático

- Bueno: genera un HTML por ruta y por idioma; cero JS por defecto.
- Bueno: TypeScript y Vite de base; los scripts se empaquetan por página.
- Neutral: es una dependencia de build nueva.
- Malo: la curva de Astro (componentes `.astro`).

### B. Vite + React (SPA)

- Bueno: es el stack actual; el deploy ya existe.
- Malo: un solo `index.html`; las URL por idioma necesitan el truco del `404.html`, sin `lang` ni Open Graph propios.
- Malo: sin JS no hay contenido, y el runtime de React pesa más que todo el JS propio.

### C. Vite multipágina a mano

- Bueno: sin dependencias nuevas.
- Malo: dos páginas de ~27 paradas cada una escritas a mano, o generadas con JS (que rompe la lectura sin JS),
  o un generador propio, que es reinventar un SSG.

### D. Eleventy

- Bueno: HTML estático y cero JS por defecto.
- Malo: TypeScript y el empaquetado de scripts quedan fuera de la herramienta; más configuración para lo mismo.

## Más información

- Páginas y rutas en Astro: https://docs.astro.build/en/basics/astro-pages/
- Terceros (analytics y fuentes): [ADR-0002](0002-analytics-y-fuentes.md).
