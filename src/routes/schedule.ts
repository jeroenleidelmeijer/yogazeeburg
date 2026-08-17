import { createFileRoute } from "@tanstack/react-router";

// Legacy English URL, now the Dutch primary page.
export const Route = createFileRoute("/schedule")({
  server: {
    handlers: {
      GET: async () => new Response(null, { status: 301, headers: { Location: "/rooster" } }),
    },
  },
});
