import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string().optional(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      summary: z.string().max(220).optional(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      draft: z.boolean().default(false),
      visibility: z.enum(["public", "private"]).default("public"),
      lang: z.string().default("zh"),
      series: z.string().optional(),
      math: z.boolean().default(false),
      toc: z.boolean().default(true)
    })
});

export const collections = { posts };
