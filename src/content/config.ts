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

const trainer = defineCollection({
  type: 'content', // Markdown/MDX
  schema: z.object({
    isActive: z.boolean(),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string().optional(),
    email: z.string().optional(),
    bio: z.string().optional(),
    image: z.string().optional(),
  }).transform((data) => ({
    ...data,
    // Berechnete Felder
    fullName: `${data.firstName} ${data.lastName}`,
    displayName: data.firstName, // Für informelle Anrede
    contactInfo: {
      phone: data.phone,
      email: data.email,
      whatsappUrl: data.phone ? `https://wa.me/49${data.phone.replace(/^0/, '')}` : undefined,
    },
  })),
});

export const collections = { dojos, agos, trainer };
