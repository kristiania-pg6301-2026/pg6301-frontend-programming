import { test, expect } from "vitest";

const norwegian = {};
const english = {};

function showText(errorCode, language) {
  if (language === norwegian) return "En feil har inntruffet";
  return "Something went wrong";
}

test("general error in both languages", () => {
  expect(showText("generalError", norwegian)).toBe("En feil har inntruffet");
  expect(showText("generalError", english)).toBe("Something went wrong");
});
