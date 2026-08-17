import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { IntroPassCTA } from "@/components/site/IntroPassCTA";
import { commercialLinks } from "@/lib/i18n";

type ClassPace = "gentle" | "balanced" | "dynamic";
type ClassExperience =
  | "beginner-friendly"
  | "all-levels"
  | "some-experience-recommended";
type ClassNeed =
  | "calm-mind"
  | "release-tension"
  | "move-energise"
  | "build-strength"
  | "stretch-mobility"
  | "deep-rest";
type ClassGroup =
  | "slow-restorative"
  | "balanced-mindful"
  | "active-strengthening";

type YogaClass = {
  id: string;
  name: string;
  group: ClassGroup;
  pace: ClassPace;
  experience: ClassExperience;
  needs: ClassNeed[];
  shortDescription: string;
  whatToExpect: [string, string];
  matchReason: string;
  order: number;
};

const CLASSES: YogaClass[] = [
  {
    id: "slow-flow-soundbath",
    name: "Slow Flow & Soundbath",
    group: "slow-restorative",
    pace: "gentle",
    experience: "beginner-friendly",
    needs: ["calm-mind", "release-tension", "deep-rest"],
    order: 1,
    shortDescription:
      "Een zachte slow flow die overgaat in een liggende soundbath, voor een rustige en diep ontspannende afsluiting van de dag.",
    matchReason:
      "Fijn als je op zoek bent naar zachte beweging, gevolgd door een lange, stille landing.",
    whatToExpect: [
      "De les begint met aandachtige, ongehaaste beweging die verbonden is met de adem. De slow flow maakt het lichaam langzaam wakker en beweegt geleidelijk richting stilte.",
      "Daarna ga je liggend in een comfortabele houding voor een soundbath met verschillende instrumenten. De sfeer is rustig en herstellend, er is geen yoga-ervaring nodig.",
    ],
  },
  {
    id: "restorative-reiki-aroma",
    name: "Restorative & Reiki & Aroma",
    group: "slow-restorative",
    pace: "gentle",
    experience: "beginner-friendly",
    needs: ["deep-rest", "calm-mind", "release-tension"],
    order: 2,
    shortDescription:
      "Een diep ontspannende les met ondersteunde restorative houdingen, etherische oliën en optioneel Reiki, met alle tijd om te vertragen.",
    matchReason:
      "Fijn als diepe rust met minimale fysieke inspanning je grootste prioriteit is.",
    whatToExpect: [
      "Je rust langere tijd in comfortabele, volledig ondersteunde restorative houdingen, terwijl etherische oliën zorgen voor een rustige, koesterende sfeer.",
      "De docent kan optioneel Reiki aanbieden, wat licht fysiek contact kan inhouden. Je kunt altijd aangeven dat je liever niet wordt aangeraakt. Geen yoga-ervaring nodig.",
    ],
  },
  {
    id: "stress-release-yin",
    name: "Stress Release (Yin style)",
    group: "slow-restorative",
    pace: "gentle",
    experience: "beginner-friendly",
    needs: ["release-tension", "calm-mind", "stretch-mobility"],
    order: 3,
    shortDescription:
      "Langer aangehouden Yin houdingen, adem en stilte geven ruimte om spanning los te laten en van een druk hoofd naar een rustiger lichaam te gaan.",
    matchReason:
      "Fijn als spanning en een druk hoofd het moeilijk maken om te schakelen.",
    whatToExpect: [
      "Het tempo is bewust laag. Yin houdingen worden meestal enkele minuten aangehouden, met props zodat je in elke positie kunt zakken zonder de rek te forceren.",
      "Ademwerk, meditatie en rustige, herstellende momenten zijn door de les heen verweven. Geschikt voor verschillende niveaus van lenigheid en yoga-ervaring.",
    ],
  },
  {
    id: "relax-yin-nidra",
    name: "Relax Yin & Nidra",
    group: "slow-restorative",
    pace: "gentle",
    experience: "beginner-friendly",
    needs: ["deep-rest", "calm-mind", "release-tension"],
    order: 4,
    shortDescription:
      "Zachte Yin gevolgd door begeleide Yoga Nidra: een les van 90 minuten voor diepe rust, een stille geest en een volledige pauze voor lichaam en geest.",
    matchReason: "Fijn als je de diepste rust op het rooster zoekt.",
    whatToExpect: [
      "Het eerste deel bestaat uit ongeveer 60 minuten zachte Yin Yoga, met zachte houdingen die langer worden aangehouden en veel ondersteuning van props.",
      "De laatste 30 minuten zijn gewijd aan Yoga Nidra, een begeleide ontspanning die je liggend en comfortabel in Shavasana beoefent. Geen yoga-ervaring vereist.",
    ],
  },
  {
    id: "deep-stretch-yin-breathwork",
    name: "Deep Stretch Yin & Breathwork",
    group: "slow-restorative",
    pace: "gentle",
    experience: "beginner-friendly",
    needs: ["stretch-mobility", "release-tension", "calm-mind"],
    order: 5,
    shortDescription:
      "Ademwerk, lange Yin stretches en een uitgebreide eindontspanning, met props en opties voor stijve of minder lenige lichamen.",
    matchReason:
      "Fijn als stijfheid of gespannen spieren jouw belangrijkste reden zijn om te komen.",
    whatToExpect: [
      "De les begint met zachte meditatie en ademwerk, gevolgd door langer aangehouden Yin houdingen. Riemen en andere props helpen je de diepte van elke positie aan te passen.",
      "De les is vooral fijn als je lichaam vaak stijf aanvoelt door zitten, hardlopen, krachttraining of andere sporten. Ze eindigt met een lange Shavasana.",
    ],
  },
  {
    id: "vinyasa-aroma",
    name: "Vinyasa & Aroma",
    group: "balanced-mindful",
    pace: "balanced",
    experience: "beginner-friendly",
    needs: ["move-energise", "calm-mind", "stretch-mobility"],
    order: 6,
    shortDescription:
      "Een op de adem gerichte Vinyasa flow met aroma, aandachtige beweging en een toegankelijke uitdaging om uit je hoofd en in je lichaam te komen.",
    matchReason:
      "Fijn als je aandachtige beweging zoekt met genoeg flow om je energiek te voelen, zonder overweldigd te raken.",
    whatToExpect: [
      "Beweging en adem worden verbonden in een vloeiende opeenvolging, terwijl geur een extra zintuiglijk element aan de les toevoegt.",
      "De les biedt ruimte om met aandacht te bewegen, zelfvertrouwen op te bouwen en behapbare uitdagingen te verkennen. Er zijn opties, waardoor de les toegankelijk is voor beginners én ervaren leerlingen.",
    ],
  },
  {
    id: "strength-stretch-yoga",
    name: "Strength & Stretch Yoga",
    group: "balanced-mindful",
    pace: "balanced",
    experience: "all-levels",
    needs: ["build-strength", "stretch-mobility", "release-tension"],
    order: 7,
    shortDescription:
      "Een les in twee delen: een aandachtige flow voor mobiliteit en kracht, gevolgd door langer aangehouden Yin houdingen om los te laten en te ontspannen.",
    matchReason:
      "Fijn als je zowel actieve beweging als een rustiger herstelmoment wilt.",
    whatToExpect: [
      "Het eerste deel gebruikt aandachtige, op Vinyasa geïnspireerde beweging om mobiliteit, kracht en lenigheid te ontwikkelen, terwijl je verbonden blijft met de adem.",
      "Het tweede deel vertraagt naar langer aangehouden Yin houdingen. Deze combinatie biedt zowel actieve beweging als een rustige, herstellende afsluiting.",
    ],
  },
  {
    id: "weekend-warm-up-flow",
    name: "Weekend Warm-up Flow",
    group: "balanced-mindful",
    pace: "balanced",
    experience: "all-levels",
    needs: ["move-energise", "stretch-mobility", "calm-mind"],
    order: 8,
    shortDescription:
      "Een geaarde ochtendflow die geleidelijk opbouwt naar energieke staande reeksen, om af te sluiten met rustigere, Yin-geïnspireerde houdingen.",
    matchReason:
      "Fijn als je het weekend energiek maar geaard wilt beginnen.",
    whatToExpect: [
      "De les begint langzaam en ontwikkelt zich tot een op de adem gerichte Vinyasa reeks met staande houdingen, in balans tussen kracht en mobiliteit.",
      "Variaties en props laten je de les op je eigen niveau aanpassen. De les sluit af met rustigere, Yin-geïnspireerde houdingen en tijd om te landen.",
    ],
  },
  {
    id: "yin-yang-yoga",
    name: "Yin Yang Yoga",
    group: "balanced-mindful",
    pace: "balanced",
    experience: "all-levels",
    needs: ["move-energise", "calm-mind", "stretch-mobility"],
    order: 9,
    shortDescription:
      "Een uitgebalanceerde mix van actieve Yang flow en langzamere Yin houdingen, met energie, kracht, lenigheid en een rustige afsluiting.",
    matchReason: "Fijn als je evenveel beweging als stilte wilt.",
    whatToExpect: [
      "De les begint met aardende beweging voordat ze opbouwt naar een actievere Yang reeks van staande en vloeiende houdingen.",
      "Het tweede deel vertraagt naar langer aangehouden Yin vormen. Variaties en props zijn steeds beschikbaar, waardoor de les toegankelijk is voor verschillende ervaringsniveaus.",
    ],
  },
  {
    id: "strong-flow",
    name: "Strong Flow",
    group: "active-strengthening",
    pace: "dynamic",
    experience: "some-experience-recommended",
    needs: ["move-energise", "build-strength", "stretch-mobility"],
    order: 10,
    shortDescription:
      "Een energieke, op de adem gerichte Vinyasa flow die warmte, kracht en zelfvertrouwen opbouwt met stevigere overgangen en veilige uitdagingen.",
    matchReason:
      "Fijn als je warmte, kracht en zelfvertrouwen wilt opbouwen in een stevigere flow.",
    whatToExpect: [
      "Dit is een actievere Vinyasa les met vloeiende beweging, bewuste ademhaling en reeksen die warmte en kracht opbouwen.",
      "Het tempo en de overgangen zijn steviger dan bij de zachtere flowlessen. Enige ervaring met gangbare yogahoudingen en overgangen wordt aangeraden.",
    ],
  },
  {
    id: "pilates-fusion",
    name: "Pilates Fusion",
    group: "active-strengthening",
    pace: "balanced",
    experience: "beginner-friendly",
    needs: ["build-strength", "stretch-mobility", "move-energise"],
    order: 11,
    shortDescription:
      "Een beginnersvriendelijke mix van Pilates-precisie en yoga-mobiliteit, met kernkracht, houdingswerk en een gebalanceerde, open afsluiting.",
    matchReason:
      "Fijn als je kernkracht, houding en mobiliteit wilt zonder een gevorderde yogales.",
    whatToExpect: [
      "De les combineert gecontroleerde, op Pilates geïnspireerde oefeningen met de vloeiendheid en het mobiliteitswerk van yoga. Na het opwarmen verschuift de focus naar kernkracht, stabiliteit en houding.",
      "De les eindigt met lenigheid en mobiliteitswerk. Geschikt voor beginners in zowel Pilates als yoga.",
    ],
  },
  {
    id: "vinyasa-somatic-movement",
    name: "Vinyasa + Somatic Movement",
    group: "active-strengthening",
    pace: "dynamic",
    experience: "some-experience-recommended",
    needs: ["move-energise", "release-tension", "build-strength"],
    order: 12,
    shortDescription:
      "Een energieke Vinyasa-beoefening met somatische en vrije beweging plus ademwerk, om stabiliteit op te bouwen en spanning los te laten.",
    matchReason:
      "Fijn als je een meer expressieve, energieke beoefening zoekt die je toch helpt spanning los te laten.",
    whatToExpect: [
      "De les combineert gestructureerde Vinyasa reeksen met vrije beweging, zachte shaking, somatische oefeningen en begeleid ademwerk.",
      "Verwacht een actieve en expressieve beoefening die kracht en stabiliteit ontwikkelt en tegelijk ruimte biedt voor minder gestructureerde beweging. Enige bekendheid met basale Vinyasa-houdingen en overgangen wordt aangeraden.",
    ],
  },
];

