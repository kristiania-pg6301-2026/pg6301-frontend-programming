import { test, expect } from "vitest";

test("empty minefield", () => {
  expect(showMinefield(["."]).toBe(["0"]));
});
