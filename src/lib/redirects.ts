/** Single-hop 301 redirect targets for legacy URLs.
 *
 *  Legacy English paths keep their language signal and go straight to the
 *  /en variant. Legacy /nl/* paths go straight to their prefix-free Dutch
 *  target — never through a second redirect.
 */

export const LEGACY_EN_REDIRECTS: Record<string, string> = {
  "/pricing": "/en/pricing",
  "/classes": "/en/classes",
  "/schedule": "/en/schedule",
  "/prices": "/en/pricing",
  "/yoga-styles": "/en/classes",
  "/class-schedule": "/en/schedule",
};

/** Explicit /nl/* mapping, applied before the generic prefix-stripping. */
export const LEGACY_NL_REDIRECTS: Record<string, string> = {
  "": "/",
  "/": "/",
  "/prijzen": "/prijzen",
  "/pricing": "/prijzen",
  "/lessen": "/lessen",
  "/classes": "/lessen",
  "/rooster": "/rooster",
  "/schedule": "/rooster",
  "/contact": "/contact",
  "/sportbit": "/sportbit",
};

/** Resolve the single-hop target for any legacy /nl/... pathname. */
export function resolveNlRedirect(pathname: string): string {
  const rest = pathname.replace(/^\/nl(?=\/|$)/, "");
  const normalized = rest.length > 1 ? rest.replace(/\/+$/, "") : rest;
  const mapped = LEGACY_NL_REDIRECTS[normalized];
  if (mapped) return mapped;
  // /nl/kennisbank plus every subroute keeps its path under /kennisbank.
  return rest || "/";
}
