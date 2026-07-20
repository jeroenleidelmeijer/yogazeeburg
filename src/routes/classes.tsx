import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { IntroPassCTA } from "@/components/site/IntroPassCTA";

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
      "A gentle slow flow that settles into a reclining soundbath, creating a calm and deeply relaxing end to the day.",
    matchReason:
      "A good match when you want gentle movement followed by a long, quiet landing.",
    whatToExpect: [
      "The class begins with mindful, unhurried movement connected to the breath. The slow flow gently wakes up the body before gradually moving towards stillness.",
      "You then settle into a comfortable reclining position for a soundbath using different instruments. The atmosphere is quiet and restorative, with no previous yoga experience required.",
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
      "A deeply restful class combining supported restorative poses, essential oils and optional Reiki elements, with plenty of time to slow down.",
    matchReason:
      "A good match when your priority is deep rest with minimal physical effort.",
    whatToExpect: [
      "You rest in comfortable, fully supported restorative poses for longer periods while essential oils help create a calm and nurturing atmosphere.",
      "The teacher may offer optional Reiki, which can include light physical touch. You can always choose not to be touched by letting the teacher know. No previous yoga experience is needed.",
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
      "Longer-held Yin poses, breath and stillness create space to soften tension and move from a busy head into a calmer body.",
    matchReason:
      "A good match when tension and a busy mind make it hard to switch off.",
    whatToExpect: [
      "The pace is deliberately slow. Yin poses are usually held for several minutes, with props available so you can settle into each position without forcing the stretch.",
      "Breath awareness, meditation and quiet restorative moments are woven into the class. It is suitable for different levels of mobility and yoga experience.",
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
      "Gentle Yin followed by guided Yoga Nidra: a 90-minute class for deep rest, mental quiet and a full-body pause.",
    matchReason: "A good match when you want the deepest rest on the schedule.",
    whatToExpect: [
      "The first part consists of approximately 60 minutes of gentle Yin Yoga, with soft poses held for longer periods and plenty of support from props.",
      "The final 30 minutes are dedicated to Yoga Nidra, a guided relaxation practised while lying comfortably in Shavasana. No previous yoga experience is required.",
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
      "Breathwork, long Yin stretches and a generous final relaxation, with props and options for tight or less flexible bodies.",
    matchReason:
      "A good match when stiffness or tight muscles are your main reason for coming.",
    whatToExpect: [
      "The class starts with gentle meditation and breathwork before moving into longer-held Yin poses. Straps and other props help you adjust the depth of each position.",
      "The practice is especially useful when your body often feels tight from sitting, running, strength training or other sports. It ends with a long Shavasana.",
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
      "A breath-led Vinyasa flow with aroma, mindful movement and accessible challenge to help you get out of your head and into your body.",
    matchReason:
      "A good match when you want mindful movement with enough flow to feel energised, not overwhelmed.",
    whatToExpect: [
      "Movement and breath are linked through a flowing sequence, while scent adds an extra sensory element to the practice.",
      "The class offers space to move with attention, build confidence and explore manageable challenges. Options are provided, making it accessible to beginners as well as more experienced students.",
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
      "A two-part class: mindful flow to build mobility and strength, followed by longer-held Yin poses for release and relaxation.",
    matchReason:
      "A good match when you want both active movement and a slower recovery phase.",
    whatToExpect: [
      "The first part uses mindful Vinyasa-inspired movement to develop mobility, strength and flexibility while staying connected to the breath.",
      "The second part slows down into longer-held Yin postures. This combination offers both active movement and a calm, restorative finish.",
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
      "A grounded morning flow that builds gradually into energising standing sequences before finishing with calmer, Yin-inspired postures.",
    matchReason:
      "A good match when you want to start the weekend energised but grounded.",
    whatToExpect: [
      "The class begins slowly and develops into a breath-centred Vinyasa sequence with standing poses, balanced strength and mobility.",
      "Variations and props allow you to adapt the practice to your level. The class closes with quieter, Yin-inspired postures and time to settle.",
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
      "A balanced mix of active Yang flow and slower Yin poses, combining energy, strength, flexibility and a calm finish.",
    matchReason: "A good match when you want equal parts movement and stillness.",
    whatToExpect: [
      "The practice starts with grounding movement before building into a more active Yang sequence of standing and flowing poses.",
      "The second part slows down into longer-held Yin shapes. Variations and props are available throughout, making the class accessible to different experience levels.",
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
      "An energising breath-led Vinyasa flow that builds heat, strength and confidence through stronger transitions and safe challenge.",
    matchReason:
      "A good match when you want to build heat, strength and confidence in a stronger flow.",
    whatToExpect: [
      "This is a more active Vinyasa class with fluid movement, intentional breathing and sequences designed to build heat and strength.",
      "The pace and transitions are stronger than in the gentler flow classes. Some previous experience with common yoga poses and transitions is recommended.",
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
      "A beginner-friendly blend of Pilates precision and yoga mobility, with core strength, posture work and a balanced, open finish.",
    matchReason:
      "A good match when you want core strength, posture and mobility without an advanced yoga class.",
    whatToExpect: [
      "The class combines controlled Pilates-inspired exercises with the fluidity and mobility work of yoga. After warming up, the main focus shifts towards core strength, stability and posture.",
      "The practice finishes with flexibility and mobility work. It is suitable for beginners in both Pilates and yoga.",
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
      "An energising Vinyasa practice with somatic and free movement plus breathwork to build stability while releasing tension.",
    matchReason:
      "A good match when you want a more expressive, energising practice that still helps you release tension.",
    whatToExpect: [
      "The class combines structured Vinyasa sequences with free movement, gentle shaking, somatic exercises and guided breathwork.",
      "Expect an active and expressive practice that develops strength and stability while creating room for less structured movement. Some familiarity with basic Vinyasa poses and transitions is recommended.",
    ],
  },
];

const NEED_LABELS: Record<ClassNeed, string> = {
  "calm-mind": "Calm my mind",
  "release-tension": "Release stress & tension",
  "move-energise": "Move & energise",
  "build-strength": "Build strength & stability",
  "stretch-mobility": "Stretch & move better",
  "deep-rest": "Rest deeply & switch off",
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
  gentle: "Gentle",
  balanced: "Balanced",
  dynamic: "Dynamic",
};

const EXPERIENCE_LABELS: Record<ClassExperience, string> = {
  "beginner-friendly": "Beginner-friendly",
  "all-levels": "All levels",
  "some-experience-recommended": "Some experience recommended",
};

const GROUP_LABELS: Record<ClassGroup, string> = {
  "slow-restorative": "Slow & restorative",
  "balanced-mindful": "Balanced & mindful",
  "active-strengthening": "Active & strengthening",
};

const GROUP_ORDER: ClassGroup[] = [
  "slow-restorative",
  "balanced-mindful",
  "active-strengthening",
];

type PaceChoice = ClassPace | "no-preference";

export const Route = createFileRoute("/classes")({
  head: () => ({
    meta: [
      { title: "Yoga Classes Amsterdam East | Yoga Zeeburg" },
      {
        name: "description",
        content:
          "Explore Yoga Zeeburg classes in Amsterdam East and find the right fit, from relaxing Yin and Nidra to Vinyasa, Pilates and stronger flows.",
      },
      { property: "og:title", content: "Yoga Classes Amsterdam East | Yoga Zeeburg" },
      {
        property: "og:description",
        content:
          "Explore Yoga Zeeburg classes in Amsterdam East and find the right fit, from relaxing Yin and Nidra to Vinyasa, Pilates and stronger flows.",
      },
      { property: "og:url", content: "https://www.yogazeeburg.com/classes" },
    ],
    links: [{ rel: "canonical", href: "https://www.yogazeeburg.com/classes" }],
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
      <SiteHeader />
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
        <IntroPassCTA />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
          Our classes
        </p>
        <h1 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Find the class that fits what you need.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Some days call for movement and energy. Others call for stillness and rest. Use
          the Class Finder or explore all twelve classes to find what feels right today.
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
    { value: "gentle", label: "Gentle" },
    { value: "balanced", label: "Balanced" },
    { value: "dynamic", label: "Dynamic" },
    { value: "no-preference", label: "No preference" },
  ];

  return (
    <section className="border-b border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <div className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm sm:p-8 md:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            Class finder
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground md:text-4xl">
            Start with what you need today.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Choose what you are looking for and how active you want to be. We will bring
            the strongest matches to the top while keeping every class available.
          </p>

          <div className="mt-10">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl text-foreground md:text-2xl">
                What do you need today?
              </h3>
              <span className="text-sm text-muted-foreground">Choose up to two.</span>
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
              How active do you want to be?
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
                I’m new to yoga
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
                Clear choices
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
          {isActive ? "Showing your three strongest matches." : ""}
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
                    Your best matches
                  </h2>
                  <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {top.map((c) => (
                      <ClassCard key={c.id} yogaClass={c} showMatchReason />
                    ))}
                  </div>
                  <h2 className="mt-14 font-display text-2xl text-foreground md:text-3xl">
                    Explore all classes
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
            Pace
          </dt>
          <dd className="mt-1 text-foreground">{PACE_LABELS[yogaClass.pace]}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Good for
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
            Experience
          </dt>
          <dd className="mt-1 text-foreground">
            {EXPERIENCE_LABELS[yogaClass.experience]}
          </dd>
        </div>
      </dl>

      <details className="group mt-5 border-t border-border/50 pt-4">
        <summary className="cursor-pointer list-none text-sm font-medium text-foreground underline-offset-4 hover:underline [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">What to expect</span>
          <span className="hidden group-open:inline">Hide details</span>
        </summary>
        <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
          <p>{yogaClass.whatToExpect[0]}</p>
          <p>{yogaClass.whatToExpect[1]}</p>
        </div>
      </details>

      <div className="mt-5 pt-1">
        <Link
          to="/schedule"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          View weekly schedule
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
          Ready to practise?
        </p>
        <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground md:text-4xl">
          Found a class that suits you?
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          See when your chosen class is on the schedule and find a moment that fits your
          week.
        </p>
        <Link
          to="/schedule"
          className="mt-6 inline-flex items-center gap-1.5 text-base font-medium text-foreground underline-offset-4 hover:underline"
        >
          View the weekly schedule
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
