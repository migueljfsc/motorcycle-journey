// Turns raw Beeline GPX exports into the simplified routes the map draws.
//
//   node scripts/build-routes.mjs <dir-with-gpx>
//
// Raw GPX never enters the repo. For privacy, every home end (start of an outbound leg,
// end of a return leg, both ends of a round trip) becomes a privacy zone: any point of
// ANY route within PRIVACY_M of one is dropped, splitting a route into segments where it
// passes through. Only simplified lat/lng pairs are written — no timestamps or elevation.
//
// Each trip also gets `dest`, the map pin: the far end of an out/back leg, or for a single
// round-trip recording, where the longest stop happened.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PRIVACY_M = 1000;
const SIMPLIFY_M = 35;

// GPX file name (without .gpx) -> trip slug + leg kind.
const FILES = {
  cu_grande: ['douro-cu-grande', 'round'],
  rio_ave: ['rio-ave', 'round'],
  pedorido: ['pedorido-river-beach', 'round'],
  ofir_going: ['ofir', 'out'],
  ofir_returning: ['ofir', 'back'],
  cavado_going: ['cavado-perelhal', 'out'],
  cavado_returning: ['cavado-perelhal', 'back'],
  entre_os_rios_going: ['douro', 'out'],
  entre_os_rios_coming: ['douro', 'back'],
  sao_bartolomeu_going: ['sao-bartolomeu-dj', 'out'],
  terra_nova_going: ['terra-nova-mindelo', 'out'],
  terra_nova_coming: ['terra-nova-mindelo', 'back'],
  melres_sofia_going: ['melres-sofia', 'out'],
  melres_sofia_coming: ['melres-sofia', 'back'],
  caminha_going: ['caminha', 'out'],
  caminha_coming: ['caminha', 'back'],
};

const src = process.argv[2];
if (!src) {
  console.error('usage: node scripts/build-routes.mjs <dir-with-gpx>');
  process.exit(1);
}

const R = 6371000;
const rad = (d) => (d * Math.PI) / 180;
const dist = ([a1, o1], [a2, o2]) => {
  const h = Math.sin(rad(a2 - a1) / 2) ** 2 + Math.cos(rad(a1)) * Math.cos(rad(a2)) * Math.sin(rad(o2 - o1) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

const parse = (xml) =>
  [...xml.matchAll(/<trkpt\s+lat="([-\d.]+)"\s+lon="([-\d.]+)"/g)].map((m) => [Number(m[1]), Number(m[2])]);
const parseTimes = (xml) => [...xml.matchAll(/<time>([^<]+)<\/time>/g)].map((m) => Date.parse(m[1]));

// Where the rider stayed longest within STAY_M (round trips have no "far end").
const STAY_M = 150;
const longestStay = (pts, times) => {
  let best = { dur: -1, at: pts[0] };
  for (let i = 0; i < pts.length; i++) {
    let j = i;
    while (j + 1 < pts.length && dist(pts[i], pts[j + 1]) < STAY_M) j++;
    if (times[j] - times[i] > best.dur) best = { dur: times[j] - times[i], at: pts[i] };
  }
  return best.at;
};

// Split a track into the runs of points that stay outside every privacy zone.
const outsideZones = (pts, zones) => {
  const segments = [];
  let cur = [];
  for (const p of pts) {
    if (zones.some((z) => dist(p, z) < PRIVACY_M)) {
      if (cur.length > 1) segments.push(cur);
      cur = [];
    } else cur.push(p);
  }
  if (cur.length > 1) segments.push(cur);
  return segments;
};

// Douglas–Peucker on a local metric projection.
const simplify = (pts, eps) => {
  if (pts.length < 3) return pts;
  const lat0 = rad(pts[0][0]);
  const xy = pts.map(([a, o]) => [rad(o) * R * Math.cos(lat0), rad(a) * R]);
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [s, e] = stack.pop();
    const [x1, y1] = xy[s];
    const [x2, y2] = xy[e];
    const len = Math.hypot(x2 - x1, y2 - y1) || 1;
    let max = 0, idx = -1;
    for (let i = s + 1; i < e; i++) {
      const d = Math.abs((y2 - y1) * xy[i][0] - (x2 - x1) * xy[i][1] + x2 * y1 - y2 * x1) / len;
      if (d > max) { max = d; idx = i; }
    }
    if (max > eps) {
      keep[idx] = 1;
      stack.push([s, idx], [idx, e]);
    }
  }
  return pts.filter((_, i) => keep[i]);
};

const tracks = [];
for (const [name, [slug, kind]] of Object.entries(FILES)) {
  const file = path.join(src, `${name}.gpx`);
  if (!existsSync(file)) {
    console.warn(`skip  ${name}.gpx (missing)`);
    continue;
  }
  const xml = readFileSync(file, 'utf8');
  tracks.push({ name, slug, kind, pts: parse(xml), times: parseTimes(xml) });
}

if (!tracks.length) {
  console.error(`No GPX files found in ${src}; leaving routes.json untouched.`);
  process.exit(1);
}

const zones = tracks.flatMap(({ kind, pts }) => [
  ...(kind === 'out' || kind === 'round' ? [pts[0]] : []),
  ...(kind === 'back' || kind === 'round' ? [pts[pts.length - 1]] : []),
]);

const routes = {};
for (const { name, slug, kind, pts, times } of tracks) {
  const rawKm = pts.slice(1).reduce((s, p, i) => s + dist(pts[i], p), 0) / 1000;
  const segments = outsideZones(pts, zones).map((seg) =>
    simplify(seg, SIMPLIFY_M).map(([a, o]) => [+a.toFixed(5), +o.toFixed(5)]),
  );
  const trip = (routes[slug] ??= { dest: null, legs: [] });
  trip.legs.push({ kind, segments });
  const dest = kind === 'out' ? pts[pts.length - 1] : kind === 'back' ? pts[0] : longestStay(pts, times);
  // An outbound leg's end is the best pin; otherwise take what we have.
  if (kind === 'out' || !trip.dest) trip.dest = dest.map((v) => +v.toFixed(4));
  const n = segments.reduce((s, g) => s + g.length, 0);
  console.log(`ok    ${name.padEnd(22)} ${slug.padEnd(22)} ${kind.padEnd(5)} ${rawKm.toFixed(1).padStart(6)} km  ${String(n).padStart(4)} pts  ${segments.length} seg`);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outFile = path.join(root, 'src/data/routes.json');
writeFileSync(outFile, JSON.stringify(routes) + '\n');
console.log(`wrote ${path.relative(root, outFile)}`);
