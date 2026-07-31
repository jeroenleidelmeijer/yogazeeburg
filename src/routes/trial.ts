import { createFileRoute } from "@tanstack/react-router";

const TRIAL_URL = "https://trial.yogazeeburg.com/";

export const Route = createFileRoute("/trial")({
  server: {
    handlers: {
      GET: async () =>
        new Response(null, { status: 302, headers: { Location: TRIAL_URL } }),
    },
  },
});
