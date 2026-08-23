import { test, expect } from "vitest";

const norwegian = {};
const english = {};
function applicationMessage(language: any, error: string) {
  if (language === english) return "An error has occurred";
  return "Noe gikk feil";
}

test("general error message", () => {
  expect(applicationMessage(norwegian, "generalError")).toBe("Noe gikk feil");
  expect(applicationMessage(english, "generalError")).toBe(
    "An error has occurred",
  );
});
