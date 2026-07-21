import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/prices")({
  server: {
    handlers: {
      GET: async () =>
        new Response(null, { status: 301, headers: { Location: "/pricing" } }),
    },
  },
});
