// Builds the map's background geography from Natural Earth (public domain,
// https://www.naturalearthdata.com) — land polygons and land borders, clipped to
// Iberia + western France and simplified: fine detail around Porto, coarse elsewhere.
//
//   node scripts/build-basemap.mjs <dir-with-ne-geojson>
//
// Expects ne_10m_land.geojson and ne_10m_admin_0_boundary_lines_land.geojson in <dir>.
// Output: src/data/basemap.json as { land: [[lat, lng], ...][], borders: [[lat, lng], ...][] }.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// World frame the map can pan within.
const BBOX = { latMin: 35.8, latMax: 47.2, lngMin: -10.6, lngMax: 3.6 };
// Detail region (northern Portugal) and simplification tolerances, in metres.
const DETAIL = { latMin: 40.7, latMax: 42.3, lngMin: -9.3, lngMax: -7.6 };
const FINE_M = 60;
const COARSE_M = 900;

const src = process.argv[2];
if (!src) {
  console.error('usage: node scripts/build-basemap.mjs <dir-with-ne-geojson>');
  process.exit(1);
}
const read = (f) => JSON.parse(readFileSync(path.join(src, f), 'utf8'));

const R = 6371000;
const KX = Math.cos((41.3 * Math.PI) / 180);
const toM = ([lng, lat]) => [((lng * Math.PI) / 180) * R * KX, ((lat * Math.PI) / 180) * R];
const inBox = (b, [lng, lat]) => lat >= b.latMin && lat <= b.latMax && lng >= b.lngMin && lng <= b.lngMax;

// Sutherland–Hodgman: clip a polygon ring to the rectangular frame.
const clipRing = (ring) => {
  const edges = [
    [(p) => p[0] >= BBOX.lngMin, (a, b) => at(a, b, 0, BBOX.lngMin)],
    [(p) => p[0] <= BBOX.lngMax, (a, b) => at(a, b, 0, BBOX.lngMax)],
    [(p) => p[1] >= BBOX.latMin, (a, b) => at(a, b, 1, BBOX.latMin)],
    [(p) => p[1] <= BBOX.latMax, (a, b) => at(a, b, 1, BBOX.latMax)],
  ];
  function at(a, b, axis, v) {
    const t = (v - a[axis]) / (b[axis] - a[axis]);
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  }
  let out = ring;
  for (const [inside, cross] of edges) {
    const input = out;
    out = [];
    for (let i = 0; i < input.length; i++) {
      const cur = input[i];
      const prev = input[(i + input.length - 1) % input.length];
      if (inside(cur)) {
        if (!inside(prev)) out.push(cross(prev, cur));
        out.push(cur);
      } else if (inside(prev)) out.push(cross(prev, cur));
    }
    if (!out.length) break;
  }
  return out;
};

// Split a line into the runs that fall inside the frame.
const clipLine = (line) => {
  const runs = [];
  let cur = [];
  for (const p of line) {
    if (inBox(BBOX, p)) cur.push(p);
    else {
      if (cur.length > 1) runs.push(cur);
      cur = [];
    }
  }
  if (cur.length > 1) runs.push(cur);
  return runs;
};

// Douglas–Peucker with a tolerance that depends on where the segment is.
const simplify = (pts) => {
  if (pts.length < 3) return pts;
  const xy = pts.map(toM);
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [s, e] = stack.pop();
    const eps = inBox(DETAIL, pts[s]) || inBox(DETAIL, pts[e]) ? FINE_M : COARSE_M;
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

// A closed ring starts and ends on the same point, which DP can't split; simplify it as two
// halves meeting at the vertex farthest from the start.
const simplifyRing = (ring) => {
  const [x0, y0] = toM(ring[0]);
  let far = 1, max = 0;
  ring.forEach((p, i) => {
    const [x, y] = toM(p);
    const d = Math.hypot(x - x0, y - y0);
    if (d > max) { max = d; far = i; }
  });
  return [...simplify(ring.slice(0, far + 1)).slice(0, -1), ...simplify(ring.slice(far))];
};

const round = (pts) => pts.map(([lng, lat]) => [+lat.toFixed(4), +lng.toFixed(4)]);

const polygons = read('ne_10m_land.geojson').features.flatMap((f) =>
  f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates,
);
const land = polygons
  .map((poly) => clipRing(poly[0]))
  .filter((r) => r.length > 3)
  .map((r) => round(simplifyRing([...r, r[0]])))
  .filter((r) => r.length > 3);

const lines = read('ne_10m_admin_0_boundary_lines_land.geojson').features.flatMap((f) =>
  f.geometry.type === 'LineString' ? [f.geometry.coordinates] : f.geometry.coordinates,
);
const borders = lines.flatMap(clipLine).map((l) => round(simplify(l))).filter((l) => l.length > 1);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'src/data/basemap.json');
writeFileSync(out, JSON.stringify({ land, borders }) + '\n');
const n = (a) => a.reduce((s, x) => s + x.length, 0);
console.log(`land: ${land.length} rings, ${n(land)} pts · borders: ${borders.length} lines, ${n(borders)} pts`);
console.log(`wrote ${path.relative(root, out)}`);
