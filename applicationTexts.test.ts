import { test, expect } from "vitest";

import { showText, norwegian, english } from "./applicationTexts.js";

test("general error in both languages", () => {
  expect(showText({ code: "generalError" }, norwegian)).toBe(
    "En feil har inntruffet",
  );
  expect(showText({ code: "generalError" }, english)).toBe(
    "Something went wrong",
  );
});

test("network error in both languages", () => {
  expect(showText({ code: "networkError" }, norwegian)).toBe(
    "Mistet kontakt med serveren",
  );
  expect(showText({ code: "networkError" }, english)).toBe(
    "Cannot communicate with the server",
  );
});

test("user error in both languages", () => {
  expect(showText({ code: "userError" }, norwegian)).toBe("Feil i brukerinput");
  expect(showText({ code: "userError" }, english)).toBe("Invalid input");
});

test("invalid email in norwegian", () => {
  expect(
    showText(
      { code: "invalidEmail", emailAddress: "hei-at-verden.no" },
      norwegian,
    ),
  ).toBe('adressen "hei-at-verden.no" er ugyldig');
});
