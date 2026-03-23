import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  NAME,
} from "@/constants";
import { ProjectEntrySchema, TechEntrySchema } from "@/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string().max(MAX_TITLE_LENGTH),
    author: z.string().default(NAME),
    description: z
      .string()
      .min(MIN_DESCRIPTION_LENGTH)
      .max(MAX_DESCRIPTION_LENGTH),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    publication_date: z.coerce.date(),
    revision_date: z.coerce.date().optional(),
  }),
});

const pages = defineCollection({
  loader: file("./src/content/pages.yaml"),
  schema: z.object({
    order: z.number(),
    href: z.string(),
    title: z.string().max(MAX_TITLE_LENGTH),
    description: z
      .string()
      .min(MIN_DESCRIPTION_LENGTH)
      .max(MAX_DESCRIPTION_LENGTH),
  }),
});

const links = defineCollection({
  loader: file("./src/content/links.yaml"),
  schema: z.object({
    name: z.string(),
    href: z.url(),
  }),
});

const projects = defineCollection({
  loader: file("./src/content/projects.yaml"),
  schema: ProjectEntrySchema,
});

const tech_software = defineCollection({
  loader: file("./src/content/tech/software.yaml"),
  schema: TechEntrySchema,
});

const tech_language = defineCollection({
  loader: file("./src/content/tech/languages.yaml"),
  schema: TechEntrySchema,
});

export const collections = {
  blog,
  pages,
  links,
  projects,
  tech_software,
  tech_language,
};
