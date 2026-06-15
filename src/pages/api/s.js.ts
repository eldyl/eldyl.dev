import type { APIRoute } from "astro";

export const prerender = false;

const UMAMI_SCRIPT = "https://cloud.umami.is/script.js";
const UMAMI_ENDPOINT = "https://gateway.umami.is/api/send";

const FORWARDED_HEADERS = [
  "user-agent",
  "x-umami-website-id",
  "x-umami-hostname",
  "x-umami-cache",
];

export const GET: APIRoute = async () => {
  try {
    const response = await fetch(UMAMI_SCRIPT);
    const script = (await response.text()).replaceAll("/api/send", "/api/s.js");
    return new Response(script, {
      headers: {
        "Content-Type": "text/javascript; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (e) {
    console.error(`Failed to fetch umami analytics script on server: ${e}`);
    return new Response(null, {
      status: 204,
      headers: { "Content-Type": "text/javascript; charset=utf-8" },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  const headers = new Headers({ "Content-Type": "application/json" });

  for (const name of FORWARDED_HEADERS) {
    const value = request.headers.get(name);
    if (value) {
      headers.set(name, value);
    }
  }

  const client_ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for");
  if (client_ip) {
    headers.set("x-forwarded-for", client_ip);
  }

  try {
    const response = await fetch(UMAMI_ENDPOINT, {
      method: "POST",
      headers,
      body: await request.text(),
    });

    return new Response(response.body, {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(`Failed to forward umami event: ${e}`);
    return new Response(null, { status: 204 });
  }
};
