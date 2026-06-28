import { defineCollection, reference, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Localized text helpers — a value in both supported languages.
const localized = z.object({ en: z.string(), pt: z.string() });
const localizedParagraphs = z.object({ en: z.array(z.string()), pt: z.array(z.string()) });

// Trips & tips are per-locale markdown files under <collection>/<locale>/<slug>.md
// (the prose body lives in the file, so each language is its own file).
const trips = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/trips' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    region: z.string(),
    distanceKm: z.number(),
    start: z.string(),
    end: z.string(),
    bike: reference('bikes').optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const tips = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tips' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Bikes are a single set shared across locales, with localized text fields
// (so service/trip references resolve by one stable slug).
const bikes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bikes' }),
  schema: z.object({
    name: localized,
    make: z.string(),
    model: z.string(),
    year: z.number(),
    status: z.enum(['owned', 'past', 'wishlist']),
    purchased: z.coerce.date().optional(),
    specs: z.record(z.string(), z.string()).default({}),
    description: localizedParagraphs,
    mods: z
      .array(
        z.object({
          name: localized,
          category: localized.optional(),
          note: localized.optional(),
        }),
      )
      .default([]),
    cover: z.string().optional(),
    photos: z.array(z.string()).default([]),
    link: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

const services = defineCollection({
  loader: file('./src/data/services.yaml'),
  schema: z.object({
    id: z.string(),
    bike: reference('bikes'),
    date: z.coerce.date(),
    mileageKm: z.number().optional(),
    work: localized,
    notes: localized.optional(),
  }),
});

export const collections = { trips, tips, bikes, services };
