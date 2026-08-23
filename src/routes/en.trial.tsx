import { createFileRoute } from "@tanstack/react-router";
import { commercialLinks } from "@/lib/i18n";
import { TrialLanding, TRIAL_IMAGE, trialFaq } from "@/components/trial/TrialLanding";

const OG_IMAGE = `https://www.yogazeeburg.com${TRIAL_IMAGE.url}`;
const TITLE = "14 Days Unlimited Yoga for €30 | Yoga Zeeburg Amsterdam";
const DESCRIPTION =
  "Try 14 days of unlimited yoga for €30 at Yoga Zeeburg in Amsterdam East. New students only, beginners welcome. Ends automatically after 14 days.";

export const Route = createFileRoute("/en/trial")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.yogazeeburg.com/en/trial" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: commercialLinks("en", "trial"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: trialFaq("en").map((f) => ({
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
          name: "Yoga Zeeburg intro pass — 14 days unlimited",
          serviceType: "Yoga classes",
          description:
            "14 days of unlimited yoga classes at Yoga Zeeburg in Amsterdam East, for new students. Ends automatically after 14 days.",
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
            url: "https://www.yogazeeburg.com/en",
          },
          offers: {
            "@type": "Offer",
            name: "14 days unlimited yoga",
            price: "30",
            priceCurrency: "EUR",
            url: "https://www.yogazeeburg.com/en/trial",
            availability: "https://schema.org/InStock",
            eligibleCustomerType: "https://schema.org/NewCustomer",
          },
        }),
      },
    ],
  }),
  component: TrialPageEn,
});

function TrialPageEn() {
  return <TrialLanding locale="en" />;
}
