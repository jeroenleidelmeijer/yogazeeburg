// Behavior tests for the pure-TS scheduler cadence mirror.
// These lock the phase model + weekday matrix in Europe/Amsterdam.
// Rhythm 3→2→1:
//   Phase 1 (week 0..11) : monday, wednesday, friday
//   Phase 2 (week 12..23): monday, wednesday
//   Phase 3 (week 24+)   : monday
//   Hard stop after planning 180.
import { describe, it, expect } from "vitest";
import {
  allowedSlotsForPhase,
  evaluateCadence,
  phaseForWeek,
  weeksSince,
  MAX_PLANNING_NUMBER,
} from "@/lib/publications/scheduler/cadence";

const START = new Date("2026-09-07T00:00:00Z"); // Monday in Amsterdam.

describe("phaseForWeek", () => {
  it("weeks 0..11 are phase_1_36", () => {
    for (const w of [0, 1, 6, 11]) expect(phaseForWeek(w)).toBe("phase_1_36");
  });
  it("weeks 12..23 are phase_37_60", () => {
    for (const w of [12, 15, 23]) expect(phaseForWeek(w)).toBe("phase_37_60");
  });
  it("weeks 24+ are phase_61_180", () => {
    for (const w of [24, 40, 150]) expect(phaseForWeek(w)).toBe("phase_61_180");
  });
});

describe("allowedSlotsForPhase (rhythm 3→2→1)", () => {
  it("phase_1_36 → ma/wo/vr", () => {
    expect(allowedSlotsForPhase("phase_1_36")).toEqual(["monday", "wednesday", "friday"]);
  });
  it("phase_37_60 → ma/wo", () => {
    expect(allowedSlotsForPhase("phase_37_60")).toEqual(["monday", "wednesday"]);
  });
  it("phase_61_180 → alleen ma", () => {
    expect(allowedSlotsForPhase("phase_61_180")).toEqual(["monday"]);
  });
});

describe("weeksSince (Europe/Amsterdam)", () => {
  it("returns 0 on the same day", () => {
    expect(weeksSince(START, START)).toBe(0);
  });
  it("returns 1 exactly seven local days later", () => {
    const later = new Date("2026-09-14T10:00:00Z"); // next Mon
    expect(weeksSince(START, later)).toBe(1);
  });
  it("does not roll over a day early across DST end (Oct)", () => {
    const later = new Date("2026-10-26T08:00:00Z");
    expect(weeksSince(START, later)).toBe(7);
  });
});

describe("evaluateCadence", () => {
  it("no start date → fail_closed", () => {
    expect(
      evaluateCadence({
        automationStartDate: null,
        now: new Date("2026-09-09T10:00:00Z"),
        planningNumber: 6,
      }),
    ).toEqual({ allowed: false, reason: "no_start_date" });
  });

  it("planningNumber > 180 → beyond_planning_end (hard stop)", () => {
    expect(
      evaluateCadence({
        automationStartDate: START,
        now: new Date("2027-03-01T10:00:00Z"),
        planningNumber: MAX_PLANNING_NUMBER + 1,
      }),
    ).toEqual({ allowed: false, reason: "beyond_planning_end" });
  });

  it("planningNumber === 180 is still within scope (allowed on a legal day)", () => {
    // 24 weeks * 7 days after START = Mon 2027-02-22; phase 3 monday.
    const r = evaluateCadence({
      automationStartDate: START,
      now: new Date("2027-02-22T09:00:00Z"),
      planningNumber: MAX_PLANNING_NUMBER,
    });
    expect(r).toMatchObject({ allowed: true, phase: "phase_61_180", slot: "monday" });
  });

  it("phase 1 monday → allowed", () => {
    const r = evaluateCadence({
      automationStartDate: START,
      now: new Date("2026-09-07T08:00:00Z"),
      planningNumber: 1,
    });
    expect(r).toEqual({ allowed: true, phase: "phase_1_36", slot: "monday" });
  });

  it("phase 1 wednesday and friday → allowed", () => {
    expect(
      evaluateCadence({
        automationStartDate: START,
        now: new Date("2026-09-09T08:00:00Z"), // Wed
        planningNumber: 2,
      }),
    ).toMatchObject({ allowed: true, phase: "phase_1_36", slot: "wednesday" });
    expect(
      evaluateCadence({
        automationStartDate: START,
        now: new Date("2026-09-11T08:00:00Z"), // Fri
        planningNumber: 3,
      }),
    ).toMatchObject({ allowed: true, phase: "phase_1_36", slot: "friday" });
  });

  it("phase 1 tuesday/thursday → wrong_day", () => {
    for (const d of ["2026-09-08T08:00:00Z", "2026-09-10T08:00:00Z"]) {
      const r = evaluateCadence({
        automationStartDate: START,
        now: new Date(d),
        planningNumber: 2,
      });
      expect(r.allowed).toBe(false);
      if (!r.allowed && r.reason === "wrong_day") expect(r.phase).toBe("phase_1_36");
    }
  });

  it("phase 2 (week 12) monday → allowed; wednesday → allowed", () => {
    // 12 weeks after Mon 2026-09-07 = Mon 2026-11-30.
    expect(
      evaluateCadence({
        automationStartDate: START,
        now: new Date("2026-11-30T09:00:00Z"),
        planningNumber: 40,
      }),
    ).toMatchObject({ allowed: true, phase: "phase_37_60", slot: "monday" });
    expect(
      evaluateCadence({
        automationStartDate: START,
        now: new Date("2026-12-02T09:00:00Z"),
        planningNumber: 41,
      }),
    ).toMatchObject({ allowed: true, phase: "phase_37_60", slot: "wednesday" });
  });

  it("phase 2 friday → wrong_day (rhythm dropped Friday)", () => {
    // Friday of week 12 = 2026-12-04.
    const r = evaluateCadence({
      automationStartDate: START,
      now: new Date("2026-12-04T09:00:00Z"),
      planningNumber: 42,
    });
    expect(r.allowed).toBe(false);
  });

  it("phase 3 (week 24+) monday → allowed", () => {
    // 24 weeks * 7 = 168 days after 2026-09-07 = Mon 2027-02-22.
    const r = evaluateCadence({
      automationStartDate: START,
      now: new Date("2027-02-22T09:00:00Z"),
      planningNumber: 70,
    });
    expect(r).toMatchObject({ allowed: true, phase: "phase_61_180", slot: "monday" });
  });

  it("phase 3 wednesday/friday → wrong_day (rhythm reduced to monday)", () => {
    // Wed of week 24 = 2027-02-24; Fri = 2027-02-26.
    for (const d of ["2027-02-24T09:00:00Z", "2027-02-26T09:00:00Z"]) {
      const r = evaluateCadence({
        automationStartDate: START,
        now: new Date(d),
        planningNumber: 71,
      });
      expect(r.allowed).toBe(false);
    }
  });

  it("weekend is never allowed", () => {
    const r = evaluateCadence({
      automationStartDate: START,
      now: new Date("2026-09-12T09:00:00Z"), // Saturday
      planningNumber: 3,
    });
    expect(r.allowed).toBe(false);
  });
});
