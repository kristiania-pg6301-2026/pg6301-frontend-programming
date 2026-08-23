import { test, expect } from "vitest";

function toRoman(n: number) {
  let result = "";
  function convertDigit(digitValue: number, digitSymbol: string) {
    while (n >= digitValue) {
      result += digitSymbol;
      n -= digitValue;
    }
  }
  convertDigit(400, "CD");
  convertDigit(40, "XL");
  convertDigit(10, "X");
  convertDigit(9, "IX");
  convertDigit(5, "V");
  convertDigit(4, "IV");
  convertDigit(1, "I");
  return result;
}

function testRoman(n: number, expected: string) {
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
testRoman(9, "IX");
testRoman(10, "X");
testRoman(14, "XIV");
testRoman(38, "XXXVIII");
testRoman(444, "CDXLIV");
