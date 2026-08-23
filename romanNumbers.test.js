import { test, expect } from "vitest";

function toRoman(number) {
  if (number === 2) return "II";
  return "I";
}

function testRoman(n, expected) {
  test(`that ${n} in roman numbers is ${expected}`, () =>
    expect(toRoman(n)).toBe(expected));
}

testRoman(1, "I");
testRoman(2, "II");
testRoman(3, "III");
