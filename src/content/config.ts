import { defineCollection, z } from 'astro:content';

const dojos = defineCollection({
  type: 'content', // Markdown/MDX
  schema: z.object({
    isActive: z.boolean().optional(),
    name: z.string(),
    location: z.string(),
    facebook: z.string().optional(),
    gmaps: z.string().optional(),
    logo: z.string(),
    image: z.string().optional(),
    trainings: z.array(
      z.object({
        day: z.string(),
        slots: z.array(
          z.object({
            time: z.string(),
            title: z.string(),
          })
        ).default([]),
      })
    ).default([]),
  }),
});

const agos = defineCollection({
  type: 'content', // Markdown/MDX
  schema: z.object({
    isActive: z.boolean().optional(),
    name: z.string(),
    location: z.string().optional(),
    facebook: z.string().optional(),
    gmaps: z.string().optional(),
    logo: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = { dojos, agos };
