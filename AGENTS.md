# Moto Journey — Motorcycle Travelogue Site

Mostly-static site documenting a motorcycle journey: trips, tips & tricks, a bike catalog,
and per-bike service logs. Content-driven — adding an entry is dropping a file, never a
page edit.

## Stack
- **Framework**: Astro 7 (static output)
- **Styles**: Tailwind v4 via `@tailwindcss/vite`; design tokens in `src/styles/global.css` `@theme`
- **Fonts**: IBM Plex Mono (headings/mono), Inter (body) via Google Fonts
- **Package manager**: pnpm (Node >= 22.12)
- **Deploy**: GitHub Pages via `withastro/action` (`.github/workflows/deploy.yml`)

## GitHub Pages base path
Served at a project subpath: `https://migueljfsc.github.io/motorcycle-journey/`.
`astro.config.mjs` sets `base: '/motorcycle-journey'`. **All internal links must go through
`url()` in `src/lib/url.ts`** (or `import.meta.env.BASE_URL` for asset paths) so they resolve
under the subpath. If a custom domain is added: `base: '/'` + update `site`.

## Structure
```
src/
  content.config.ts        — collection schemas (trips, tips, bikes, services)
  content/
    trips/*.md             — trip write-ups (frontmatter + markdown body)
    tips/*.md              — tips & tricks posts
    bikes/*.md             — bike catalog entries (filename = slug)
  data/services.yaml       — flat list of service records, each refs a bike by slug
  layouts/Layout.astro     — shell: head, fonts, global.css, Nav, <slot>, Footer
  components/
    Nav.astro / Footer.astro     — chrome (active tab by path)
    TripCard / BikeCard.astro    — list/grid cards
    ServiceTable.astro           — renders a bike's service history
  lib/
    url.ts                 — base-aware internal link helper (USE THIS for links)
    format.ts              — fmtDate / fmtKm helpers
  pages/
    index.astro            — home: latest trips + garage teaser
    trips/index + [...slug].astro
    tips/index + [...slug].astro
    bikes/index + [...slug].astro   — detail shows specs + ServiceTable
  styles/global.css        — Tailwind import + @theme tokens + .prose styles
public/
  favicon.svg, covers/*.svg
```

## Content model
- **Collections** use the content layer (`glob()` for the markdown dirs, `file()` for
  `services.yaml`). Schemas + zod validation in `content.config.ts` — bad frontmatter fails
  the build.
- **Services → bikes** via Astro `reference('bikes')`. A service's `bike:` value must equal a
  bike file's slug (filename without `.md`). Bike pages filter services by `s.data.bike.id`.
- **Drafts**: `draft: true` removes an entry from every list and its route (filter
  `({ data }) => !data.draft` in `getCollection`).

## Adding content — quick ref
- Trip: `src/content/trips/<slug>.md` — `title, date, region, distanceKm, start, end, bike?, cover?, draft?`
  (`bike`: slug of the bike ridden; surfaces the trip under "Trips on this bike" on that bike's page)
- Tip: `src/content/tips/<slug>.md` — `title, description, date, tags?, draft?`
- Bike: `src/content/bikes/<slug>.md` — `name, make, model, year, status, specs{}, mods[], cover?, photos[], link?, draft?`
  - `mods`: list of `{name, category?, note?}`; renders a Modifications section, hidden when empty.
  - `photos`: gallery images for the detail-page carousel (falls back to `[cover]`).
  - `link`: brand URL — **required for `wishlist` bikes** (their card links out; no detail page is generated).
  - Detail pages are generated only for `owned`/`past` bikes; they show a sticky left tab rail
    (Overview/Specs/Modifications/Service history) with scrollspy.
- Service: append to `src/data/services.yaml` — `id, bike(slug), date, mileageKm, work, cost?, notes?`

## Design tokens (global.css @theme)
| Token | Value | Use |
|-------|-------|-----|
| `--color-bg` | `#0e0e10` | Page background |
| `--color-card` | `#17171a` | Card surfaces |
| `--color-border` | `#26262b` | Borders |
| `--color-text` | `#ececec` | Primary text |
| `--color-muted` | `#8a8a92` | Secondary text |
| `--color-accent` | `#f59e0b` | Links, highlights |
| `--font-mono` | IBM Plex Mono | Headings, labels |
| `--font-sans` | Inter | Body copy |

Content column is `max-w-3xl`. Markdown bodies render inside `.prose`.

## Commands
- `pnpm dev` · `pnpm build` · `pnpm preview`
