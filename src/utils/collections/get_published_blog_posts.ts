import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export async function get_published_blog_posts(): Promise<
  Array<CollectionEntry<"blog">>
> {
  return (await getCollection("blog"))
    .filter((p) => !p.data.draft)
    .sort(
      (a, b) =>
        b.data.publication_date.valueOf() - a.data.publication_date.valueOf(),
    );
}
