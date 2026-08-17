import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { IntroPassCTA } from "@/components/site/IntroPassCTA";
import { sendContactMessage } from "@/lib/contact.functions";
import { commercialLinks } from "@/lib/i18n";

const SUBJECTS = [
  "Intro Pass",
  "Abonnementen en tarieven",
  "Lessen en rooster",
  "Vraag als huidig lid",
  "Iets anders",
] as const;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Yoga Zeeburg | Amsterdam Oost" },
      {
        name: "description",
        content:
          "Neem contact op met Yoga Zeeburg in Amsterdam Oost over de Intro Pass, abonnementen, lessen of Sportbit. We helpen je graag verder.",
      },
      { property: "og:title", content: "Contact Yoga Zeeburg | Amsterdam Oost" },
      {
        property: "og:description",
        content:
          "Neem contact op met Yoga Zeeburg in Amsterdam Oost over de Intro Pass, abonnementen, lessen, het rooster of praktische vragen.",
      },
      { property: "og:url", content: "https://www.yogazeeburg.com/contact" },
    ],
    links: commercialLinks("nl", "contact"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Yoga Zeeburg",
          url: "https://www.yogazeeburg.com/contact",
          inLanguage: "nl-NL",
          description:
            "Neem contact op met Yoga Zeeburg in Amsterdam Oost over de Intro Pass, abonnementen, lessen of Sportbit. We helpen je graag verder.",
          isPartOf: {
            "@type": "WebSite",
            name: "Yoga Zeeburg",
            url: "https://www.yogazeeburg.com/",
          },
          about: { "@type": "ExerciseGym", name: "Yoga Zeeburg", url: "https://www.yogazeeburg.com/" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.yogazeeburg.com/" },
            { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.yogazeeburg.com/contact" },
          ],
        }),
      },
    ],
  }),
  component: ContactPage,
});

type FieldErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader locale="nl" page="contact" />
      <main>
        <Hero />
        <ContactSection />
        <IntroPassCTA locale="nl" />
      </main>
      <SiteFooter locale="nl" />
    </div>
  );
}

function Hero() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">Contact</p>
        <h1 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Vragen? We helpen je graag.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Mail naar hello@yogazeeburg.com of gebruik het formulier hieronder voor vragen over de Intro
          Pass, abonnementen, lessen of het rooster.
        </p>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}

