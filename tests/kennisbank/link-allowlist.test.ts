// Contract tests for the Markdown link allowlist. This is the surface that
// determines whether a DB-authored article can render an <a> in the public
// detail template. The allowlist must reject suffix-spoofing hostnames and
// protocol-relative URLs.
import { describe, it, expect } from "vitest";
import { classifyLink } from "@/components/kennisbank/SafeMarkdownBody";

describe("classifyLink allowlist", () => {
  const REJECT = [
    "https://www.yogazeeburg.com.evil.example/x",
    "https://evil.example/www.yogazeeburg.com",
    "https://crossfitzeeburg.sportbitapp.nl.evil.example/x",
    "//evil.example/x",
    "//www.yogazeeburg.com/prijzen",
    "http://www.yogazeeburg.com/prijzen",
    "javascript:alert(1)",
    "data:text/html,<script>",
    "ftp://www.yogazeeburg.com/x",
    "/prijzenx",
    "/../etc/passwd",
    "",
    "not-a-url",
  ];
  for (const url of REJECT) {
    it(`rejects ${JSON.stringify(url)}`, () => {
      expect(classifyLink(url)).toBeNull();
    });
  }

  it("accepts an internal same-origin absolute URL with exact host", () => {
    const r = classifyLink("https://www.yogazeeburg.com/prijzen");
    expect(r).toEqual({ kind: "same-site", href: "https://www.yogazeeburg.com/prijzen" });
  });

  it("accepts the intro-pass host with exact match", () => {
    const r = classifyLink("https://crossfitzeeburg.sportbitapp.nl/order");
    expect(r?.kind).toBe("intro");
  });

  it("accepts a relative kennisbank path", () => {
    expect(classifyLink("/kennisbank/wat-is-yoga")).toEqual({
      kind: "internal",
      to: "/kennisbank/wat-is-yoga",
    });
    expect(classifyLink("/prijzen")).toEqual({ kind: "internal", to: "/prijzen" });
  });

  it("rejects prefix-adjacent internal paths (no /prijzenx)", () => {
    expect(classifyLink("/prijzenx")).toBeNull();
  });
});
