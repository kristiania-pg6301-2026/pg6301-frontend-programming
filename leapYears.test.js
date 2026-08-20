import {test, expect} from "vitest";

function isLeapYear(number) {
    return false;
}

test("that normal years are not leap years", () => expect(isLeapYear(2026)).toBe(false));