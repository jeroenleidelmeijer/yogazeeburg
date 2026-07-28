// Behavior tests for the pure-TS scheduler cadence mirror.
// These lock the phase model + weekday matrix in Europe/Amsterdam.
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

describe("allowedSlotsForPhase", () => {
  it("phase_1_36 → ma/wo/vr", () => {
    expect(allowedSlotsForPhase("phase_1_36")).toEqual(["monday", "wednesday", "friday"]);
  });
  it("phase_37_60 → di/do", () => {
    expect(allowedSlotsForPhase("phase_37_60")).toEqual(["tuesday", "thursday"]);
  });
  it("phase_61_180 → alleen wo", () => {
    expect(allowedSlotsForPhase("phase_61_180")).toEqual(["wednesday"]);
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
    // 2026-10-25 is when CEST → CET in Amsterdam. Elapsed calendar days
    // from Mon 2026-09-07 to Mon 2026-10-26 = 49 days → 7 weeks.
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

  it("planningNumber > 180 → beyond_planning_end", () => {
    expect(
      evaluateCadence({
        automationStartDate: START,
        now: new Date("2027-03-01T10:00:00Z"),
        planningNumber: MAX_PLANNING_NUMBER + 1,
      }),
    ).toEqual({ allowed: false, reason: "beyond_planning_end" });
  });

  it("phase 1 monday → allowed", () => {
    const r = evaluateCadence({
      automationStartDate: START,
      now: new Date("2026-09-07T08:00:00Z"), // Mon in Amsterdam
      planningNumber: 1,
    });
    expect(r).toEqual({ allowed: true, phase: "phase_1_36", slot: "monday" });
  });

  it("phase 1 tuesday → wrong_day", () => {
    const r = evaluateCadence({
      automationStartDate: START,
      now: new Date("2026-09-08T08:00:00Z"), // Tue
      planningNumber: 2,
    });
    expect(r.allowed).toBe(false);
    if (!r.allowed) {
      expect(r.reason).toBe("wrong_day");
      if (r.reason === "wrong_day") expect(r.phase).toBe("phase_1_36");
    }
  });

  it("phase 2 (week 12) tuesday → allowed", () => {
    // 12 * 7 = 84 days after Mon 2026-09-07 = Mon 2026-11-30. Tue = 12-01.
    const r = evaluateCadence({
      automationStartDate: START,
      now: new Date("2026-12-01T09:00:00Z"),
      planningNumber: 40,
    });
    expect(r).toMatchObject({ allowed: true, phase: "phase_37_60", slot: "tuesday" });
  });

  it("phase 2 monday → wrong_day (schedule shifted to di/do)", () => {
    const r = evaluateCadence({
      automationStartDate: START,
      now: new Date("2026-11-30T09:00:00Z"), // Mon in week 12
      planningNumber: 38,
    });
    expect(r.allowed).toBe(false);
  });

  it("phase 3 (week 24+) wednesday → allowed", () => {
    // 24 weeks * 7 = 168 days after 2026-09-07 = Mon 2027-02-22. Wed = 02-24.
    const r = evaluateCadence({
      automationStartDate: START,
      now: new Date("2027-02-24T09:00:00Z"),
      planningNumber: 70,
    });
    expect(r).toMatchObject({ allowed: true, phase: "phase_61_180", slot: "wednesday" });
  });

  it("phase 3 friday → wrong_day", () => {
    const r = evaluateCadence({
      automationStartDate: START,
      now: new Date("2027-02-26T09:00:00Z"), // Friday in week 24
      planningNumber: 71,
    });
    expect(r.allowed).toBe(false);
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
