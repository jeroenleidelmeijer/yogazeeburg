// Pure-TS scheduler cadence for the Yoga Zeeburg kennisbank publication
// project. Mirrors the production SQL cadence and is the single source of
// truth for behavior tests.
//
// Rolverdeling (July 2026, vereenvoudigd):
//   Phase 1 — weeks 1..12  : monday, wednesday, friday   (3x/week)
//   Phase 2 — weeks 13..24 : monday, wednesday           (2x/week)
//   Phase 3 — weeks 25+    : monday                      (1x/week)
//   Hard stop after planning_number 180.
//
// The current phase is derived from calendar weeks elapsed since the
// project's `automation_start_date`, interpreted in Europe/Amsterdam.
// The DAY-of-week is likewise evaluated in Europe/Amsterdam so DST
// transitions never shift a slot into a wrong day.

export type SchedulerSlot = "monday" | "wednesday" | "friday";
export type SchedulerPhase = "phase_1_36" | "phase_37_60" | "phase_61_180";

export const MAX_PLANNING_NUMBER = 180 as const;

const AMSTERDAM_TZ = "Europe/Amsterdam" as const;

type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

// -- date helpers ---------------------------------------------------------

function ymdInTz(at: Date, tz: string): { year: number; month: number; day: number } {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = fmt.formatToParts(at);
  const year = Number(parts.find((p) => p.type === "year")?.value);
  const month = Number(parts.find((p) => p.type === "month")?.value);
  const day = Number(parts.find((p) => p.type === "day")?.value);
  return { year, month, day };
}

function weekdayInTz(at: Date, tz: string): Weekday {
  const fmt = new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "long" });
  return fmt.format(at).toLowerCase() as Weekday;
}

function tzDayIndex(at: Date, tz: string): number {
  const { year, month, day } = ymdInTz(at, tz);
  return Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
}

/** Elapsed calendar weeks (0-based) between two Date instants in the TZ. */
export function weeksSince(start: Date, at: Date, tz: string = AMSTERDAM_TZ): number {
  const dStart = tzDayIndex(start, tz);
  const dAt = tzDayIndex(at, tz);
  if (dAt < dStart) return -1;
  return Math.floor((dAt - dStart) / 7);
}

// -- cadence --------------------------------------------------------------

export interface CadenceInput {
  automationStartDate: Date | null;
  now: Date;
  planningNumber: number;
}

export type CadenceDecision =
  | { allowed: false; reason: "no_start_date" }
  | { allowed: false; reason: "beyond_planning_end" }
  | { allowed: false; reason: "wrong_day"; phase: SchedulerPhase; slot: SchedulerSlot | null }
  | { allowed: true; phase: SchedulerPhase; slot: SchedulerSlot };

export function phaseForWeek(weekIndex: number): SchedulerPhase {
  if (weekIndex < 12) return "phase_1_36";
  if (weekIndex < 24) return "phase_37_60";
  return "phase_61_180";
}

export function allowedSlotsForPhase(phase: SchedulerPhase): SchedulerSlot[] {
  switch (phase) {
    case "phase_1_36":
      return ["monday", "wednesday", "friday"];
    case "phase_37_60":
      return ["monday", "wednesday"];
    case "phase_61_180":
      return ["monday"];
  }
}

/**
 * Fails closed:
 *   - `planningNumber > 180`         → beyond_planning_end
 *   - `automationStartDate === null` → no_start_date
 *   - Amsterdam weekday not in allowedSlotsForPhase → wrong_day
 */
export function evaluateCadence(input: CadenceInput): CadenceDecision {
  if (input.planningNumber > MAX_PLANNING_NUMBER) {
    return { allowed: false, reason: "beyond_planning_end" };
  }
  if (input.automationStartDate == null) {
    return { allowed: false, reason: "no_start_date" };
  }
  const wk = weeksSince(input.automationStartDate, input.now, AMSTERDAM_TZ);
  if (wk < 0) return { allowed: false, reason: "no_start_date" };
  const phase = phaseForWeek(wk);
  const dow = weekdayInTz(input.now, AMSTERDAM_TZ);
  const allowed = allowedSlotsForPhase(phase);
  const isSlot = (v: Weekday): v is SchedulerSlot =>
    v === "monday" || v === "wednesday" || v === "friday";
  if (!isSlot(dow) || !allowed.includes(dow)) {
    return { allowed: false, reason: "wrong_day", phase, slot: null };
  }
  return { allowed: true, phase, slot: dow };
}

// -- forward projection ---------------------------------------------------

const WEEKDAY_NAMES: Weekday[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

/** Calendar date (Europe/Amsterdam) as YYYY-MM-DD. */
function toYmdString(dayIndex: number): string {
  const d = new Date(dayIndex * 86_400_000);
  return d.toISOString().slice(0, 10);
}

/**
 * Projects the next `count` publication dates (Europe/Amsterdam, YYYY-MM-DD),
 * starting from the first cadence slot on or after `now`.
 *
 * When `automationStartDate` is null the phase window is anchored on `now`,
 * so projection falls back to the phase-1 rhythm (monday/wednesday/friday).
 */
export function projectUpcomingSlotDates(
  count: number,
  now: Date,
  automationStartDate: Date | null = null,
): string[] {
  if (count <= 0) return [];
  const anchor = automationStartDate ?? now;
  const startDay = tzDayIndex(now, AMSTERDAM_TZ);
  const anchorDay = tzDayIndex(anchor, AMSTERDAM_TZ);
  const out: string[] = [];
  for (let day = startDay; out.length < count && day < startDay + 3650; day += 1) {
    const weekIndex = day >= anchorDay ? Math.floor((day - anchorDay) / 7) : -1;
    if (weekIndex < 0) continue;
    const allowed = allowedSlotsForPhase(phaseForWeek(weekIndex));
    const dow = WEEKDAY_NAMES[new Date(day * 86_400_000).getUTCDay()]!;
    if ((allowed as Weekday[]).includes(dow)) out.push(toYmdString(day));
  }
  return out;
}
