import { createFileRoute } from "@tanstack/react-router";

/**
 * Public integration endpoint for Leidelmeijer OS.
 * Auth: X-Api-Key header, validated against LEIDELMEIJER_OS_API_KEY.
 */
export const Route = createFileRoute("/api/public/v1/kennisbank-summary")({
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