const NEED_LABELS: Record<ClassNeed, string> = {
  "calm-mind": "Mijn hoofd tot rust brengen",
  "release-tension": "Stress & spanning loslaten",
  "move-energise": "Bewegen & energie opdoen",
  "build-strength": "Kracht & stabiliteit opbouwen",
  "stretch-mobility": "Rekken & soepeler bewegen",
  "deep-rest": "Diep uitrusten & afschakelen",
};

const NEED_ORDER: ClassNeed[] = [
  "calm-mind",
  "release-tension",
  "move-energise",
  "build-strength",
  "stretch-mobility",
  "deep-rest",
];

const PACE_LABELS: Record<ClassPace, string> = {
  gentle: "Zacht",
  balanced: "Gebalanceerd",
  dynamic: "Dynamisch",
};

const EXPERIENCE_LABELS: Record<ClassExperience, string> = {
  "beginner-friendly": "Beginnersvriendelijk",
  "all-levels": "Alle niveaus",
  "some-experience-recommended": "Enige ervaring aangeraden",
};

const GROUP_LABELS: Record<ClassGroup, string> = {
  "slow-restorative": "Langzaam & herstellend",
  "balanced-mindful": "Gebalanceerd & aandachtig",
  "active-strengthening": "Actief & versterkend",
};

