import { test, expect } from "vitest";

function toRoman(n: number) {
  let result = "";
  function convertDigit(digitValue: number, digitSymbol: string) {
    while (n >= digitValue) {
      result += digitSymbol;
      n -= digitValue;
    }
  }
  convertDigit(1000, "M");
  convertDigit(900, "CM");
  convertDigit(500, "D");
  convertDigit(400, "CD");
  convertDigit(100, "C");
  convertDigit(90, "XC");
  convertDigit(50, "L");
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

testRoman(1111, "MCXI");
testRoman(444, "CDXLIV");
testRoman(999, "CMXCIX");
testRoman(3888, "MMMDCCCLXXXVIII");
