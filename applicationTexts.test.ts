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
