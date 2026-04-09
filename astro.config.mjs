// @ts-check
import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import playformCompress from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import { loadEnv } from "vite";

//@ts-expect-error loadEnv doesn't want to take in process.env.NODE_ENV because it is possibly undefined.
const { SITE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  trailingSlash: "ignore",

  env: {
    schema: {
      SITE_URL: envField.string({ context: "client", access: "public" }),
      ANALYTICS_ID: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },

  integrations: [icon(), sitemap(), playformCompress()],

  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    inlineStylesheets: "always",
  },

  markdown: {
    remarkPlugins: [[remarkToc, { heading: "toc", maxDepth: 3 }]],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: "no-underline",
            "aria-label": "Link to this heading",
          },
        },
      ],
    ],
    shikiConfig: {
      theme: "tokyo-night",
    },
  },

  adapter: cloudflare({
    prerenderEnvironment: "node",
  }),

  devToolbar: {
    enabled: false,
  },
});
