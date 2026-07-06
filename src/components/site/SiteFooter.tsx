import { Link } from "@tanstack/react-router";

const INTRO_URL = "https://trial.yogazeeburg.com/";
const CONTACT_EMAIL = "hello@yogazeeburg.com";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="font-display text-xl text-foreground">Yoga Zeeburg</div>
          <p className="mt-3 text-sm text-muted-foreground">
            Down-to-earth yoga studio in Amsterdam East.
          </p>
          <address className="mt-4 text-sm not-italic text-muted-foreground">
            Cruquiusweg 96F<br />
            1019 AH Amsterdam<br />
            Above CrossFit Zeeburg
          </address>
          <p className="mt-3 text-xs text-muted-foreground">
            Amsterdam East · Zeeburg · Cruquius
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-3 inline-block text-sm text-foreground/85 hover:text-foreground"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div>
          <div className="text-sm font-medium text-foreground">Explore</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
            <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
            <li><Link to="/classes" className="text-muted-foreground hover:text-foreground">Classes</Link></li>
            <li><Link to="/schedule" className="text-muted-foreground hover:text-foreground">Schedule</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-medium text-foreground">Start</div>
          <p className="mt-3 text-sm text-muted-foreground">
            Try 14 days of unlimited yoga. Stops automatically. New students only.
          </p>
          <a
            href={INTRO_URL}
            className="mt-4 inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Start with 14 days unlimited
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
