import { test, expect } from "vitest";

const norwegian = {};
const english = {};

function showText(errorCode, language) {
  if (language === norwegian) {
    if (errorCode === "networkError") return "Mistet kontakt med serveren";
    if (errorCode === "generalError") return "En feil har inntruffet";
    if (errorCode === "userError") return "Feil i brukerinput";
  }
  if (errorCode === "networkError") return "Cannot communicate with the server";
  if (errorCode === "generalError") return "Something went wrong";
  if (errorCode === "userError") return "Invalid input";
}

test("general error in both languages", () => {
  expect(showText("generalError", norwegian)).toBe("En feil har inntruffet");
  expect(showText("generalError", english)).toBe("Something went wrong");
});

test("network error in both languages", () => {
  expect(showText("networkError", norwegian)).toBe(
    "Mistet kontakt med serveren",
  );
  expect(showText("networkError", english)).toBe(
    "Cannot communicate with the server",
  );
});

test("user error in both languages", () => {
  expect(showText("userError", norwegian)).toBe("Feil i brukerinput");
  expect(showText("userError", english)).toBe("Invalid input");
});
