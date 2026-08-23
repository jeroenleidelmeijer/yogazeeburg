import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Globe } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import matAsset from "@/assets/yogamat-bolster-water.webp.asset.json";

const INTAKE_ENDPOINT = "https://crossfitzeeburgwebsite.lovable.app/api/public/intake/yoga-trial";
const SPORTBIT_URL = "https://crossfitzeeburg.sportbitapp.nl/web/nl/registreren/lidmaatschap?r=45";
const CONTACT_EMAIL = "hello@yogazeeburg.com";
const FORM_ID = "intro-pass-form";

export const TRIAL_IMAGE = {
  url: matAsset.url,
  alt: {
    nl: "Yogamat met bolster en uitzicht over het water bij Yoga Zeeburg in Amsterdam Oost.",
    en: "Yoga mat with bolster and a view over the water at Yoga Zeeburg in Amsterdam East.",
  },
  width: 1600,
  height: 900,
};

const COPY = {
  nl: {
    back: "Terug naar website",
    backTo: "/" as const,
    switchLabel: "EN",
    switchHref: "/en/trial",
    switchTitle: "Read this page in English",
    eyebrow: "14 dagen onbeperkt · €30 · voor nieuwe leerlingen",
    h1: "Geef jezelf 14 dagen om te voelen wat yoga met je doet.",
    heroBody:
      "Een rustiger hoofd. Een lichaam dat weer wat vrijer beweegt. Even tijd die echt van jou is. Probeer twee weken lang onbeperkt verschillende yogalessen bij onze kleine studio aan het water in Amsterdam Oost.",
    heroBullets: [
      "Onbeperkt lessen proberen",
      "Voor beginners én ervaren yogi’s",
      "Stopt automatisch na 14 dagen",
    ],
    transformEyebrow: "Misschien is dit precies wat je mist",
    transformH2: "Niet nóg iets dat moet. Juist een moment waarop niets hoeft.",
    transformBody:
      "Je dagen zijn al vol genoeg. Yoga hoeft geen nieuwe prestatie te worden. Het kan het uur zijn waarin je hoofd stiller wordt, je schouders zakken en je weer merkt hoe je je eigenlijk voelt.",
    benefits: [
      "Kom uit je hoofd en terug in je lichaam.",
      "Maak stijve schouders, heupen en rug weer vrijer.",
      "Laad op zonder dat je harder hoeft te werken.",
      "Ontdek een yogaritme dat bij jouw echte week past.",
    ],
    objectionH2:
      "Je hoeft niet lenig te zijn. Je hoeft niet ervaren te zijn. Je hoeft alleen te beginnen.",
    objectionBody:
      "Bij Yoga Zeeburg draait het niet om perfecte houdingen of jezelf vergelijken met de persoon naast je. Onze docenten begeleiden duidelijk en persoonlijk. Je kiest rustigere of actievere lessen en doet wat vandaag bij jouw lichaam past.",
    objectionReassurance:
      "Ook als je hoofd druk is, je lichaam stijf voelt of je nog nooit op een yogamat hebt gestaan: je bent welkom.",
    howHeading: "Van ‘ik zou eigenlijk…’ naar je eerste les.",
    steps: [
      "Laat je gegevens achter.",
      "Rond in SportBit je introductiepas af en kies daar zelf de startdatum.",
      "Boek verschillende lessen en ontdek wat bij je past.",
    ],
    whyHeading: "Een kleine, persoonlijke studio waar je gewoon jezelf kunt zijn.",
    whyBody:
      "Yoga Zeeburg ligt aan het water in Cruquius, boven CrossFit Zeeburg. Geen anonieme massastudio, maar een rustige plek met kleine groepen, benaderbare docenten en aandacht voor hoe jij beweegt en ademt.",
    whyPoints: [
      "Kleine groepen",
      "Persoonlijke begeleiding",
      "Down-to-earth sfeer",
      "Rustige én actieve lessen",
    ],
    offerHeading: "Veertien dagen. Zoveel lessen als je wilt. Eén helder bedrag.",
    offerBody:
      "Voor €30 probeer je verschillende lessen, docenten en tijden. Daarna stopt je introductiepas automatisch. Geen verborgen abonnement — alleen de kans om zelf te ervaren wat bij je past.",
    faqHeading: "Veelgestelde vragen",
    faq: [
      {
        q: "Ik heb nog nooit yoga gedaan. Kan ik meedoen?",
        a: "Ja. Veel leerlingen beginnen zonder ervaring. De docenten geven duidelijke opties, zodat je op jouw niveau kunt bewegen.",
      },
      {
        q: "Moet ik lenig of fit zijn?",
        a: "Nee. Lenigheid is geen voorwaarde om met yoga te beginnen. Je gebruikt de lessen juist om stap voor stap soepeler, sterker en meer ontspannen te worden.",
      },
      {
        q: "Kan ik alle lessen volgen?",
        a: "Tijdens de introductieperiode kun je verschillende lessen uit het rooster proberen. Kies wat past bij jouw energie, ervaring en agenda.",
      },
      {
        q: "Wanneer gaan mijn 14 dagen in?",
        a: "Na het formulier ga je naar SportBit. Daar rond je de pas af en kies je zelf de startdatum.",
      },
      {
        q: "Zit ik daarna aan een abonnement vast?",
        a: "Nee. De introductiepas stopt automatisch na 14 dagen. Daarna beslis je zelf of en hoe je verder wilt.",
      },
    ],
    form: {
      heading: "Start jouw 14 dagen yoga voor €30",
      intro:
        "Laat je gegevens achter. Daarna ga je direct door naar SportBit om je startdatum te kiezen en je introductiepas af te ronden.",
      firstName: "Voornaam",
      lastName: "Achternaam",
      email: "E-mail",
      phone: "Telefoonnummer",
      phoneHint: "Zodat we je praktisch kunnen helpen met vragen over je proefperiode.",
      consent: "Ja, ik ontvang graag af en toe nieuws en tips van Yoga Zeeburg.",
      privacy:
        "We gebruiken je gegevens om je proefperiode te verwerken en contact hierover met je op te nemen.",
      submit: "Ja, ik wil 14 dagen yoga proberen",
      loading: "Even verwerken…",
      errors: {
        firstName: "Vul je voornaam in.",
        lastName: "Vul je achternaam in.",
        email: "Vul een geldig e-mailadres in.",
        phone: "Vul je telefoonnummer in.",
        general: `Het versturen lukte niet. Probeer het opnieuw of mail ons op ${CONTACT_EMAIL}.`,
      },
    },
    finalCta: "Ja, ik wil 14 dagen yoga proberen",
    footerAbove: "Boven CrossFit Zeeburg",
  },
  en: {
    back: "Back to website",
    backTo: "/en" as const,
    switchLabel: "NL",
    switchHref: "/trial",
    switchTitle: "Bekijk deze pagina in het Nederlands",
    eyebrow: "14 days unlimited · €30 · new students only",
    h1: "Give yourself 14 days to feel what yoga can do for you.",
    heroBody:
      "A quieter mind. A body that feels freer. Time that is genuinely yours. Try unlimited yoga for two weeks at our small studio by the water in Amsterdam East.",
    heroBullets: [
      "Try as many classes as you like",
      "Welcoming to beginners and experienced yogis",
      "Ends automatically after 14 days",
    ],
    transformEyebrow: "Maybe this is exactly what you’ve been missing",
    transformH2: "Not another thing you have to do. A moment where nothing is expected of you.",
    transformBody:
      "Your days are full enough already. Yoga doesn’t need to become another performance. It can be the hour when your mind settles, your shoulders drop and you finally notice how you actually feel.",
    benefits: [
      "Step out of your head and back into your body.",
      "Create more ease in stiff shoulders, hips and back.",
      "Recharge without having to push harder.",
      "Find a yoga rhythm that works in your real week.",
    ],
    objectionH2:
      "You don’t need to be flexible. You don’t need experience. You only need to begin.",
    objectionBody:
      "Yoga Zeeburg isn’t about perfect poses or comparing yourself with the person next to you. Our teachers offer clear, personal guidance. Choose a slower or more active class and move in the way that suits your body today.",
    objectionReassurance:
      "If your mind is busy, your body feels stiff or you have never stepped onto a yoga mat before: you are welcome.",
    howHeading: "From ‘I really should…’ to your first class.",
    steps: [
      "Leave your details.",
      "Complete your intro pass in SportBit and choose your own start date.",
      "Book different classes and discover what works for you.",
    ],
    whyHeading: "A small, personal studio where you can simply be yourself.",
    whyBody:
      "Yoga Zeeburg is located by the water in Cruquius, above CrossFit Zeeburg. Not an anonymous, crowded studio, but a calm space with small groups, approachable teachers and attention to the way you move and breathe.",
    whyPoints: [
      "Small groups",
      "Personal guidance",
      "Down-to-earth atmosphere",
      "Calm and active classes",
    ],
    offerHeading: "Fourteen days. As many classes as you like. One clear price.",
    offerBody:
      "For €30, explore different classes, teachers and times. Your intro pass ends automatically after 14 days. No hidden membership — just the chance to experience what suits you.",
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "I have never done yoga. Can I join?",
        a: "Yes. Many students start with no experience. Our teachers offer clear options so you can move at your own level.",
      },
      {
        q: "Do I need to be flexible or fit?",
        a: "No. Flexibility is not a requirement for starting yoga. The classes help you gradually become more mobile, stronger and more relaxed.",
      },
      {
        q: "Can I attend every class?",
        a: "During your intro period, you can try different classes from the schedule. Choose what suits your energy, experience and calendar.",
      },
      {
        q: "When do my 14 days start?",
        a: "After submitting the form, you’ll continue to SportBit. There you complete your pass and choose your own start date.",
      },
      {
        q: "Am I tied to a membership afterwards?",
        a: "No. The intro pass ends automatically after 14 days. You decide if and how you want to continue.",
      },
    ],
    form: {
      heading: "Start your 14 days of yoga for €30",
      intro:
        "Leave your details below. You’ll then continue to SportBit to choose your start date and complete your intro pass.",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "Phone number",
      phoneHint: "So we can help you with practical questions about your intro period.",
      consent: "Yes, I’d occasionally like to receive news and tips from Yoga Zeeburg.",
      privacy: "We use your details to process your intro pass and contact you about it.",
      submit: "Yes, I want to try 14 days of yoga",
      loading: "Processing…",
      errors: {
        firstName: "Please enter your first name.",
        lastName: "Please enter your last name.",
        email: "Please enter a valid email address.",
        phone: "Please enter your phone number.",
        general: `We couldn’t send your details. Please try again or email us at ${CONTACT_EMAIL}.`,
      },
    },
    finalCta: "Yes, I want to try 14 days of yoga",
    footerAbove: "Above CrossFit Zeeburg",
  },
} as const;

