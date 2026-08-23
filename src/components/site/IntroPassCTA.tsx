import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const INTRO_URL = { nl: "/trial", en: "/en/trial" } as const;

const COPY = {
  en: {
    eyebrow: "New to Yoga Zeeburg?",
    heading: "Start with 14 days unlimited.",
    body:
      "Try different classes, teachers and times, then choose the membership that fits your week. It stops automatically after 14 days. New students only.",
    primary: "Start with 14 days unlimited",
    secondary: "View pricing",
  },
  nl: {
    eyebrow: "Nieuw bij Yoga Zeeburg?",
    heading: "Begin met 14 dagen onbeperkt.",
    body:
      "Probeer verschillende lessen, docenten en tijden en kies daarna het abonnement dat bij jouw week past. Het stopt automatisch na 14 dagen. Alleen voor nieuwe leden.",
    primary: "Start met 14 dagen onbeperkt",
    secondary: "Bekijk de prijzen",
  },
} as const;

export function IntroPassCTA({ locale = "nl" }: { locale?: Locale }) {
  const copy = COPY[locale];

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary-foreground/75">
          {copy.eyebrow}
        </p>
        <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl">
          {copy.heading}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/85">
          {copy.body}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={INTRO_URL[locale]}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-background px-7 py-4 text-base font-medium text-foreground shadow-sm transition-colors hover:bg-background/90 sm:w-auto"
          >
            {copy.primary}
            <ArrowRight className="h-4 w-4" />
          </a>
          {locale === "nl" ? (
            <Link
              to="/prijzen"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-4 text-base font-medium text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
            >
              {copy.secondary}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              to="/en/pricing"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-4 text-base font-medium text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
            >
              {copy.secondary}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
