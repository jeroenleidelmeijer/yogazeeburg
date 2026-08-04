/**
 * Shared HTTP wrapper for the Leidelmeijer OS kennisbank integration.
 * Server-only: reads the API key from process.env inside the handler.
 */
import { timingSafeEqual } from "crypto";
import { buildKennisbankSummary } from "./kennisbank-summary.server";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Api-Key",
  "Access-Control-Max-Age": "86400",
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...CORS_HEADERS,
    },
  });
}

function keyMatches(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function handleKennisbankSummaryOptions(): Response {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function handleKennisbankSummaryRequest(request: Request): Promise<Response> {
  const expected = process.env["LEIDELMEIJER_OS_API_KEY"];
  if (!expected) {
    return json({ error: "integration_not_configured" }, 503);
  }

  const provided = request.headers.get("x-api-key");
  if (!provided || !keyMatches(provided, expected)) {
    return json({ error: "unauthorized" }, 401);
  }

  try {
    return json(await buildKennisbankSummary(), 200);
  } catch (error) {
    // Never leak database internals to an external caller.
    console.error("kennisbank-summary failed", error);
    return json({ error: "internal_error" }, 500);
  }
}
