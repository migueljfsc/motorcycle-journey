import { defineCollection, reference, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const trips = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/trips' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    region: z.string(),
    distanceKm: z.number(),
    start: z.string(),
    end: z.string(),
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

const bikes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bikes' }),
  schema: z.object({
    name: z.string(),
    make: z.string(),
    model: z.string(),
    year: z.number(),
    status: z.enum(['owned', 'past', 'wishlist']),
    specs: z.record(z.string(), z.string()).default({}),
    mods: z
      .array(
        z.object({
          name: z.string(),
          category: z.string().optional(),
          note: z.string().optional(),
        }),
      )
      .default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const services = defineCollection({
  loader: file('./src/data/services.yaml'),
  schema: z.object({
    id: z.string(),
    bike: reference('bikes'),
    date: z.coerce.date(),
    mileageKm: z.number(),
    work: z.string(),
    cost: z.number().optional(),
    notes: z.string().optional(),
  }),
});

export const collections = { trips, tips, bikes, services };
