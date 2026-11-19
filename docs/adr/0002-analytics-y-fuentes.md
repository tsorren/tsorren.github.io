---
status: aceptado
date: 2026-11-19
decision-makers: Tadeo Sorrentino
---

# Terceros: analytics sin cookies con GoatCounter y fuentes autoalojadas

## Contexto y problema

El sitio necesita saber cuántas visitas recibe y desde dónde llegan, sin cookies, sin banner de consentimiento y
sin datos personales de quien visita. Además usa cinco tipografías de Google Fonts (Permanent Marker, Caveat,
Courier Prime, JetBrains Mono y VT323). Cargarlas desde Google le pasa la IP de cada visitante a un tercero.

¿Qué servicio de analytics se usa, y cómo se sirven las fuentes?

## Factores de decisión

- Sin cookies ni datos personales (eliminatorio).
- Costo cero para un sitio personal.
- Pocos terceros en tiempo de ejecución.
- Integración simple en un sitio estático.

## Opciones consideradas

Analytics: GoatCounter (hosteado), Cloudflare Web Analytics y Plausible. Fuentes: autoalojadas con Fontsource o
cargadas desde Google Fonts.

## Decisión

**GoatCounter** para analytics y **fuentes autoalojadas con Fontsource**.

| Analytics, criterio (peso) | GoatCounter | Cloudflare Web Analytics | Plausible |
|---|---|---|---|
| Sin cookies ni datos personales (35) | 5 | 5 | 5 |
| Costo (25) | 5 | 5 | 1 |
| Independencia y código abierto (15) | 5 | 2 | 4 |
| Integración simple (15) | 5 | 4 | 5 |
| Datos útiles: páginas, referencias, idioma (10) | 4 | 4 | 5 |
| **Total** | **4,9** | 4,3 | 3,85 |

- GoatCounter dice identificar visitas únicas sin cookies y sin guardar datos personales, no necesitar aviso de
  GDPR y ser gratis para un uso público razonable; es de código abierto y se puede autoalojar si hiciera falta.
- Cloudflare Web Analytics también es gratis y no necesita cambiar el DNS, pero exige una cuenta de Cloudflare y
  concentra los datos en un proveedor grande.
- Plausible no tiene plan gratis: solo una prueba de 30 días, y el plan más barato cuesta USD 9 por mes
  (página de precios, 2026-11-19).

Fuentes: Fontsource publica las cinco como paquetes npm (versión 5.3.0 al 2026-11-19). Se sirven desde el mismo
sitio, solo con el subconjunto latino y `font-display: swap`; se precargan las dos de la primera pantalla. Google
Fonts se descarta porque cada visita le pasa la IP del visitante a Google.

### Consecuencias

- Bueno: el único tercero en tiempo de ejecución es el contador; sin cookies ni banner.
- Bueno: las fuentes no dependen de otro dominio y no cambian sin aviso.
- Malo: los bloqueadores de anuncios pueden frenar el contador; las cifras son un piso.
- Neutral: el sitio pesa más por las fuentes; se compensa con el subconjunto latino y WOFF2.

### Confirmación

`scripts/verificar-dist.mjs` falla si el build referencia `fonts.googleapis.com` o `fonts.gstatic.com`, o si el
JS propio usa `document.cookie`. Una visita al sitio publicado debe dejar 0 cookies en las herramientas del
navegador.

## Más información

- GoatCounter: https://www.goatcounter.com/
- Cloudflare Web Analytics: https://developers.cloudflare.com/web-analytics/about/
- Fontsource: https://fontsource.org/
- Stack del sitio: [ADR-0001](0001-stack-y-arquitectura.md).
