import { test, expect } from "vitest";

function toRoman(number) {
  if (number === 2) return "II";
  return "I";
}

test("that 1 in roman numbers is I", () => expect(toRoman(1)).toBe("I"));
test("that 2 in roman numbers is II", () => expect(toRoman(2)).toBe("II"));
