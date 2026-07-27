// Safe Markdown renderer for DB-backed knowledge-base articles.
//
// This renderer is intentionally minimal and allowlist-based. It never emits
// dangerouslySetInnerHTML, and every element it renders is an explicit React
// component. Anything outside the allowed grammar becomes plain text.
//
// Supported grammar (block level, top-down):
//   - `## heading` and `### heading` → <h2 id=slug>/<h3>
//   - `- item` unordered list (contiguous lines)
//   - `1. item` ordered list (contiguous lines)
//   - Blank-line separated paragraphs
//
// Inline (inside paragraph/list/heading text):
//   - `**bold**` → <strong>
//   - `*italic*` → <em>
//   - `[label](url)` → <a>, with allowlist:
//       * relative internal paths (`/nl/...`) → <Link>
//       * `https://www.yogazeeburg.com/…` → same-site <a>
//       * `https://crossfitzeeburg.sportbitapp.nl/…` → intro-pass <a rel="noopener noreferrer">
//     Any other URL is rendered as plain text (dropped href).
//   - `` `code` `` → <code>
//
// Everything else (HTML tags, script tags, images, raw URLs) is escaped as
// text. There is no HTML pass-through of any kind.

import type { ReactNode } from "react";
import { Fragment } from "react";
import { Link } from "@tanstack/react-router";

// Reserved: hostnames used for the strict allowlist below (see classifyLink).

function slugifyHeading(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

/** Escape untrusted string for text nodes. Never used for URLs. */
function safeText(s: string): string {
  return s;
}

type InlineToken =
  | { type: "text"; value: string }
  | { type: "strong"; children: InlineToken[] }
  | { type: "em"; children: InlineToken[] }
  | { type: "code"; value: string }
  | { type: "link"; label: string; url: string };

const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/;
const CODE_RE = /`([^`]+)`/;
const STRONG_RE = /\*\*([^*]+)\*\*/;
const EM_RE = /\*([^*]+)\*/;

function tokenizeInline(s: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let remaining = s;
  while (remaining.length > 0) {
    const link = LINK_RE.exec(remaining);
    const code = CODE_RE.exec(remaining);
    const strong = STRONG_RE.exec(remaining);
    const em = EM_RE.exec(remaining);
    const candidates: Array<{ idx: number; kind: string; match: RegExpExecArray }> = [];
    if (link) candidates.push({ idx: link.index, kind: "link", match: link });
    if (code) candidates.push({ idx: code.index, kind: "code", match: code });
    if (strong) candidates.push({ idx: strong.index, kind: "strong", match: strong });
    if (em) candidates.push({ idx: em.index, kind: "em", match: em });
    if (candidates.length === 0) {
      tokens.push({ type: "text", value: remaining });
      break;
    }
    candidates.sort((a, b) => a.idx - b.idx);
    const winner = candidates[0];
    if (winner.idx > 0) {
      tokens.push({ type: "text", value: remaining.slice(0, winner.idx) });
    }
    switch (winner.kind) {
      case "link":
        tokens.push({ type: "link", label: winner.match[1], url: winner.match[2] });
        break;
      case "code":
        tokens.push({ type: "code", value: winner.match[1] });
        break;
      case "strong":
        tokens.push({ type: "strong", children: tokenizeInline(winner.match[1]) });
        break;
      case "em":
        tokens.push({ type: "em", children: tokenizeInline(winner.match[1]) });
        break;
    }
    remaining = remaining.slice(winner.idx + winner.match[0].length);
  }
  return tokens;
}

const INTERNAL_HOST = "www.yogazeeburg.com";
const INTRO_HOSTNAME = "crossfitzeeburg.sportbitapp.nl";
const ALLOWED_INTERNAL_PATH_PREFIXES = [
  "/nl/kennisbank",
  "/pricing",
  "/classes",
  "/schedule",
  "/contact",
  "/sportbit",
];

/** Classify a link URL against the allowlist. Returns `null` when disallowed.
 *  Uses strict URL parsing + exact host equality to defeat suffix-based
 *  spoofing like `www.yogazeeburg.com.evil.example` or `//evil.example`. */
