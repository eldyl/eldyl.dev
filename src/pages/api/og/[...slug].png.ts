import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { satoriAstroOG } from "satori-astro";
import { html } from "satori-html";

import { DOMAIN, NAME } from "@/constants";

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getCollection("pages");
  const posts = await getCollection("blog");

  const static_pages = pages.map((page) => ({
    params: { slug: page.id },
    props: {
      title: page.data.title,
      description: page.data.description,
      path: page.id === "about" ? "~" : `~/${page.id}`,
    },
  }));

  const blog_pages = posts.map((post) => ({
    params: { slug: `blog/${post.id}` },
    props: {
      title: post.data.title,
      description: post.data.description,
      path: `~/blog/${post.id}`,
    },
  }));

  return [...static_pages, ...blog_pages];
};

// https://vercel.com/kb/guide/using-custom-font
async function load_google_font(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;

  const css = await (await fetch(url)).text();

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (resource) {
    const response = await fetch(resource[1]);

    if (response.status === 200) {
      return response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export const GET: APIRoute = async ({ props }) => {
  const FONT_NAME = "JetBrains Mono";
  const USER_DOMAIN = "eldyl@dev";
  const OPEN_BRACKET = "[";
  const CLOSE_BRACKET = "]";
  const CLOSE_ANGLE_BRACKET = ">";

  const TITLE_CHAR_LENGTH_CUTOFF = 30;
  const PATH_CHAR_LENGTH_CUTOFF = 29;

  let { title, description, path } = props as {
    title: string;
    description: string;
    path: string;
  };

  const all_text = `${NAME}${DOMAIN}${USER_DOMAIN}${OPEN_BRACKET}${CLOSE_BRACKET}${CLOSE_ANGLE_BRACKET}${title}${description}${path}`;

  let title_font_size = "72px";
  if (title.length > TITLE_CHAR_LENGTH_CUTOFF) {
    title_font_size = "48px";
  }

  if (path.length > PATH_CHAR_LENGTH_CUTOFF) {
    path = `${path.slice(0, PATH_CHAR_LENGTH_CUTOFF - 1)}...`;
  }

  const bg_color = "#101014";
  const text_color = "#b2becf";
  const text_accent = "#095364";
  const text_subtle = "#9f9fa9";

  return satoriAstroOG({
    template: html`
      <div
        style="display: flex; flex-direction: column; justify-content: space-between; background-color: ${bg_color}; font-family: Inter; height: 100%; width: 100%; padding: 64px;"
      >
        <!-- Top: terminal prompt string -->
        <div style="display: flex; align-items: center; font-size: 28px;">
          <span style="color: ${text_accent};">${OPEN_BRACKET}</span>
          <span style="color: ${text_color};">${USER_DOMAIN}</span>
          <span style="color: ${text_accent};">${CLOSE_BRACKET}</span>
          <span style="color: ${text_accent}; margin-left: 12px;"
            >${OPEN_BRACKET}</span
          >
          <span style="color: ${text_color};">${path}</span>
          <span style="color: ${text_accent};">${CLOSE_BRACKET}</span>
          <span style="color: ${text_accent}; margin-left: 12px;">></span>
          <span style="color: ${text_color}; margin-left: 12px;">${NAME}</span>
          <span
            style="background: ${text_color}; width: 14px; height: 28px;"
          ></span>
        </div>

        <!-- Middle: title and description -->
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <h1
            style="color: white; font-size: ${title_font_size}; font-weight: 700; margin: 0; line-height: 1.1;  word-break: break-all;"
          >
            ${title}
          </h1>
          <div
            style="display: flex; width: 360px; height: 4px; background: linear-gradient(90deg, ${text_accent} 0%, transparent 100%);"
          ></div>
          <p
            style="color: ${text_color}; font-size: 32px; margin: 0; line-height: 1.4;"
          >
            ${description}
          </p>
        </div>

        <!-- Bottom: site -->
        <div style="display: flex;">
          <span style="color: ${text_subtle}; font-size: 24px;">${DOMAIN}</span>
        </div>
      </div>
    `,
    width: 1200,
    height: 630,
  }).toResponse({
    satori: {
      fonts: [
        {
          name: FONT_NAME,
          data: await load_google_font(FONT_NAME, all_text),
          style: "normal",
        },
      ],
    },
  });
};
