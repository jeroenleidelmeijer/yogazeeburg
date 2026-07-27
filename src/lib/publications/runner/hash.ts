// Deterministic canonical hashing used for cross-run artifact equality and
// tamper-resistance. Content hashes are computed by the runner over a
// canonical JSON form; the AI is never trusted to supply this value.
import { createHash } from "crypto";

function canonical(value: unknown): string {
  if (value === null || value === undefined) return "null";
  if (typeof value === "number" || typeof value === "boolean") return JSON.stringify(value);
  if (typeof value === "string") return JSON.stringify(value);
  if (Array.isArray(value)) return "[" + value.map(canonical).join(",") + "]";
  if (typeof value === "object") {
    const keys = Object.keys(value as Record<string, unknown>).sort();
    return (
      "{" +
      keys
        .map((k) => JSON.stringify(k) + ":" + canonical((value as Record<string, unknown>)[k]))
        .join(",") +
      "}"
    );
  }
  return JSON.stringify(String(value));
}

export function canonicalize(value: unknown): string {
  return canonical(value);
}

export function sha256Hex(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

export function contentHashOf(value: unknown): string {
  return "sha256:" + sha256Hex(canonical(value));
}

// Hash a generated article package canonically, ignoring the AI-supplied
// contentHash field (which the runner replaces with the trusted value).
export function packageContentHash(pkg: Record<string, unknown>): string {
  const clone: Record<string, unknown> = { ...pkg };
  delete clone.contentHash;
  return contentHashOf(clone);
}
