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

test("invalid email domain in english", () => {
  expect(
    showText(
      {
        code: "invalidEmailDomain",
        emailAddress: "hei@verden.no",
        validDomains: ["student.kristiania.no", "kristiania.no"],
      },
      english,
    ),
  ).toBe(
    'the email address "hei@verden.no" should be in the domains: student.kristiania.no, kristiania.no',
  );
});
