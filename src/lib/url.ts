import { getRelativeLocaleUrl } from 'astro:i18n';

// Prefix a public/ asset path (e.g. /covers/x.svg) with the base.
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}/${path}`.replace(/\/+/g, '/');
}

// Build an internal link for a given locale. Respects base + i18n routing
// (EN at /…, PT at /pt/…). Pass a logical path like "/bikes/cl500".
export function localeUrl(locale: string, path = '/'): string {
  return getRelativeLocaleUrl(locale, path);
}
