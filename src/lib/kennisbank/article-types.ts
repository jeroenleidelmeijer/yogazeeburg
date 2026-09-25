// Light, body-free shared types and category constants for the Yoga Gids.
// Split out of `articles.tsx` so per-article body modules can be code-split
// without duplicating type/category declarations.
import type { LucideIcon } from "lucide-react";
import { MapPin, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import type { ArticleImageRef } from "@/components/kennisbank/ArticleFigure";

export type { ArticleImageRef };

export type ArticleCategory = {
  slug: string;
  title: string;
  icon: LucideIcon;
};

export type ArticleFAQ = { question: string; answer: string };

export type ArticleTemplateOptions = {
  showTOC: boolean;
  showFAQ: boolean;
  showSources: boolean;
  showRelated: boolean;
};

export type ArticleTOCItem = { id: string; label: string };

export type Article = {
  slug: string;
  title: string;
  seoTitle: string;
  ogTitle?: string;
  ogDescription?: string;
  h1: string;
  description: string;
  intro?: string;
  category: ArticleCategory;
  type: "local-guide" | "explainer" | "how-to" | "comparison" | "guide";
  pillar: boolean;
  publishedAt: string; // ISO date
  updatedAt: string; // ISO date
  readingTimeMin: number;
  toc: ArticleTOCItem[];
  faqs: ArticleFAQ[];
  sources?: { title: string; url: string }[];
  template: ArticleTemplateOptions;
  /** Optional hero image, rendered after the header/meta and before the TOC.
   *  Also used for og:image, twitter:image and Article JSON-LD `image`. */
  heroImage?: ArticleImageRef;
  heroCaption?: string;
  /** Optional per-article final CTA override. When absent, the shared default
   *  Intro Pass CTA renders unchanged. `href` is always the Intro Pass URL. */
  cta?: { label: string; subtext?: string };
  body: () => ReactNode;
};

export const CATEGORY_AMSTERDAM_OOST: ArticleCategory = {
  slug: "yoga-amsterdam-oost",
  title: "Yoga in Amsterdam Oost",
  icon: MapPin,
};

export const CATEGORY_BEGINNEN_MET_YOGA: ArticleCategory = {
  slug: "beginnen-met-yoga",
  title: "Beginnen met yoga",
  icon: Sparkles,
};
