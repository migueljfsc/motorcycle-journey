// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Served from the root of https://motojourney.migueljfsc.dev by a Cloudflare Worker
// (wrangler.jsonc). https://astro.build/config
export default defineConfig({
  site: 'https://motojourney.migueljfsc.dev',
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false, // EN at /…, PT at /pt/…
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
