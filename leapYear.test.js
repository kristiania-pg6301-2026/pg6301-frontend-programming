import {test, expect} from "vitest";

function isLeapYear(year) {
    if (year % 400 === 0){return true}
    if (year % 100 === 0){return false}
    return year % 4 === 0;
}

test("that most years are not leap years", () => {
  expect(isLeapYear(2026)).toBe(false);
})
test("years divisible by four are leap years", () => {
    expect(isLeapYear(2028)).toBe(true);
})
test("years divisible by one hundred are not leap years", () => {
    expect(isLeapYear(2100)).toBe(false);
})
test("years divisible by four hundred are leap years", () => {
    expect(isLeapYear(2400)).toBe(true);
})