const GROUP_ORDER: ClassGroup[] = [
  "slow-restorative",
  "balanced-mindful",
  "active-strengthening",
];

type PaceChoice = ClassPace | "no-preference";

export const Route = createFileRoute("/lessen")({
  head: () => ({
    meta: [
      { title: "Yogalessen Amsterdam Oost | Yoga Zeeburg" },
      {
        name: "description",
        content:
          "Ontdek de lessen van Yoga Zeeburg in Amsterdam Oost en vind wat bij je past, van ontspannen Yin en Nidra tot Vinyasa, Pilates en stevigere flows.",
      },
      { property: "og:title", content: "Yogalessen Amsterdam Oost | Yoga Zeeburg" },
      {
        property: "og:description",
        content:
          "Ontdek de lessen van Yoga Zeeburg in Amsterdam Oost en vind wat bij je past, van ontspannen Yin en Nidra tot Vinyasa, Pilates en stevigere flows.",
      },
      { property: "og:url", content: "https://www.yogazeeburg.com/lessen" },
    ],
    links: commercialLinks("nl", "classes"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Yogalessen Amsterdam Oost",
          url: "https://www.yogazeeburg.com/lessen",
          inLanguage: "nl-NL",
          description:
            "Ontdek de lessen van Yoga Zeeburg in Amsterdam Oost en vind wat bij je past, van ontspannen Yin en Nidra tot Vinyasa, Pilates en stevigere flows.",
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
            { "@type": "ListItem", position: 2, name: "Lessen", item: "https://www.yogazeeburg.com/lessen" },
          ],
        }),
      },
    ],
  }),
  component: ClassesPage,
});

