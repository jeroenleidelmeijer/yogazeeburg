import { createFileRoute } from "@tanstack/react-router";

/** Legacy /nl/* URLs (including the old /nl/kennisbank knowledge base)
 *  now live without the language prefix. */
export const Route = createFileRoute("/nl/$")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const rest = url.pathname.replace(/^\/nl(?=\/|$)/, "");
        const target = `${rest || "/"}${url.search}`;
        return new Response(null, { status: 301, headers: { Location: target } });
      },
    },
  },
});
