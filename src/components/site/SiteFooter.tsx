import { Link } from "@tanstack/react-router";
import type { Locale } from "@/lib/i18n";

const INTRO_URL = { nl: "/trial", en: "/en/trial" } as const;
const CONTACT_EMAIL = "hello@yogazeeburg.com";

const COPY = {
  nl: {
    tagline: "Down-to-earth yogastudio in Amsterdam Oost.",
    above: "Boven CrossFit Zeeburg",
    explore: "Ontdek",
    start: "Beginnen",
    startBody:
      "Probeer 14 dagen onbeperkt yoga. Stopt automatisch. Alleen voor nieuwe leden.",
    cta: "Start met 14 dagen onbeperkt",
    guide: "Yoga Gids",
    sportbit: "Sportbit-uitleg",
    home: "Home",
    pricing: "Prijzen",
    classes: "Lessen",
    schedule: "Rooster",
    contact: "Contact",
  },
  en: {
    tagline: "Down-to-earth yoga studio in Amsterdam East.",
    above: "Above CrossFit Zeeburg",
    explore: "Explore",
    start: "Start",
    startBody: "Try 14 days of unlimited yoga. Stops automatically. New students only.",
    cta: "Start with 14 days unlimited",
    guide: "Yoga Gids (Dutch)",
    sportbit: "Sportbit guide",
    home: "Home",
    pricing: "Pricing",
    classes: "Classes",
    schedule: "Schedule",
    contact: "Contact",
  },
} as const;

export function SiteFooter({ locale = "nl" }: { locale?: Locale }) {
  const copy = COPY[locale];
  const linkClass = "text-muted-foreground hover:text-foreground";

  return (
    <footer className="border-t border-border/60 bg-secondary/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="font-display text-xl text-foreground">Yoga Zeeburg</div>
          <p className="mt-3 text-sm text-muted-foreground">{copy.tagline}</p>
          <address className="mt-4 text-sm not-italic text-muted-foreground">
            Cruquiusweg 96F
            <br />
            1019 AH Amsterdam
            <br />
            {copy.above}
          </address>
          <p className="mt-3 text-xs text-muted-foreground">
            {locale === "nl"
              ? "Amsterdam Oost · Zeeburg · Cruquius"
              : "Amsterdam East · Zeeburg · Cruquius"}
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-3 inline-block text-sm text-foreground/85 hover:text-foreground"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div>
          <div className="text-sm font-medium text-foreground">{copy.explore}</div>
          <ul className="mt-3 space-y-2 text-sm">
            {locale === "nl" ? (
              <>
                <li>
                  <Link to="/" className={linkClass}>
                    {copy.home}
                  </Link>
                </li>
                <li>
                  <Link to="/prijzen" className={linkClass}>
                    {copy.pricing}
                  </Link>
                </li>
                <li>
                  <Link to="/lessen" className={linkClass}>
                    {copy.classes}
                  </Link>
                </li>
                <li>
                  <Link to="/rooster" className={linkClass}>
                    {copy.schedule}
                  </Link>
                </li>
                <li>
                  <Link to="/sportbit" className={linkClass}>
                    {copy.sportbit}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className={linkClass}>
                    {copy.contact}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/en" className={linkClass}>
                    {copy.home}
                  </Link>
                </li>
                <li>
                  <Link to="/en/pricing" className={linkClass}>
                    {copy.pricing}
                  </Link>
                </li>
                <li>
                  <Link to="/en/classes" className={linkClass}>
                    {copy.classes}
                  </Link>
                </li>
                <li>
                  <Link to="/en/schedule" className={linkClass}>
                    {copy.schedule}
                  </Link>
                </li>
                <li>
                  <Link to="/en/sportbit" className={linkClass}>
                    {copy.sportbit}
                  </Link>
                </li>
                <li>
                  <Link to="/en/contact" className={linkClass}>
                    {copy.contact}
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/kennisbank" className={linkClass}>
                {copy.guide}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-medium text-foreground">{copy.start}</div>
          <p className="mt-3 text-sm text-muted-foreground">{copy.startBody}</p>
          <a
            href={INTRO_URL[locale]}
            className="mt-4 inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {copy.cta}
          </a>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Yoga Zeeburg
        </div>
      </div>
    </footer>
  );
}