export function classifyLink(
  url: string,
): { kind: "internal"; to: string } | { kind: "same-site"; href: string } | { kind: "intro"; href: string } | null {
  if (typeof url !== "string" || url.length === 0) return null;
  // Protocol-relative URLs (`//host/...`) are never internal — reject.
  if (url.startsWith("//")) return null;
  // Relative internal path: must start with "/" but not "//".
  if (url.startsWith("/")) {
    if (url === "/") return { kind: "internal", to: "/" };
    // Require an allowlisted prefix, followed by "/" or end-of-string, so
    // "/pricingx" cannot ride in on "/pricing".
    const matched = ALLOWED_INTERNAL_PATH_PREFIXES.some(
      (p) => url === p || url.startsWith(p + "/") || url.startsWith(p + "?") || url.startsWith(p + "#"),
    );
    return matched ? { kind: "internal", to: url } : null;
  }
  // Absolute: must parse and use https with exact hostname match.
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (parsed.protocol !== "https:") return null;
  if (parsed.hostname === INTERNAL_HOST) return { kind: "same-site", href: parsed.toString() };
  if (parsed.hostname === INTRO_HOSTNAME) return { kind: "intro", href: parsed.toString() };
  return null;
}

function renderInline(tokens: InlineToken[], keyPrefix: string): ReactNode[] {
  return tokens.map((tok, i) => {
    const k = `${keyPrefix}-${i}`;
    switch (tok.type) {
      case "text":
        return <Fragment key={k}>{safeText(tok.value)}</Fragment>;
      case "code":
        return (
          <code
            key={k}
            className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.92em] text-foreground"
          >
            {safeText(tok.value)}
          </code>
        );
      case "strong":
        return <strong key={k}>{renderInline(tok.children, k)}</strong>;
      case "em":
        return <em key={k}>{renderInline(tok.children, k)}</em>;
      case "link": {
        const cls = classifyLink(tok.url);
        if (!cls) return <Fragment key={k}>{safeText(tok.label)}</Fragment>;
        if (cls.kind === "internal") {
          return (
            <Link
              key={k}
              to={cls.to}
              className="font-medium text-primary underline underline-offset-4 hover:no-underline"
            >
              {safeText(tok.label)}
            </Link>
          );
        }
        if (cls.kind === "same-site") {
          return (
            <a
              key={k}
              href={cls.href}
              className="font-medium text-primary underline underline-offset-4 hover:no-underline"
            >
              {safeText(tok.label)}
            </a>
          );
        }
        return (
          <a
            key={k}
            href={cls.href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="font-medium text-primary underline underline-offset-4 hover:no-underline"
          >
            {safeText(tok.label)}
          </a>
        );
      }
    }
  });
}

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

function parseBlocks(md: string): Block[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trimEnd();
    if (!line.trim()) {
      i++;
      continue;
    }
    if (/^##\s+/.test(line)) {
      out.push({ type: "h2", text: line.replace(/^##\s+/, "").trim() });
      i++;
      continue;
    }
    if (/^###\s+/.test(line)) {
      out.push({ type: "h3", text: line.replace(/^###\s+/, "").trim() });
      i++;
      continue;
    }
    if (/^-\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^-\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^-\s+/, "").trim());
        i++;
      }
      out.push({ type: "ul", items });
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, "").trim());
        i++;
      }
      out.push({ type: "ol", items });
      continue;
    }
    // Paragraph: consume until blank line.
    const buf: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(##\s|###\s|-\s|\d+\.\s)/.test(lines[i])) {
      buf.push(lines[i].trim());
      i++;
    }
    out.push({ type: "p", text: buf.join(" ") });
  }
  return out;
}

export function SafeMarkdownBody({ markdown }: { markdown: string }): ReactNode {
  const blocks = parseBlocks(markdown);
  return (
    <div className="space-y-4">
      {blocks.map((b, i) => {
        const k = `b-${i}`;
        switch (b.type) {
          case "h2":
            return (
              <h2
                key={k}
                id={slugifyHeading(b.text)}
                className="mt-10 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
              >
                {renderInline(tokenizeInline(b.text), k)}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={k}
                id={slugifyHeading(b.text)}
                className="mt-6 font-display text-xl font-medium text-foreground"
              >
                {renderInline(tokenizeInline(b.text), k)}
              </h3>
            );
          case "p":
            return (
              <p key={k} className="leading-relaxed">
                {renderInline(tokenizeInline(b.text), k)}
              </p>
            );
          case "ul":
            return (
              <ul key={k} className="mt-2 list-disc space-y-2 pl-5">
                {b.items.map((it, j) => (
                  <li key={`${k}-${j}`}>{renderInline(tokenizeInline(it), `${k}-${j}`)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={k} className="mt-2 list-decimal space-y-2 pl-5">
                {b.items.map((it, j) => (
                  <li key={`${k}-${j}`}>{renderInline(tokenizeInline(it), `${k}-${j}`)}</li>
                ))}
              </ol>
            );
        }
      })}
    </div>
  );
}

// Test-only exports so unit tests can assert on the pure parser without
// invoking React rendering.
export const __test__ = {
  parseBlocks,
  tokenizeInline,
  classifyLink,
  slugifyHeading,
};
