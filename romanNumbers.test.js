import { test, expect } from "vitest";

function toRoman(number) {
  return "I";
}

test("that 1 in roman numbers is I", () => expect(toRoman(1)).toBe("I"));