function ContactInfo() {
  return (
    <div>
      <h2 className="font-display text-3xl leading-tight tracking-tight text-foreground md:text-4xl">
        Neem contact op
      </h2>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
        Nieuw in de studio of oefen je al bij ons — gebruik het formulier of mail ons direct.
      </p>

      <div className="mt-10 space-y-8">
        <div>
          <div className="text-sm font-medium uppercase tracking-[0.14em] text-accent">E-mail</div>
          <a
            href="mailto:hello@yogazeeburg.com"
            className="mt-2 inline-block text-lg text-foreground underline-offset-4 hover:underline"
          >
            hello@yogazeeburg.com
          </a>
        </div>

        <div>
          <div className="text-sm font-medium uppercase tracking-[0.14em] text-accent">Bezoekadres</div>
          <address className="mt-2 text-base not-italic leading-relaxed text-foreground">
            Yoga Zeeburg<br />
            Cruquiusweg 96F<br />
            1019 AH Amsterdam
          </address>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Boven CrossFit Zeeburg, aan het water in Amsterdam Oost.
          </p>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const send = useServerFn(sendContactMessage);
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "", company: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    const name = values.name.trim();
    const email = values.email.trim();
    const subject = values.subject.trim();
    const message = values.message.trim();
    if (name.length < 2 || name.length > 100) e.name = "Vul je naam in (2–100 tekens).";
    if (!email || email.length > 254 || !EMAIL_RE.test(email)) e.email = "Vul een geldig e-mailadres in.";
    if (!SUBJECTS.includes(subject as (typeof SUBJECTS)[number])) e.subject = "Kies een onderwerp.";
    if (message.length < 10 || message.length > 3000)
      e.message = "Schrijf een bericht tussen de 10 en 3000 tekens.";
    return e;
  }

  function focusFirstInvalid(e: FieldErrors) {
    if (e.name) nameRef.current?.focus();
    else if (e.email) emailRef.current?.focus();
    else if (e.subject) subjectRef.current?.focus();
    else if (e.message) messageRef.current?.focus();
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (status === "sending") return;

    const eMap = validate();
    if (Object.keys(eMap).length > 0) {
      setErrors(eMap);
      focusFirstInvalid(eMap);
      return;
    }
    setErrors({});
    setErrorMessage(null);
    setStatus("sending");

    try {
      const result = await send({ data: { ...values } });
      if (result.ok) {
        setStatus("success");
      } else {
        if (result.fieldErrors) {
          setErrors(result.fieldErrors);
          focusFirstInvalid(result.fieldErrors);
        }
        setErrorMessage(result.error);
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Er ging iets mis. Probeer het opnieuw.");
      setStatus("error");
    }
  }

  function reset() {
    setValues({ name: "", email: "", subject: "", message: "", company: "" });
    setErrors({});
    setErrorMessage(null);
    setStatus("idle");
    formRef.current?.reset();
  }

  const inputBase =
    "w-full min-h-[44px] rounded-md border border-border bg-background px-4 py-2.5 text-base text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20";
  const labelCls = "block text-sm font-medium text-foreground";
  const errorCls = "mt-1.5 text-sm text-destructive";

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border/70 bg-secondary/40 p-6 sm:p-8">
        <div role="status" aria-live="polite">
          <h2 className="font-display text-2xl leading-tight tracking-tight text-foreground md:text-3xl">
            Bedankt — je bericht is verzonden.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            We nemen zo snel mogelijk contact met je op.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 inline-flex min-h-[44px] items-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Nog een bericht sturen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/70 bg-secondary/30 p-6 sm:p-8">
      <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
        {/* Honeypot */}
        <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
          <label>
            Bedrijf
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={values.company}
              onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
            />
          </label>
        </div>

        <div>
          <label htmlFor="c-name" className={labelCls}>Naam</label>
          <input
            ref={nameRef}
            id="c-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "c-name-err" : undefined}
            className={`${inputBase} mt-1.5`}
          />
          {errors.name && <p id="c-name-err" className={errorCls}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="c-email" className={labelCls}>E-mail</label>
          <input
            ref={emailRef}
            id="c-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "c-email-err" : undefined}
            className={`${inputBase} mt-1.5`}
          />
          {errors.email && <p id="c-email-err" className={errorCls}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="c-subject" className={labelCls}>Waar kunnen we je mee helpen?</label>
          <select
            ref={subjectRef}
            id="c-subject"
            name="subject"
            required
            value={values.subject}
            onChange={(e) => setValues((v) => ({ ...v, subject: e.target.value }))}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "c-subject-err" : undefined}
            className={`${inputBase} mt-1.5 ${values.subject ? "" : "text-muted-foreground"}`}
          >
            <option value="" disabled>Kies een onderwerp</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s} className="text-foreground">{s}</option>
            ))}
          </select>
          {errors.subject && <p id="c-subject-err" className={errorCls}>{errors.subject}</p>}
        </div>

        <div>
          <label htmlFor="c-message" className={labelCls}>Bericht</label>
          <textarea
            ref={messageRef}
            id="c-message"
            name="message"
            required
            rows={6}
            value={values.message}
            onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "c-message-err" : undefined}
            className={`${inputBase} mt-1.5 min-h-[9rem] resize-y`}
          />
          {errors.message && <p id="c-message-err" className={errorCls}>{errors.message}</p>}
        </div>

        {status === "error" && errorMessage && (
          <div role="alert" aria-live="assertive" className="rounded-md border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-foreground">
            Er ging iets mis. Probeer het opnieuw of mail{" "}
            <a href="mailto:hello@yogazeeburg.com" className="font-medium underline underline-offset-4">
              hello@yogazeeburg.com
            </a>{" "}
            direct.
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {status === "sending" ? "Bezig met verzenden…" : "Verstuur bericht"}
          </button>
          <p className="mt-3 text-sm text-muted-foreground">
            We gebruiken je gegevens alleen om te reageren op je bericht.
          </p>
        </div>
      </form>
    </div>
  );
}
