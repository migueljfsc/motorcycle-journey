import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../data/site';
import { tripPhotos, coverPosition } from '../data/media';
import { origin, tripPlaces, crowFliesKm } from '../data/places';
import { fmtDate } from './format';
import { localeUrl, media } from './url';
import type { MapTrip } from '../components/SpokeMap.astro';

/** Route slug for a trip: its id minus the "<locale>/" prefix. */
export const tripSlug = (trip: CollectionEntry<'trips'>) => trip.id.replace(/^[a-z]{2}\//, '');

/** Card/thumbnail image for a trip: first gallery photo, else the frontmatter cover. */
export function tripCover(trip: CollectionEntry<'trips'>): { src?: string; pos: string } {
  const slug = tripSlug(trip);
  const key = tripPhotos[slug]?.[0] ?? trip.data.cover;
  return { src: key ? media(key) : undefined, pos: coverPosition[slug] ?? 'center' };
}

/** Straight-line km from Porto to the trip's destination, if the place is mapped. */
export function tripCrowKm(trip: CollectionEntry<'trips'>): number | undefined {
  const place = tripPlaces[tripSlug(trip)];
  return place ? Math.round(crowFliesKm(origin, place)) : undefined;
}

/** Published trips for a locale, newest first. */
export async function localeTrips(locale: Locale) {
  return (
    await getCollection('trips', ({ id, data }) => !data.draft && id.startsWith(`${locale}/`))
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Entries for the spoke map; `order` is chronological (oldest ride = 0). */
export function mapTrips(trips: CollectionEntry<'trips'>[], locale: Locale): MapTrip[] {
  const oldestFirst = [...trips].sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
  return oldestFirst.map((trip, order) => {
    const cover = tripCover(trip);
    return {
      slug: tripSlug(trip),
      title: trip.data.title,
      date: fmtDate(trip.data.date, locale),
      href: localeUrl(locale, `/trips/${tripSlug(trip)}`),
      cover: cover.src,
      coverPos: cover.pos,
      order,
    };
  });
}
