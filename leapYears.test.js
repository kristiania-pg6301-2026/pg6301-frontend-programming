import {test, expect} from "vitest";

function isLeapYear(number) {
    return false;
}

test("that normal years are not leap years", () => expect(isLeapYear(2026)).toBe(false));

test("that years divisible by four are leap years", () => expect(isLeapYear(2028)).toBe(true));
