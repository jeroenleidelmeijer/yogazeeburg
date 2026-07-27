import { createFileRoute, redirect } from "@tanstack/react-router";

// The bare /nl/kennisbank/categorie path is not a real page — category pages
// only exist per slug. Without this route the path would fall through to the
// article slug route (/nl/kennisbank/$slug) and render "Artikel niet gevonden".
// Permanently redirect visitors to the Yoga Gids hub.
export const Route = createFileRoute("/nl/kennisbank/categorie/")({
  beforeLoad: () => {
    throw redirect({ to: "/nl/kennisbank", statusCode: 301 });
  },
  head: () => ({
    meta: [{ name: "robots", content: "noindex, follow" }],
  }),
  component: () => null,
});
