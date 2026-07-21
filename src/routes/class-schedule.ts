import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/class-schedule")({
  server: {
    handlers: {
      GET: async () =>
        new Response(null, { status: 301, headers: { Location: "/schedule" } }),
    },
  },
});
