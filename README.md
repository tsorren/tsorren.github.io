# tsorren.github.io

Portfolio de Tadeo Sorrentino: un relato en constelación, de 2016 a hoy, en español (`/es/`) e inglés (`/en/`).
Sitio estático con [Astro](https://astro.build), publicado en GitHub Pages.

## Comandos

Requiere Node 24.

```bash
npm ci
npm run dev                          # servidor local
npm test                             # reglas como funciones puras (node --test)
npm run build && npm run verificar   # build y chequeo de dist/ (lang, hreflang, OG, enlaces, privacidad)
```

El workflow `.github/workflows/deploy.yaml` corre los mismos pasos en cada PR y publica desde `main`.

## Dónde está cada cosa

| Ruta | Qué |
|---|---|
| `src/data/relato.ts` | Todo el contenido, ES y EN en el mismo registro. Cada hecho declara su fuente en el CV maestro. |
| `src/components/Relato.astro` | La página: el relato como documento que se lee sin JS. |
| `src/lib/logica.ts` | Reglas (idioma, llegada, OSD, estrellas, cámara, sonido) como funciones puras, con sus `*.test.ts`. |
| `src/scripts/` | Capa de experiencia: el cielo sigue al scroll, OSD, cinta y sonido con Web Audio. |
| `src/styles/sitio.css` | Identidad, paleta y movimiento reducido. |
| `scripts/verificar-dist.mjs` | Chequeo del build. |

Para cambiar un texto o un hecho se edita solo `src/data/relato.ts`. Analytics: GoatCounter, que se activa al
completar `goatcounter` en ese archivo.

## Decisiones

- [ADR-0001: stack y arquitectura](docs/adr/0001-stack-y-arquitectura.md)
- [ADR-0002: analytics y fuentes](docs/adr/0002-analytics-y-fuentes.md)
