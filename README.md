# Moto Journey

[![Deploy to GitHub Pages](https://github.com/migueljfsc/motorcycle-journey/actions/workflows/deploy.yml/badge.svg)](https://github.com/migueljfsc/motorcycle-journey/actions/workflows/deploy.yml)

A mostly-static site documenting a motorcycle journey: **trips**, **tips & tricks**, a
**bike catalog**, and **per-bike service logs**. Built with Astro + Tailwind, deployed to
GitHub Pages.

**Live:** https://migueljfsc.github.io/motorcycle-journey/

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:4321/motorcycle-journey
pnpm build      # static output -> ./dist
pnpm preview    # serve the built site locally
```

Node >= 22.12. Package manager: pnpm.

## Adding content

All content is files — no page edits needed.

| What | Where | Notes |
|------|-------|-------|
| Trip | `src/content/trips/<slug>.md` | frontmatter: `title, date, region, distanceKm, start, end, bike?, cover?, draft?`. `bike` = a bike slug; lists the trip on that bike's page. |
| Tip | `src/content/tips/<slug>.md` | frontmatter: `title, description, date, tags?, draft?` |
| Bike | `src/content/bikes/<slug>.md` | frontmatter: `name, make, model, year, status(owned\|past\|wishlist), specs{}, mods[], cover?, photos[], link?, draft?`. Wishlist bikes need `link` (card opens the brand site; no detail page). `photos` feeds the detail-page carousel. |
| Service record | `src/data/services.yaml` | append an entry; `bike:` must match a bike's filename slug |

- URL of a file is `/<collection>/<slug>` (filename = slug).
- `draft: true` hides an entry from lists and routes.
- Cover images live in `public/covers/` and are referenced as `/covers/<name>` in frontmatter.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml` (Astro → GitHub Pages).

**One-time setup:** Repo → Settings → Pages → Source: **GitHub Actions**.

Served at `https://migueljfsc.github.io/motorcycle-journey/`. The subpath is configured via
`base` in `astro.config.mjs`; if a custom domain is added, set `base: '/'` and update `site`.