function isAdjacentPace(a: ClassPace, b: ClassPace): boolean {
  if (a === b) return false;
  const pairs: Array<[ClassPace, ClassPace]> = [
    ["gentle", "balanced"],
    ["balanced", "dynamic"],
  ];
  return pairs.some(
    ([x, y]) => (a === x && b === y) || (a === y && b === x),
  );
}

function scoreClass(
  c: YogaClass,
  needs: ClassNeed[],
  pace: PaceChoice,
  beginner: boolean,
): number {
  let s = 0;
  for (const n of needs) {
    if (c.needs.includes(n)) s += 4;
  }
  if (pace !== "no-preference") {
    if (c.pace === pace) s += 3;
    else if (isAdjacentPace(c.pace, pace)) s += 1;
  }
  if (beginner) {
    if (c.experience === "beginner-friendly") s += 2;
    else if (c.experience === "all-levels") s += 1;
  }
  return s;
}

function ClassesPage() {
  const [needs, setNeeds] = useState<ClassNeed[]>([]);
  const [pace, setPace] = useState<PaceChoice>("no-preference");
  const [beginner, setBeginner] = useState(false);

  const isActive =
    needs.length > 0 || pace !== "no-preference" || beginner;

  const ranked = useMemo(() => {
    if (!isActive) return null;
    const scored = CLASSES.map((c) => ({
      c,
      score: scoreClass(c, needs, pace, beginner),
    }));
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.c.order - b.c.order;
    });
    return scored.map((s) => s.c);
  }, [needs, pace, beginner, isActive]);

  const toggleNeed = (n: ClassNeed) => {
    setNeeds((prev) => {
      if (prev.includes(n)) return prev.filter((x) => x !== n);
      if (prev.length >= 2) return prev;
      return [...prev, n];
    });
  };

  const clearAll = () => {
    setNeeds([]);
    setPace("no-preference");
    setBeginner(false);
  };

  const showClear = isActive;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader locale="nl" page="classes" />
      <main>
        <Hero />
        <ClassFinder
          needs={needs}
          pace={pace}
          beginner={beginner}
          onToggleNeed={toggleNeed}
          onSetPace={setPace}
          onToggleBeginner={() => setBeginner((v) => !v)}
          onClear={clearAll}
          showClear={showClear}
        />
        <ClassResults ranked={ranked} />
        <ScheduleLink />
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
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
          Onze lessen
        </p>
        <h1 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Vind de les die bij jou past.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Yoga Zeeburg biedt twaalf wekelijkse lessen in Amsterdam Oost, van diep ontspannende
          Yin en Nidra tot gebalanceerde Vinyasa, Pilates Fusion en stevigere flows. De meeste
          lessen zijn beginnersvriendelijk. Gebruik de Lesfinder hieronder om te zien wat
          vandaag bij je past.
        </p>
      </div>
    </section>
  );
}

