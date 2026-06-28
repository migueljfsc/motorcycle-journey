// Join a path onto the configured base so internal links work under GitHub Pages'
// project subpath (base = '/motorcycle-journey') and at root alike.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${clean}` || '/';
}

// Prefix a public/ asset path (e.g. /covers/x.svg) with the base.
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}/${path}`.replace(/\/+/g, '/');
}
