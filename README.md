# Moto Journey

[![Deploy to GitHub Pages](https://github.com/migueljfsc/motorcycle-journey/actions/workflows/deploy.yml/badge.svg)](https://github.com/migueljfsc/motorcycle-journey/actions/workflows/deploy.yml)

A mostly-static site documenting a motorcycle journey: **trips**, **tips & tricks**, a
**bike catalog**, and **per-bike service logs**. Built with Astro + Tailwind, bilingual
(EN / PT), deployed to GitHub Pages.

**Live:** https://migueljfsc.github.io/motorcycle-journey/ (PT at `/pt/`)

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:4321/motorcycle-journey
pnpm build      # static output -> ./dist
pnpm preview    # serve the built site locally
```

Node >= 22.12. Package manager: pnpm.

## Languages

Bilingual via Astro i18n: **EN** at the root (`/…`), **PT** under `/pt/…`. The nav has an
EN/PT toggle that remembers your choice. UI strings live per-locale in `src/data/site.ts`
(`t(locale)`); see `AGENTS.md` for the i18n architecture.

## Adding content

All content is files — no page edits needed. Trips & tips are one file **per language**;
bikes are a single file with localized fields.

| What | Where | Notes |
|------|-------|-------|
| Trip | `src/content/trips/<locale>/<slug>.md` | one per language (`en/`, `pt/`); `title, date, region, distanceKm, start, end, bike?, cover?, draft?`. `bike` = a bike slug. |
| Tip | `src/content/tips/<locale>/<slug>.md` | one per language; `title, description, date, tags?, draft?` |
| Bike | `src/content/bikes/<slug>.md` | single file; `name{en,pt}, make, model, year, status, purchased?, specs{}, description{en[],pt[]}, mods[], cover?, photos[], link?, draft?`. Wishlist bikes need `link` (card opens brand site; no detail page). |
| Service record | `src/data/services.yaml` | append `id, bike, date, work{en,pt}, mileageKm?, notes?{en,pt}`; `bike:` must match a bike slug |

- `draft: true` hides an entry from lists and routes.
- Cover/photo images live in `public/covers/`, referenced as `/covers/<name>` in frontmatter.

## Dependencies

Dependabot (`.github/dependabot.yml`) opens update PRs weekly (Sundays 20:00 Europe/Lisbon)
for npm and GitHub Actions, with a 7-day cooldown before a new release is proposed.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml` (Astro → GitHub Pages).

**One-time setup:** Repo → Settings → Pages → Source: **GitHub Actions**.

Served at `https://migueljfsc.github.io/motorcycle-journey/`. The subpath is configured via
`base` in `astro.config.mjs`; if a custom domain is added, set `base: '/'` and update `site`.
