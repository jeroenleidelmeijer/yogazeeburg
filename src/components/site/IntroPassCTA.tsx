import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const INTRO_URL = "https://crossfitzeeburg.sportbitapp.nl/web/nl/registreren/lidmaatschap?r=42";

export function IntroPassCTA() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary-foreground/75">
          New to Yoga Zeeburg?
        </p>
        <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl">
          Start with 14 days unlimited.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/85">
          Try different classes, teachers and times before choosing the routine that works
          for you.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={INTRO_URL}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-background px-7 py-4 text-base font-medium text-foreground shadow-sm transition-colors hover:bg-background/90 sm:w-auto"
          >
            Start with 14 days unlimited
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/pricing"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-4 text-base font-medium text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
          >
            View pricing
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
