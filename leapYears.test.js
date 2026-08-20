import { test, expect } from "vitest";

function isLeapYear(year) {
  if (year % 100 === 0) return false;
  return year % 4 === 0;
}

test("that normal years are not leap years", () =>
  expect(isLeapYear(2026)).toBe(false));

test("that years divisible by four are leap years", () =>
  expect(isLeapYear(2028)).toBe(true));

test("that years divisible by 100 are not leap years", () =>
  expect(isLeapYear(2100)).toBe(false));
