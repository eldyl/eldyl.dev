import { z } from "astro:content";

const ProjectEntrySchema = z.object({
  title: z.string(),
  abbreviation: z.string().min(1).max(3),
  href: z.string().url(),
  location: z.string(),
  role: z.enum(["author", "contributor"]),
  description: z.string(),
});
type ProjectEntry = z.infer<typeof ProjectEntrySchema>;

const TechEntrySchema = z.object({
  title: z.string(),
  purpose: z.string().optional(),
  href: z.string().url().optional(),
  location: z.string().optional(),
  description: z.string(),
  icon: z
    .object({
      name: z.string(),
      color: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, { message: "Hex code is invalid" }),
    })
    .optional(),
});
type TechEntry = z.infer<typeof TechEntrySchema>;

export type { ProjectEntry, TechEntry };
export { ProjectEntrySchema, TechEntrySchema };
