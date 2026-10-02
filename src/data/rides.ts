// Ride stats from Beeline, per leg, keyed by trip slug (shared across EN/PT).
// A leg is the ride out, the ride back, or a single round-trip recording. Values are as
// Beeline reports them; trip totals are derived with rideTotals(). Elevation was only
// tracked from mid-2025 onward.

export interface Leg {
  kind: 'out' | 'back' | 'round';
  km: number;
  avgKmh: number;
  maxKmh: number;
  /** "h:mm:ss" or "mm:ss" */
  moving: string;
  elapsed: string;
  gainM?: number;
  lossM?: number;
}

export const rides: Record<string, Leg[]> = {
  'douro-cu-grande': [
    { kind: 'round', km: 65, avgKmh: 41, maxKmh: 107, moving: '1:34:28', elapsed: '2:57:31' },
  ],
  'rio-ave': [
    { kind: 'round', km: 70, avgKmh: 51, maxKmh: 131, moving: '1:22:10', elapsed: '2:12:54' },
  ],
  'pedorido-river-beach': [
    { kind: 'round', km: 79, avgKmh: 58, maxKmh: 135, moving: '1:21:47', elapsed: '3:30:40' },
  ],
  ofir: [
    { kind: 'out', km: 60, avgKmh: 45, maxKmh: 80, moving: '1:20:20', elapsed: '1:54:30' },
    { kind: 'back', km: 51, avgKmh: 92, maxKmh: 143, moving: '33:22', elapsed: '40:09' },
  ],
  'cavado-perelhal': [
    { kind: 'out', km: 53, avgKmh: 84, maxKmh: 135, moving: '37:38', elapsed: '50:34', gainM: 343, lossM: 434 },
    { kind: 'back', km: 53, avgKmh: 90, maxKmh: 134, moving: '35:24', elapsed: '37:12', gainM: 434, lossM: 337 },
  ],
  douro: [
    { kind: 'out', km: 19, avgKmh: 53, maxKmh: 115, moving: '21:01', elapsed: '25:12', gainM: 240, lossM: 330 },
    { kind: 'back', km: 17, avgKmh: 73, maxKmh: 130, moving: '13:47', elapsed: '16:57', gainM: 255, lossM: 258 },
  ],
  'sao-bartolomeu-dj': [
    { kind: 'out', km: 46, avgKmh: 109, maxKmh: 141, moving: '25:29', elapsed: '28:27', gainM: 282, lossM: 339 },
  ],
  'terra-nova-mindelo': [
    { kind: 'out', km: 21, avgKmh: 39, maxKmh: 99, moving: '32:24', elapsed: '51:42', gainM: 164, lossM: 258 },
    { kind: 'back', km: 20, avgKmh: 70, maxKmh: 130, moving: '16:46', elapsed: '17:42', gainM: 204, lossM: 132 },
  ],
  'melres-sofia': [
    { kind: 'out', km: 33, avgKmh: 51, maxKmh: 107, moving: '39:09', elapsed: '45:01', gainM: 357, lossM: 424 },
    { kind: 'back', km: 33, avgKmh: 51, maxKmh: 103, moving: '39:11', elapsed: '45:05', gainM: 434, lossM: 351 },
  ],
  caminha: [
    { kind: 'out', km: 118, avgKmh: 50, maxKmh: 88, moving: '2:23:26', elapsed: '3:04:10', gainM: 1348, lossM: 1437 },
    { kind: 'back', km: 95, avgKmh: 84, maxKmh: 134, moving: '1:07:50', elapsed: '1:27:22', gainM: 710, lossM: 624 },
  ],
};

export interface RideTotals {
  km: number;
  movingSec: number;
  elapsedSec: number;
  /** Total distance over total moving time, not the mean of the legs' averages. */
  avgKmh: number;
  maxKmh: number;
  gainM?: number;
  lossM?: number;
  /** Only the ride out was recorded. */
  oneWay: boolean;
}

export function toSeconds(hms: string): number {
  return hms.split(':').map(Number).reduce((acc, n) => acc * 60 + n, 0);
}

export function rideTotals(slug: string): RideTotals | undefined {
  const legs = rides[slug];
  if (!legs?.length) return undefined;
  const km = legs.reduce((s, l) => s + l.km, 0);
  const movingSec = legs.reduce((s, l) => s + toSeconds(l.moving), 0);
  const elapsedSec = legs.reduce((s, l) => s + toSeconds(l.elapsed), 0);
  const hasElevation = legs.every((l) => l.gainM != null && l.lossM != null);
  return {
    km,
    movingSec,
    elapsedSec,
    avgKmh: Math.round(km / (movingSec / 3600)),
    maxKmh: Math.max(...legs.map((l) => l.maxKmh)),
    gainM: hasElevation ? legs.reduce((s, l) => s + l.gainM!, 0) : undefined,
    lossM: hasElevation ? legs.reduce((s, l) => s + l.lossM!, 0) : undefined,
    oneWay: legs.length === 1 && legs[0].kind === 'out',
  };
}
