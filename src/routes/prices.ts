import { createFileRoute } from "@tanstack/react-router";
import { LEGACY_EN_REDIRECTS } from "@/lib/redirects";

// Legacy English URL: single 301 hop to the English /en variant.
export const Route = createFileRoute("/prices")({
  server: {
    handlers: {
      GET: async () =>
        new Response(null, {
          status: 301,
          headers: { Location: LEGACY_EN_REDIRECTS["/prices"]! },
        }),
    },
  },
});
