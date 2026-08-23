import { test, expect } from "vitest";

const norwegian = {};
function applicationMessage(language: any, error: string) {
  return "Noe gikk feil";
}

test("general error message", () => {
  expect(applicationMessage(norwegian, "generalError")).toBe("Noe gikk feil");
});
