import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://tsorren.github.io',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
