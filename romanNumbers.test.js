import { test, expect } from "vitest";

function toRoman(n) {
  if (n === 4) return "IV";
  let result = "";
  if (n >= 5) {
    result += "V";
    n -= 5;
  }
  for (let i = 0; i < n; i++) {
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
testRoman(5, "V");
testRoman(6, "VI");
testRoman(7, "VII");
