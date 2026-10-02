// Map data for the home-page map. Every trip starts in Porto; each trip slug (shared
// across EN/PT) maps to its destination. The lat/lng below are hand-placed fallbacks:
// when the trip has a recorded route, the GPX-derived pin in routes.json wins.
import routes from './routes.json';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Place extends LatLng {
  /** Short map label. */
  label: string;
  /** Which side of the dot the label sits on. */
  side?: 'left' | 'right';
  /** Vertical label nudge in map units, for crowded clusters. */
  dy?: number;
}

export const origin: Place = { label: 'Porto', lat: 41.1496, lng: -8.611 };

const handPlaces: Record<string, Place> = {
  'cavado-perelhal': { label: 'Perelhal', lat: 41.538, lng: -8.69, side: 'right' },
  'sao-bartolomeu-dj': { label: 'S. Bartolomeu do Mar', lat: 41.575, lng: -8.797, side: 'left' },
  ofir: { label: 'Ofir', lat: 41.515, lng: -8.787, side: 'right', dy: 4 },
  'rio-ave': { label: 'Rio Ave', lat: 41.345, lng: -8.62, side: 'right' },
  'terra-nova-mindelo': { label: 'Mindelo', lat: 41.305, lng: -8.735, side: 'right' },
  'douro-cu-grande': { label: 'Cu Grande', lat: 41.098, lng: -8.395, side: 'right', dy: -4 },
  'melres-sofia': { label: 'Melres', lat: 41.072, lng: -8.405, side: 'left' },
  'pedorido-river-beach': { label: 'Pedorido', lat: 41.06, lng: -8.38, side: 'right', dy: 8 },
  douro: { label: 'Avintes', lat: 41.1038, lng: -8.5348, side: 'left' },
  caminha: { label: 'Caminha', lat: 41.876, lng: -8.838, side: 'right' },
};

const routePins = routes as Record<string, { dest?: [number, number] }>;

export const tripPlaces: Record<string, Place> = Object.fromEntries(
  Object.entries(handPlaces).map(([slug, place]) => {
    const dest = routePins[slug]?.dest;
    return [slug, dest ? { ...place, lat: dest[0], lng: dest[1] } : place];
  }),
);

/** Rivers, each flowing from the coast inland. */
export const rivers: { name: string; path: LatLng[] }[] = [
  {
    name: 'Douro',
    path: [
      { lat: 41.143, lng: -8.672 },
      { lat: 41.14, lng: -8.62 },
      { lat: 41.139, lng: -8.58 },
      { lat: 41.125, lng: -8.535 },
      { lat: 41.085, lng: -8.495 },
      { lat: 41.075, lng: -8.45 },
      { lat: 41.068, lng: -8.41 },
      { lat: 41.075, lng: -8.36 },
      { lat: 41.079, lng: -8.3 },
      { lat: 41.09, lng: -8.25 },
      { lat: 41.1, lng: -8.2 },
    ],
  },
  {
    name: 'Cávado',
    path: [
      { lat: 41.528, lng: -8.784 },
      { lat: 41.535, lng: -8.74 },
      { lat: 41.54, lng: -8.69 },
      { lat: 41.53, lng: -8.62 },
      { lat: 41.55, lng: -8.56 },
    ],
  },
  {
    name: 'Lima',
    path: [
      { lat: 41.69, lng: -8.84 },
      { lat: 41.7, lng: -8.78 },
      { lat: 41.725, lng: -8.7 },
      { lat: 41.765, lng: -8.585 },
      { lat: 41.79, lng: -8.5 },
    ],
  },
  {
    name: 'Minho',
    path: [
      { lat: 41.868, lng: -8.872 },
      { lat: 41.878, lng: -8.835 },
      { lat: 41.905, lng: -8.78 },
      { lat: 41.94, lng: -8.74 },
      { lat: 41.98, lng: -8.68 },
    ],
  },
  {
    name: 'Ave',
    path: [
      { lat: 41.338, lng: -8.748 },
      { lat: 41.345, lng: -8.7 },
      { lat: 41.348, lng: -8.64 },
      { lat: 41.34, lng: -8.58 },
      { lat: 41.345, lng: -8.5 },
    ],
  },
];

/** Straight-line distance in km (haversine). */
export function crowFliesKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
