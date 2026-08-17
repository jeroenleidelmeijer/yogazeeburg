import { createFileRoute } from "@tanstack/react-router";
import { resolveNlRedirect } from "@/lib/redirects";

/** Legacy /nl/* URLs (including the old /nl/kennisbank knowledge base)
 *  now live without the language prefix. Always a single 301 hop. */
export const Route = createFileRoute("/nl/$")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const target = `${resolveNlRedirect(url.pathname)}${url.search}`;
        return new Response(null, { status: 301, headers: { Location: target } });
      },
    },
  },
});
