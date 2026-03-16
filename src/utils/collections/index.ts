import type { CollectionEntry } from "astro:content";

// Viteest has an issue with TS aliases so path most be given without alias for
// the purpose of testing
import { EXCLUDED_DURING_PAGES_COLLECTION_VALIDATION } from "../../constants";

// Validate that a page has an associated entry in the 'pages' collection that
// provides page meta data.
export function get_page_entry(
  path: string,
  pages: Array<CollectionEntry<"pages">>,
): CollectionEntry<"pages"> | null {
  const page_entry = path !== "/" ? path.split("/")[1] : "about";
  if (EXCLUDED_DURING_PAGES_COLLECTION_VALIDATION.includes(page_entry)) {
    return null;
  }

  const page = pages.find((p) => p.id === page_entry);
  if (!page) {
    throw new Error(`The entry in pages for '${page_entry}' is missing`);
  }

  return page;
}
