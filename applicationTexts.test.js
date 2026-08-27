import { test, expect } from "vitest";

const norwegian = {};
const english = {};

function showText(errorCode, language) {
  if (language === norwegian) {
      if (errorCode === "networkError") return "Mistet kontakt med serveren"
      return "En feil har inntruffet";
  }
    if (errorCode === "networkError") return "Cannot communicate with the server"
  return "Something went wrong";
}

test("general error in both languages", () => {
  expect(showText("generalError", norwegian)).toBe("En feil har inntruffet");
  expect(showText("generalError", english)).toBe("Something went wrong");
});

test("network error in both languages", () => {
  expect(showText("networkError", norwegian)).toBe("Mistet kontakt med serveren");
  expect(showText("networkError", english)).toBe("Cannot communicate with the server");
});

