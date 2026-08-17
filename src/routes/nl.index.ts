import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/nl/")({
  server: {
    handlers: {
      GET: async () => new Response(null, { status: 301, headers: { Location: "/" } }),
    },
  },
});
