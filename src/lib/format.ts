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
