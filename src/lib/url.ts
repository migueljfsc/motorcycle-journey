import { getRelativeLocaleUrl } from 'astro:i18n';
import { MEDIA_BASE } from '../data/media';

// Prefix a public/ asset path (e.g. /covers/x.svg) with the base.
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}/${path}`.replace(/\/+/g, '/');
}

// Resolve an image reference to a URL. Handles three shapes:
//   - absolute URL (http/https)           -> used as-is
//   - leading "/" (e.g. /covers/x.svg)     -> local public/ asset (base-prefixed)
//   - otherwise an R2 object key           -> served from MEDIA_BASE (segments encoded)
export function media(src: string): string {
  if (/^https?:\/\//.test(src)) return src;
  if (src.startsWith('/')) return asset(src);
  const encoded = src.split('/').map(encodeURIComponent).join('/');
  return `${MEDIA_BASE}/${encoded}`;
}

// Build an internal link for a given locale. Respects base + i18n routing
// (EN at /…, PT at /pt/…). Pass a logical path like "/bikes/cl500".
export function localeUrl(locale: string, path = '/'): string {
  return getRelativeLocaleUrl(locale, path);
}
