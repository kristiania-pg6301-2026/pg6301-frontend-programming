import { expect, test } from "vitest";
import { applicationTexts, english, norwegian } from "./applicationTexts.js";

test("general error message", () => {
  expect(applicationTexts(norwegian, { code: "generalError" })).toBe(
    "Noe gikk feil",
  );
  expect(applicationTexts(english, { code: "generalError" })).toBe(
    "An error has occurred",
  );
});

test("network error", () => {
  expect(applicationTexts(norwegian, { code: "networkError" })).toBe(
    "Mistet kontakt med serveren",
  );
  expect(applicationTexts(english, { code: "networkError" })).toBe(
    "Failed to connect to server",
  );
});

test("user error", () => {
  expect(applicationTexts(norwegian, { code: "userError" })).toBe(
    "Feil i input",
  );
  expect(applicationTexts(english, { code: "userError" })).toBe(
    "Malformed input",
  );
});

test("invalid weekday", () => {
  const error = { code: "invalidWeekday", day: "festdag" } as const;
  expect(applicationTexts(norwegian, error)).toBe(
    'Verdien "festdag" er ikke en gyldig ukedag',
  );
  expect(applicationTexts(english, error)).toBe(
    '"festdag" is not a valid weekday',
  );
});

test("invalid email domain", () => {
  const error = {
    code: "invalidEmailDomain",
    emailAddress: "johannes@brodwall.com",
    validDomains: ["kristiania.no", "student.kristiania.no"],
  } as const;
  expect(applicationTexts(norwegian, error)).toBe(
    'Adressen "johannes@brodwall.com" må være i et av domenene kristiania.no, student.kristiania.no',
  );
  expect(applicationTexts(english, error)).toBe(
    'The email "johannes@brodwall.com" should be in one of these domains: kristiania.no, student.kristiania.no',
  );
});
