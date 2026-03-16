export async function GET() {
  try {
    const response = await fetch("https://cloud.umami.is/script.js");
    const script_content = await response.text();
    return new Response(script_content, {
      headers: { "Content-Type": "text/javascript; charset=utf-8" },
    });
  } catch (e) {
    console.error(`Failed to fetch umami analytics script on server: ${e}`);
    return new Response("", {
      status: 204,
      headers: { "Content-Type": "text/javascript; charset=utf-8" },
    });
  }
}
