import { test, expect } from "vitest";

import { showText, norwegian, english } from "./applicationTexts.js";

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

test("invalid email in norwegian", () => {
  expect(showText("invalidEmail", norwegian)).toBe(
    'adressen "hei-at-verden.no" er ugyldig',
  );
});
