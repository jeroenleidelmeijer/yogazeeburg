import { createFileRoute } from "@tanstack/react-router";
import { commercialLinks } from "@/lib/i18n";
import { TrialLanding, TRIAL_IMAGE, trialFaq } from "@/components/trial/TrialLanding";

const OG_IMAGE = `https://www.yogazeeburg.com${TRIAL_IMAGE.url}`;
const TITLE = "14 dagen onbeperkt yoga voor €30 | Yoga Zeeburg";
const DESCRIPTION =
  "Probeer 14 dagen onbeperkt yoga voor €30 bij Yoga Zeeburg in Amsterdam Oost. Voor nieuwe leerlingen, ook zonder ervaring. Stopt automatisch na 14 dagen.";

export const Route = createFileRoute("/trial")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.yogazeeburg.com/trial" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: commercialLinks("nl", "trial"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: trialFaq("nl").map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Yoga Zeeburg introductiepas — 14 dagen onbeperkt",
          serviceType: "Yogalessen",
          description:
            "14 dagen onbeperkt yogalessen bij Yoga Zeeburg in Amsterdam Oost, voor nieuwe leerlingen. Stopt automatisch na 14 dagen.",
          areaServed: "Amsterdam",
          provider: {
            "@type": "ExerciseGym",
            name: "Yoga Zeeburg",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Cruquiusweg 96F",
              addressLocality: "Amsterdam",
              postalCode: "1019 AH",
              addressCountry: "NL",
            },
            email: "hello@yogazeeburg.com",
            url: "https://www.yogazeeburg.com/",
          },
          offers: {
            "@type": "Offer",
            name: "14 dagen onbeperkt yoga",
            price: "30",
            priceCurrency: "EUR",
            url: "https://www.yogazeeburg.com/trial",
            availability: "https://schema.org/InStock",
            eligibleCustomerType: "https://schema.org/NewCustomer",
          },
        }),
      },
    ],
  }),
  component: TrialPage,
});

function TrialPage() {
  return <TrialLanding locale="nl" />;
}
