// Deterministic, content-safe normalization for AI-produced payloads.
//
// Rules:
// - Only fills fields that are either LITERALS the schema pins to a fixed value
//   (`ctaRule`, `schemaVersion`), or arrays whose empty state is a fail-closed
//   default (no allowed links, no whitelisted facts, no known related articles),
//   or a schema-permitted empty-string metadata field.
// - Never invents source facts, keywords, titles, categories, dates, or any
//   other content the domain schema requires the AI to author.
// - Idempotent: applying it twice produces the same result.
// - Never mutates the input.
import { SCHEMA_VERSION } from "./prompts";

const FILL_ARRAYS = [
  "riskFlags",
  "sourceFlags",
  "allowedStudioFacts",
  "validatedLinkTargets",
  "relatedPublishedArticles",
] as const;

export function normalizeBriefCandidate(raw: unknown): unknown {
  if (raw == null || typeof raw !== "object" || Array.isArray(raw)) return raw;
  const src = raw as Record<string, unknown>;
  const out: Record<string, unknown> = { ...src };

  // Pinned literal — the schema only accepts this exact value.
  out.ctaRule = "fixed-intro-pass";

  // Deterministic version tag — never a content decision.
  if (typeof out.schemaVersion !== "string" || out.schemaVersion.length === 0) {
    out.schemaVersion = SCHEMA_VERSION;
  }

  // Schema permits empty string; missing metadata is not content.
  if (typeof out.cannibalisationNotes !== "string") {
    out.cannibalisationNotes = "";
  }

  // Fail-closed defaults: missing array = "no allowed links / no known
  // related articles / no whitelisted facts", which downstream gating treats
  // as the strictest possible state.
  for (const key of FILL_ARRAYS) {
    if (!Array.isArray(out[key])) out[key] = [];
  }

  return out;
}
