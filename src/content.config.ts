import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // Specify content type
  schema: z.object({
    title: z.string(),
    author: z.string(), // Added author
    date: z.coerce.date(), // Changed from pubDate to date, consistent with MD and layout
    description: z.string(),
    tags: z.array(z.string()).optional(),
    familiar_concepts: z.array(z.string()).optional(),
    new_concepts: z.array(z.string()).optional(),
    citation: z.record(z.string()).optional(), // Specific type for citation object
    // heroImage and updatedDate removed as they are not in the current MD or layout
  }),
});

export const collections = {
  'blog': blogCollection, // Ensure collection name matches usage
};