export function trialFaq(locale: Locale) {
  return COPY[locale].faq;
}

export function TrialLanding({ locale }: { locale: Locale }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader locale={locale} />
      <main>
        <Hero locale={locale} />
        <Transformation locale={locale} />
        <Objections locale={locale} />
        <HowItWorks locale={locale} />
        <WhyUs locale={locale} />
        <Faq locale={locale} />
        <FinalCta locale={locale} />
      </main>
      <LandingFooter locale={locale} />
    </div>
  );
}

function LandingHeader({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  return (
    <header className="border-b border-border/60 bg-background/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to={copy.backTo} className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary font-display text-lg text-primary-foreground">
            y
          </span>
          <span className="truncate font-display text-lg font-medium tracking-tight text-foreground">
            Yoga Zeeburg
          </span>
        </Link>
        <div className="flex items-center gap-1">
          <a
            href={copy.switchHref}
            title={copy.switchTitle}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            {copy.switchLabel}
          </a>
          <Link
            to={copy.backTo}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{copy.back}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  return (
    <section className="border-b border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground sm:text-sm">
            {copy.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {copy.h1}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {copy.heroBody}
          </p>
          <ul className="mt-6 space-y-2.5">
            {copy.heroBullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[15px] text-foreground/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
          <img
            src={TRIAL_IMAGE.url}
            alt={TRIAL_IMAGE.alt[locale]}
            width={TRIAL_IMAGE.width}
            height={TRIAL_IMAGE.height}
            loading="eager"
            fetchPriority="high"
            className="mt-8 aspect-video h-auto w-full rounded-2xl object-cover"
          />
        </div>
        <div className="lg:pt-2">
          <TrialForm locale={locale} />
        </div>
      </div>
    </section>
  );
}

type Fields = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  marketing_consent: boolean;
  honeypot: string;
};

const EMPTY: Fields = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  marketing_consent: false,
  honeypot: "",
};

function TrialForm({ locale }: { locale: Locale }) {
  const copy = COPY[locale].form;
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [general, setGeneral] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const renderedAt = useRef<string>("");

  useEffect(() => {
    renderedAt.current = new Date().toISOString();
  }, []);

  function set<K extends keyof Fields>(key: K, value: Fields[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setGeneral(null);

    const first = values.first_name.trim();
    const last = values.last_name.trim();
    const email = values.email.trim();
    const phone = values.phone.trim();

    const next: Record<string, string> = {};
    if (!first) next.first_name = copy.errors.firstName;
    if (!last) next.last_name = copy.errors.lastName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = copy.errors.email;
    if (phone.replace(/[^\d]/g, "").length < 6) next.phone = copy.errors.phone;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch(INTAKE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone,
          first_name: first,
          last_name: last,
          locale,
          marketing_consent: values.marketing_consent,
          route_path: locale === "nl" ? "/trial" : "/en/trial",
          honeypot: values.honeypot,
          rendered_at: renderedAt.current || new Date().toISOString(),
        }),
      });
      const data = res.ok ? ((await res.json().catch(() => null)) as unknown) : null;
      const ok =
        res.ok &&
        !!data &&
        typeof data === "object" &&
        (data as { ok?: unknown }).ok === true &&
        ((data as { status?: unknown }).status === "received" ||
          (data as { status?: unknown }).status === "duplicate");

      if (ok) {
        window.location.assign(SPORTBIT_URL);
        return;
      }
      setGeneral(copy.errors.general);
    } catch {
      setGeneral(copy.errors.general);
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-3 text-base text-foreground outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const labelClass = "block text-sm font-medium text-foreground";

  return (
    <div
      id={FORM_ID}
      className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:sticky lg:top-6"
    >
      <h2 className="font-display text-2xl tracking-tight text-foreground">{copy.heading}</h2>
      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{copy.intro}</p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="first_name">
              {copy.firstName}
            </label>
            <input
              id="first_name"
              name="first_name"
              autoComplete="given-name"
              required
              maxLength={100}
              className={inputClass}
              value={values.first_name}
              onChange={(e) => set("first_name", e.target.value)}
              aria-invalid={!!errors.first_name}
              aria-describedby={errors.first_name ? "first_name-error" : undefined}
            />
            {errors.first_name && (
              <p id="first_name-error" className="mt-1.5 text-sm text-destructive">
                {errors.first_name}
              </p>
            )}
          </div>
          <div>
            <label className={labelClass} htmlFor="last_name">
              {copy.lastName}
            </label>
            <input
              id="last_name"
              name="last_name"
              autoComplete="family-name"
              required
              maxLength={100}
              className={inputClass}
              value={values.last_name}
              onChange={(e) => set("last_name", e.target.value)}
              aria-invalid={!!errors.last_name}
              aria-describedby={errors.last_name ? "last_name-error" : undefined}
            />
            {errors.last_name && (
              <p id="last_name-error" className="mt-1.5 text-sm text-destructive">
                {errors.last_name}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            {copy.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={255}
            className={inputClass}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-sm text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            {copy.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={40}
            className={inputClass}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
          />
          {errors.phone ? (
            <p id="phone-error" className="mt-1.5 text-sm text-destructive">
              {errors.phone}
            </p>
          ) : (
            <p id="phone-hint" className="mt-1.5 text-sm text-muted-foreground">
              {copy.phoneHint}
            </p>
          )}
        </div>

        <label className="flex items-start gap-3 text-sm text-foreground/90">
          <input
            type="checkbox"
            name="marketing_consent"
            className="mt-0.5 h-4 w-4 rounded border-input accent-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            checked={values.marketing_consent}
            onChange={(e) => set("marketing_consent", e.target.checked)}
          />
          <span>{copy.consent}</span>
        </label>

        <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="honeypot">Honeypot</label>
          <input
            id="honeypot"
            name="honeypot"
            tabIndex={-1}
            autoComplete="off"
            value={values.honeypot}
            onChange={(e) => set("honeypot", e.target.value)}
          />
        </div>

        {general && (
          <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-foreground">
            {general}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-70"
        >
          {submitting ? copy.loading : copy.submit}
          {!submitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </button>

        <p className="text-xs leading-relaxed text-muted-foreground">{copy.privacy}</p>
      </form>
    </div>
  );
}

function Transformation({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {copy.transformEyebrow}
      </p>
      <h2 className="mt-3 font-display text-2xl leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl">
        {copy.transformH2}
      </h2>
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{copy.transformBody}</p>
      <ul className="mt-8 space-y-3">
        {copy.benefits.map((b) => (
          <li key={b} className="flex items-start gap-3 text-[17px] text-foreground/90">
            <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Objections({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  return (
    <section className="border-y border-border/60 bg-sand/60">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <h2 className="font-display text-2xl leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl">
          {copy.objectionH2}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{copy.objectionBody}</p>
        <p className="mt-6 border-l-2 border-primary/50 pl-5 text-lg leading-relaxed text-foreground">
          {copy.objectionReassurance}
        </p>
      </div>
    </section>
  );
}

function HowItWorks({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <h2 className="font-display text-2xl leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl">
        {copy.howHeading}
      </h2>
      <ol className="mt-8 space-y-6">
        {copy.steps.map((s, i) => (
          <li key={s} className="flex items-start gap-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 font-display text-base text-primary">
              {i + 1}
            </span>
            <p className="pt-1.5 text-[17px] leading-relaxed text-foreground/90">{s}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function WhyUs({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <h2 className="font-display text-2xl leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl">
          {copy.whyHeading}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{copy.whyBody}</p>
        <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
          {copy.whyPoints.map((p) => (
            <li key={p} className="flex items-center gap-2.5 text-[15px] text-foreground/90">
              <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Faq({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <h2 className="font-display text-2xl tracking-tight text-foreground sm:text-3xl">
        {copy.faqHeading}
      </h2>
      <dl className="mt-8 divide-y divide-border/70 border-y border-border/70">
        {copy.faq.map((item) => (
          <div key={item.q} className="py-6">
            <dt className="text-[17px] font-medium text-foreground">{item.q}</dt>
            <dd className="mt-2 leading-relaxed text-muted-foreground">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function FinalCta({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
        <h2 className="font-display text-2xl leading-snug tracking-tight sm:text-3xl md:text-4xl">
          {copy.offerHeading}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/85">
          {copy.offerBody}
        </p>
        <a
          href={`#${FORM_ID}`}
          className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-background px-7 py-4 text-base font-medium text-foreground shadow-sm transition-colors hover:bg-background/90"
        >
          {copy.finalCta}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function LandingFooter({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  return (
    <footer className="border-t border-border/60 bg-secondary/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <div className="font-display text-base text-foreground">Yoga Zeeburg</div>
          <address className="mt-1 not-italic">
            Cruquiusweg 96F, 1019 AH Amsterdam · {copy.footerAbove}
          </address>
        </div>
        <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground">
          {CONTACT_EMAIL}
        </a>
      </div>
    </footer>
  );
}
