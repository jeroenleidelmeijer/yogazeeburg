// Pure-TS scheduler cadence for the Yoga Zeeburg kennisbank publication
// project. Mirrors the production SQL cadence exactly and is the single
// source of truth for behavior tests.
//
// Rolverdeling (July 2026):
//   Phase 1 — weeks 1..12  : monday, wednesday, friday
//   Phase 2 — weeks 13..24 : tuesday, thursday
//   Phase 3 — weeks 25+    : wednesday only
//   Hard stop after planning_number 180.
//
// The current phase is derived from calendar weeks elapsed since the
// project's `automation_start_date`, interpreted in Europe/Amsterdam.
// The DAY-of-week is likewise evaluated in Europe/Amsterdam so DST
// transitions never shift a slot into a wrong day.

export type SchedulerSlot = "monday" | "tuesday" | "wednesday" | "thursday" | "friday";
export type SchedulerPhase = "phase_1_36" | "phase_37_60" | "phase_61_180";

export const MAX_PLANNING_NUMBER = 180 as const;

const AMSTERDAM_TZ = "Europe/Amsterdam" as const;

// -- date helpers ---------------------------------------------------------

/** YYYY-MM-DD in the target timezone, using Intl. */
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

/** Day-of-week label in the target timezone. */
function weekdayInTz(at: Date, tz: string): SchedulerSlot | "saturday" | "sunday" {
  const fmt = new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "long" });
  const name = fmt.format(at).toLowerCase();
  switch (name) {
    case "monday":
      return "monday";
    case "tuesday":
      return "tuesday";
    case "wednesday":
      return "wednesday";
    case "thursday":
      return "thursday";
    case "friday":
      return "friday";
    case "saturday":
      return "saturday";
    default:
      return "sunday";
  }
}

/** UTC day index (days since 1970-01-01 in the given TZ). */
function tzDayIndex(at: Date, tz: string): number {
  const { year, month, day } = ymdInTz(at, tz);
  return Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
}

/** Elapsed calendar weeks (0-based) between two Date instants in the TZ.
 *  Week is inclusive of the start day: `weeksSince(start, start) === 0`,
 *  seven local days later returns 1, etc. */
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
  // Zero-based week index: 0..11 = phase 1, 12..23 = phase 2, 24+ = phase 3.
  if (weekIndex < 12) return "phase_1_36";
  if (weekIndex < 24) return "phase_37_60";
  return "phase_61_180";
}

export function allowedSlotsForPhase(phase: SchedulerPhase): SchedulerSlot[] {
  switch (phase) {
    case "phase_1_36":
      return ["monday", "wednesday", "friday"];
    case "phase_37_60":
      return ["tuesday", "thursday"];
    case "phase_61_180":
      return ["wednesday"];
  }
}

/**
 * Evaluate whether the given `now` instant is a legal publication slot for
 * the project. Fails closed:
 *   - `automationStartDate === null` → no_start_date
 *   - `planningNumber > 180`         → beyond_planning_end
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
  if (wk < 0) {
    return { allowed: false, reason: "no_start_date" };
  }
  const phase = phaseForWeek(wk);
  const dow = weekdayInTz(input.now, AMSTERDAM_TZ);
  const allowed = allowedSlotsForPhase(phase);
  if (dow === "saturday" || dow === "sunday") {
    return { allowed: false, reason: "wrong_day", phase, slot: null };
  }
  if (!allowed.includes(dow as SchedulerSlot)) {
    return { allowed: false, reason: "wrong_day", phase, slot: null };
  }
  return { allowed: true, phase, slot: dow as SchedulerSlot };
}
