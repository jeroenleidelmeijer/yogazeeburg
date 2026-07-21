import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const GA_ID = "G-J97QHGWWQC";
const CONSENT_KEY = "yz-consent-v1";
const OUTBOUND_HOST = "crossfitzeeburg.sportbitapp.nl";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    __yzGaLoaded?: boolean;
  }
}

function initGtagBase() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
}

export function applyConsent(granted: boolean) {
  initGtagBase();
  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
  });
  try {
    localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
  } catch {
    /* ignore */
  }
}

export function getStoredConsent(): "granted" | "denied" | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function loadGaScript() {
  if (window.__yzGaLoaded) return;
  window.__yzGaLoaded = true;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });
}

export function Analytics() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Bootstrap: set default consent (denied) BEFORE loading gtag, then load script.
  useEffect(() => {
    initGtagBase();
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
    });
    const stored = getStoredConsent();
    if (stored === "granted") {
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
    loadGaScript();
  }, []);

  // Track page views on route change.
  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;
    window.gtag("event", "page_view", {
      page_path: pathname + window.location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  // Outbound click tracking to Sportbit.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor?.href) return;
      try {
        const url = new URL(anchor.href);
        if (url.hostname.endsWith(OUTBOUND_HOST)) {
          window.gtag?.("event", "click_outbound_sportbit", {
            link_url: anchor.href,
            link_domain: url.hostname,
            link_text: (anchor.textContent || "").trim().slice(0, 100),
          });
        }
      } catch {
        /* ignore */
      }
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true } as EventListenerOptions);
  }, []);

  return null;
}