type FinderProps = {
  needs: ClassNeed[];
  pace: PaceChoice;
  beginner: boolean;
  onToggleNeed: (n: ClassNeed) => void;
  onSetPace: (p: PaceChoice) => void;
  onToggleBeginner: () => void;
  onClear: () => void;
  showClear: boolean;
};

function ClassFinder({
  needs,
  pace,
  beginner,
  onToggleNeed,
  onSetPace,
  onToggleBeginner,
  onClear,
  showClear,
}: FinderProps) {
  const twoSelected = needs.length >= 2;
  const paceOptions: Array<{ value: PaceChoice; label: string }> = [
    { value: "gentle", label: "Zacht" },
    { value: "balanced", label: "Gebalanceerd" },
    { value: "dynamic", label: "Dynamisch" },
    { value: "no-preference", label: "Geen voorkeur" },
  ];

  return (
    <section className="border-b border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <div className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm sm:p-8 md:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            Lesfinder
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground md:text-4xl">
            Begin bij wat je vandaag nodig hebt.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Kies waar je naar op zoek bent en hoe actief je wilt zijn. Wij zetten de beste
            matches bovenaan, terwijl elke les beschikbaar blijft.
          </p>

          <div className="mt-10">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl text-foreground md:text-2xl">
                Wat heb je vandaag nodig?
              </h3>
              <span className="text-sm text-muted-foreground">Kies maximaal twee.</span>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {NEED_ORDER.map((n) => {
                const selected = needs.includes(n);
                const disabled = !selected && twoSelected;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => onToggleNeed(n)}
                    aria-pressed={selected}
                    aria-disabled={disabled}
                    disabled={disabled}
                    className={[
                      "min-h-[44px] rounded-full border px-5 py-3 text-left text-[15px] transition-colors",
                      selected
                        ? "border-primary bg-primary/10 font-medium text-foreground"
                        : "border-border/70 bg-background text-foreground/85 hover:bg-muted",
                      disabled ? "cursor-not-allowed opacity-50 hover:bg-background" : "",
                    ].join(" ")}
                  >
                    {NEED_LABELS[n]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="font-display text-xl text-foreground md:text-2xl">
              Hoe actief wil je zijn?
            </h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {paceOptions.map((opt) => {
                const selected = pace === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onSetPace(opt.value)}
                    aria-pressed={selected}
                    className={[
                      "min-h-[44px] rounded-full border px-5 py-3 text-[15px] transition-colors",
                      selected
                        ? "border-primary bg-primary/10 font-medium text-foreground"
                        : "border-border/70 bg-background text-foreground/85 hover:bg-muted",
                    ].join(" ")}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-5">
              <button
                type="button"
                onClick={onToggleBeginner}
                aria-pressed={beginner}
                className={[
                  "min-h-[44px] rounded-full border px-5 py-2.5 text-sm transition-colors",
                  beginner
                    ? "border-primary bg-primary/10 font-medium text-foreground"
                    : "border-border/70 bg-background text-foreground/80 hover:bg-muted",
                ].join(" ")}
              >
                Ik ben nieuw met yoga
              </button>
            </div>
          </div>

          {showClear && (
            <div className="mt-8">
              <button
                type="button"
                onClick={onClear}
                className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                Keuzes wissen
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ClassResults({ ranked }: { ranked: YogaClass[] | null }) {
  const isActive = ranked !== null;

  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div aria-live="polite" className="sr-only">
          {isActive ? "De drie sterkste matches worden getoond." : ""}
        </div>

        {!isActive
          ? GROUP_ORDER.map((g) => {
              const items = CLASSES.filter((c) => c.group === g).sort(
                (a, b) => a.order - b.order,
              );
              return (
                <div key={g} className="mb-14 last:mb-0">
                  <h2 className="font-display text-2xl text-foreground md:text-3xl">
                    {GROUP_LABELS[g]}
                  </h2>
                  <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((c) => (
                      <ClassCard key={c.id} yogaClass={c} showMatchReason={false} />
                    ))}
                  </div>
                </div>
              );
            })
          : (() => {
              const top = ranked!.slice(0, 3);
              const rest = ranked!.slice(3);
              return (
                <>
                  <h2 className="font-display text-2xl text-foreground md:text-3xl">
                    Jouw beste matches
                  </h2>
                  <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {top.map((c) => (
                      <ClassCard key={c.id} yogaClass={c} showMatchReason />
                    ))}
                  </div>
                  <h2 className="mt-14 font-display text-2xl text-foreground md:text-3xl">
                    Ontdek alle lessen
                  </h2>
                  <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {rest.map((c) => (
                      <ClassCard key={c.id} yogaClass={c} showMatchReason={false} />
                    ))}
                  </div>
                </>
              );
            })()}
      </div>
    </section>
  );
}

function ClassCard({
  yogaClass,
  showMatchReason,
}: {
  yogaClass: YogaClass;
  showMatchReason: boolean;
}) {
  const goodFor = yogaClass.needs.slice(0, 3);
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border/60 bg-background p-6 motion-safe:transition-opacity">
      <h3 className="font-display text-xl text-foreground md:text-2xl">
        {yogaClass.name}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
        {yogaClass.shortDescription}
      </p>

      {showMatchReason && (
        <p className="mt-4 border-l-2 border-primary/60 pl-3 text-sm italic leading-relaxed text-foreground/85">
          {yogaClass.matchReason}
        </p>
      )}

      <dl className="mt-5 space-y-3 text-sm">
        <div>
          <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Tempo
          </dt>
          <dd className="mt-1 text-foreground">{PACE_LABELS[yogaClass.pace]}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Goed voor
          </dt>
          <dd className="mt-1 flex flex-wrap gap-1.5">
            {goodFor.map((n) => (
              <span
                key={n}
                className="rounded-full border border-border/60 bg-secondary/50 px-2.5 py-1 text-[13px] text-foreground/85"
              >
                {NEED_LABELS[n]}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Ervaring
          </dt>
          <dd className="mt-1 text-foreground">
            {EXPERIENCE_LABELS[yogaClass.experience]}
          </dd>
        </div>
      </dl>

      <details className="group mt-5 border-t border-border/50 pt-4">
        <summary className="cursor-pointer list-none text-sm font-medium text-foreground underline-offset-4 hover:underline [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">Wat je kunt verwachten</span>
          <span className="hidden group-open:inline">Verberg details</span>
        </summary>
        <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
          <p>{yogaClass.whatToExpect[0]}</p>
          <p>{yogaClass.whatToExpect[1]}</p>
        </div>
      </details>

      <div className="mt-5 pt-1">
        <Link
          to="/rooster"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          Bekijk het weekrooster
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function ScheduleLink() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
          Klaar om te beoefenen?
        </p>
        <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground md:text-4xl">
          Een les gevonden die bij je past?
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          De makkelijkste manier om te proberen is de 14-daagse Onbeperkte Introductiepas: 14
          dagen onbeperkt lessen volgen, zodat je verschillende lessen, docenten en tijden kunt
          uitproberen voordat je je vastlegt.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="/trial"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Start met 14 dagen onbeperkt
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/rooster"
            className="inline-flex items-center gap-1.5 text-base font-medium text-foreground underline-offset-4 hover:underline"
          >
            Bekijk het weekrooster
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
