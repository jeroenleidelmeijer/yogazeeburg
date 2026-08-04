import { createFileRoute } from "@tanstack/react-router";

/**
 * Alias of /api/public/v1/kennisbank-summary, kept so integrators can use the
 * documented /api/v1/... path. Same X-Api-Key check applies.
 */
export const Route = createFileRoute("/api/v1/kennisbank-summary")({
  server: {
    handlers: {
      OPTIONS: async () => {
        const { handleKennisbankSummaryOptions } =
          await import("@/lib/integrations/kennisbank-summary-endpoint.server");
        return handleKennisbankSummaryOptions();
      },
      GET: async ({ request }) => {
        const { handleKennisbankSummaryRequest } =
          await import("@/lib/integrations/kennisbank-summary-endpoint.server");
        return handleKennisbankSummaryRequest(request);
      },
    },
  },
});
