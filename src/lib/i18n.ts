// Locale + URL architecture for the public commercial pages.
//
// Dutch is the primary language and lives on the root paths. English lives
// under /en. The knowledge base (Yoga Gids) is Dutch-only and has no English
// equivalent, so it never advertises an English hreflang.

export type Locale = "nl" | "en";

export const BASE_URL = "https://www.yogazeeburg.com";

export type CommercialPage =
  | "home"
  | "pricing"
  | "classes"
  | "schedule"
  | "contact"
  | "sportbit";

export const COMMERCIAL_PATHS: Record<Locale, Record<CommercialPage, string>> = {
  nl: {
    home: "/",
    pricing: "/prijzen",
    classes: "/lessen",
    schedule: "/rooster",
    contact: "/contact",
    sportbit: "/sportbit",
  },
  en: {
    home: "/en",
    pricing: "/en/pricing",
    classes: "/en/classes",
    schedule: "/en/schedule",
    contact: "/en/contact",
    sportbit: "/en/sportbit",
  },
};

export function pageUrl(locale: Locale, page: CommercialPage): string {
  const path = COMMERCIAL_PATHS[locale][page];
  // Home pages canonicalise with a trailing slash.
  if (page === "home") return locale === "nl" ? `${BASE_URL}/` : `${BASE_URL}/en/`;
  return `${BASE_URL}${path}`;
}

/** Self-referencing canonical + nl-NL / en / x-default hreflang set. */
export function commercialLinks(locale: Locale, page: CommercialPage) {
  return [
    { rel: "canonical", href: pageUrl(locale, page) },
    { rel: "alternate", hrefLang: "nl-NL", href: pageUrl("nl", page) },
    { rel: "alternate", hrefLang: "en", href: pageUrl("en", page) },
    { rel: "alternate", hrefLang: "x-default", href: pageUrl("nl", page) },
  ];
}

/** The counterpart URL used by the language switcher. */
export function switchUrl(locale: Locale, page: CommercialPage): string {
  return COMMERCIAL_PATHS[locale === "nl" ? "en" : "nl"][page];
}

export function htmlLang(locale: Locale): string {
  return locale === "nl" ? "nl-NL" : "en";
}

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "nl";
}
