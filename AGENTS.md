# Moto Journey — Motorcycle Travelogue Site

Mostly-static site documenting a motorcycle journey: trips, tips & tricks, a bike catalog,
and per-bike service logs. Content-driven — adding an entry is dropping a file, never a
page edit.

## Stack
- **Framework**: Astro 7 (static output)
- **i18n**: Astro built-in routing, locales `en` (default, at `/…`) + `pt` (at `/pt/…`),
  `prefixDefaultLocale: false` (`astro.config.mjs`)
- **Styles**: Tailwind v4 via `@tailwindcss/vite`; design tokens in `src/styles/global.css` `@theme`
- **Fonts**: IBM Plex Mono (headings/mono), Inter (body) via Google Fonts
- **Package manager**: pnpm (Node >= 22.12)
- **Deploy**: GitHub Pages via `withastro/action` (`.github/workflows/deploy.yml`)
- **Dependency updates**: Dependabot weekly (Sun 20:00 Europe/Lisbon), 7-day release cooldown
  (`.github/dependabot.yml`)

## i18n
- Two locales: `en` (root) and `pt` (`/pt/…`). `Astro.currentLocale` drives chrome components.
- **Internal links must use `localeUrl(locale, path)`** in `src/lib/url.ts` (wraps Astro's
  `getRelativeLocaleUrl` — handles base + locale prefix). Assets use `asset()`.
- UI strings come from `t(locale)` in `src/data/site.ts`. Date/number formatting via
  `fmtDate/fmtKm(value, locale)` in `lib/format.ts`.
- **Pages are thin**: route files in `src/pages/**` (EN) and `src/pages/pt/**` (PT mirror)
  just render a shared `components/views/*View.astro` with a `locale` prop. Detail routes'
  `getStaticPaths` filter content by locale prefix.
- Language toggle: `components/LangToggle.astro` (rebuilds the current path in each locale,
  saves choice to `localStorage['moto-lang']`); `Layout.astro` has an inline pre-paint script
  that honors that saved choice.

## GitHub Pages base path
Served at a project subpath: `https://migueljfsc.github.io/motorcycle-journey/`.
`astro.config.mjs` sets `base: '/motorcycle-journey'`. Use `localeUrl()` / `asset()` so links
resolve under the subpath. If a custom domain is added: `base: '/'` + update `site`.

## Single source of truth
- **`src/data/site.ts`** is canonical for site chrome & copy, **per-locale** via `t(locale)`:
  description, footer tagline, nav links, home-page copy, list-page titles/descriptions/headings,
  bike status labels, catalog grouping, and shared UI strings. Edit copy/labels there once —
  components read `t(locale)`; never hard-code these strings inline. Add a new string to BOTH
  `en` and `pt` in the `dict`.
- The **journey content** (trips, tips, bikes, service records) is its own source of truth
  in content collections (`src/content/**`, `src/data/services.yaml`), with localized fields.

## Structure
```
src/
  data/site.ts             — CANONICAL per-locale copy/config + t(locale) (see above)
  content.config.ts        — collection schemas (localized fields)
  content/
    trips/<locale>/*.md    — trip write-ups per language (en/ + pt/)
    tips/<locale>/*.md     — tips per language (en/ + pt/)
    bikes/*.md             — bikes (single set; localized name/description/mods fields)
  data/services.yaml       — service records; localized work/notes, refs a bike by slug
  layouts/Layout.astro     — shell + remember-locale script
  components/
    Nav / Footer / LangToggle.astro  — chrome (locale-aware)
    TripCard / BikeCard.astro        — list/grid cards
    ServiceTable.astro               — service history table
    Carousel / CardCarousel.astro    — photo + card carousels
    views/*View.astro                — page bodies (take `locale`); routes are thin wrappers
  pages/                   — EN routes (root) + pt/ mirror; render views
  lib/
    url.ts                 — localeUrl() (internal links) + asset() (public files)
  styles/global.css        — Tailwind import + @theme tokens + .prose styles
public/
  favicon.svg, covers/*.{svg,jpeg,jpg}
```

## Content model
- **Collections** use the content layer (`glob()` for the markdown dirs, `file()` for
  `services.yaml`). Schemas + zod validation in `content.config.ts` — bad frontmatter fails
  the build. Localized text fields use `{ en, pt }`.
- **trips/tips are per-locale files**: id is `<locale>/<slug>` (e.g. `en/coastal-loop`). Views
  filter by `id.startsWith('<locale>/')` and the route slug is the id minus the locale prefix.
- **bikes are a single set** (id = filename slug) shared across locales, with localized
  `name`, `description` (paragraph arrays), and `mods` text — so references stay stable.
- **Services → bikes** via `reference('bikes')`; `bike:` must equal a bike slug. Bike pages
  filter services by `s.data.bike.id`. `work`/`notes` are `{ en, pt }`.
- **Drafts**: `draft: true` removes an entry from every list and its route.

## Adding content — quick ref
- Trip: `src/content/trips/<locale>/<slug>.md` (one per language) —
  `title, date, region, distanceKm, start, end, bike?, cover?, draft?`. `bike` = a bike slug;
  surfaces the trip under "Trips on this bike". Keep the same `<slug>` across locales.
- Tip: `src/content/tips/<locale>/<slug>.md` — `title, description, date, tags?, draft?`
- Bike (single file): `src/content/bikes/<slug>.md` —
  `name{en,pt}, make, model, year, status, purchased?, specs{}, description{en[],pt[]}, mods[], cover?, photos[], link?, draft?`
  - `description`: paragraph arrays per locale (rendered as the Overview; bikes have no markdown body).
  - `mods`: `{name{en,pt}, category?{en,pt}, note?{en,pt}}`; Modifications section, hidden when empty.
  - `photos`: gallery for the detail carousel (falls back to `[cover]`).
  - `link`: brand URL — **required for `wishlist` bikes** (card links out; no detail page generated).
  - Detail pages (owned/past only) show a sticky left tab rail with scrollspy.
- Service: append to `src/data/services.yaml` — `id, bike(slug), date, work{en,pt}, mileageKm?, notes?{en,pt}`

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
