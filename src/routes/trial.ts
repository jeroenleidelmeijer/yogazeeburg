import { createFileRoute } from "@tanstack/react-router";

const INTRO_URL =
  "https://crossfitzeeburg.sportbitapp.nl/web/nl/registreren/lidmaatschap?r=42";

export const Route = createFileRoute("/trial")({
  server: {
    handlers: {
      GET: async () =>
        new Response(null, { status: 302, headers: { Location: INTRO_URL } }),
    },
  },
});
