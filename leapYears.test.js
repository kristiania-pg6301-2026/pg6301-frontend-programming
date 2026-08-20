import {test, expect} from "vitest";

test("that normal years are not leap years", () => expect(isLeapYear(2026)).toBe(false));