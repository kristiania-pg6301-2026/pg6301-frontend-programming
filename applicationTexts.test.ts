import { expect, test } from "vitest";
import { applicationTexts, english, norwegian } from "./applicationTexts.js";

test("general error message", () => {
  expect(applicationTexts(norwegian, "generalError")).toBe("Noe gikk feil");
  expect(applicationTexts(english, "generalError")).toBe(
    "An error has occurred",
  );
});

test("network error", () => {
  expect(applicationTexts(norwegian, "networkError")).toBe(
    "Mistet kontakt med serveren",
  );
  expect(applicationTexts(english, "networkError")).toBe(
    "Failed to connect to server",
  );
});

test("user error", () => {
  expect(applicationTexts(norwegian, "userError")).toBe("Feil i input");
  expect(applicationTexts(english, "userError")).toBe("Malformed input");
});

test("invalid weekday", () => {
  expect(
    applicationTexts(norwegian, { code: "invalidWeekday", day: "festdag" }),
  ).toBe('Verdien "festdag" er ikke en gyldig ukedag');
  expect(
    applicationTexts(english, { code: "invalidWeekday", day: "doomsday" }),
  ).toBe('"doomsday" is not a valid weekday');
});
