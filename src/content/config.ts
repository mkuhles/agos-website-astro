import { defineCollection, z } from 'astro:content';

const dojos = defineCollection({
  type: 'content', // Markdown/MDX
  schema: z.object({
    id: z.string(),
    name: z.string(),
    location: z.string(),
    facebook: z.string().optional(),
    gmaps: z.string().optional(),
    logo: z.string(),
  }),
});

export const collections = { dojos };