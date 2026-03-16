import type { CollectionEntry } from "astro:content";
import { expect, test } from "vitest";

import { get_page_entry } from "./index.ts";

const mock_pages: Array<CollectionEntry<"pages">> = [
  {
    id: "about",
    data: { order: 0, href: "/", title: "About", description: "..." },
    collection: "pages",
  },
  {
    id: "projects",
    data: {
      order: 1,
      href: "/projects",
      title: "Projects",
      description: "...",
    },
    collection: "pages",
  },
  {
    id: "blog",
    data: { order: 2, href: "/blog", title: "Blog", description: "..." },
    collection: "pages",
  },
];

test("returns 'about' page for root path", () => {
  const result = get_page_entry("/", mock_pages);
  expect(result?.id).toBe("about");
});

test("returns correct page for existing route", () => {
  const result = get_page_entry("/projects", mock_pages);
  expect(result?.id).toBe("projects");
});

test("returns null for excluded routes (404)", () => {
  const result = get_page_entry("/404", mock_pages);
  expect(result).toBeNull();
});

test("returns null for excluded routes (500)", () => {
  const result = get_page_entry("/500", mock_pages);
  expect(result).toBeNull();
});

test("throws error for missing required page", () => {
  expect(() => {
    get_page_entry("/missing-page", mock_pages);
  }).toThrow("The entry in pages for 'missing-page' is missing");
});

test("handles dynamic routes - returns blog page for blog posts", () => {
  const result = get_page_entry("/blog/123", mock_pages);
  expect(result?.id).toBe("blog");
});
