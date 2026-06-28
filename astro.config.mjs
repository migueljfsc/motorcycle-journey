// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Project page on GitHub Pages: https://migueljfsc.github.io/motorcycle-journey/
// If a custom domain is added later, set site to it and base to '/'.
// https://astro.build/config
export default defineConfig({
  site: 'https://migueljfsc.github.io',
  base: '/motorcycle-journey',
  vite: {
    plugins: [tailwindcss()],
  },
});
