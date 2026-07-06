import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/pricing", label: "Pricing" },
  { to: "/classes", label: "Classes" },
  { to: "/schedule", label: "Schedule" },
  { to: "/contact", label: "Contact" },
] as const;

const INTRO_URL = "https://trial.yogazeeburg.com/";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-5 sm:px-6 md:py-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary font-display text-xl text-primary-foreground">
            y
          </span>
          <span className="truncate font-display text-xl font-medium tracking-tight text-foreground md:text-[1.375rem]">
            Yoga Zeeburg
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3.5 py-2 text-[15px] text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={INTRO_URL}
            className="ml-3 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-[15px] font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Start Intro Pass
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-muted md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-base text-foreground/90 hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={INTRO_URL}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
            >
              Start Intro Pass
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
