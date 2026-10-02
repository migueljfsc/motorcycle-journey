import type { Locale } from '../data/site';

const intl: Record<Locale, string> = { en: 'en-GB', pt: 'pt-PT' };

export function fmtDate(d: Date, locale: Locale = 'en'): string {
  return d.toLocaleDateString(intl[locale] ?? 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function fmtMonthYear(d: Date, locale: Locale = 'en'): string {
  return d.toLocaleDateString(intl[locale] ?? 'en-GB', { month: 'short', year: 'numeric' });
}

export function fmtKm(n: number, locale: Locale = 'en'): string {
  return `${n.toLocaleString(intl[locale] ?? 'en-GB')} km`;
}

/** Seconds as "1h 34m" (or "38m" under an hour). */
export function fmtDuration(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.round((sec % 3600) / 60);
  return h ? `${h}h ${String(m).padStart(2, '0')}m` : `${m}m`;
}
