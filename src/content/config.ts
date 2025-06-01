import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // 'content' for Markdown
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.coerce.date(), // z.coerce.date() will transform string to Date
    description: z.string(),
    tags: z.array(z.string()).optional(),
    familiar_concepts: z.array(z.string()).optional(),
    new_concepts: z.array(z.string()).optional(),
    citation: z.object({}).optional(), // Assuming it's an object, potentially empty
    // Add any other frontmatter fields you use
  }),
});

export const collections = {
  'blog': blogCollection,
};
