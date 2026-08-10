import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()).min(1),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishDate: z.coerce.date(),
    category: z.string(),
    status: z.enum(['进行中', '已完成', '实验中']),
    stack: z.array(z.string()).min(1),
    githubUrl: z.url(),
    demoUrl: z.url().optional(),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
  }),
});

export const collections = { posts, projects };
