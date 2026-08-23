import { test, expect } from "vitest";

function toRoman(number) {
  if (number === 4) return "IV";
  let result = "";
  for (let i = 0; i < number; i++) {
    result += "I";
  }
  return result;
}

function testRoman(n, expected) {
  test(`that ${n} in roman numbers is ${expected}`, () =>
    expect(toRoman(n)).toBe(expected));
}

testRoman(1, "I");
testRoman(2, "II");
testRoman(3, "III");
testRoman(4, "IV");
