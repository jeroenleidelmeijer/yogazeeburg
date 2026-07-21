import { useEffect, useState } from "react";
import { applyConsent, getStoredConsent } from "./Analytics";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getStoredConsent() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const decide = (granted: boolean) => {
    applyConsent(granted);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur sm:inset-x-auto sm:right-4 sm:left-auto sm:w-[28rem]"
    >
      <p className="text-sm text-foreground">
        We use a small analytics cookie to understand how the site is used. No ads, no tracking across sites.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => decide(true)}
          className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => decide(false)}
          className="inline-flex items-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
