import { test, expect } from "vitest";

function showMinefield(minefield) {
  return ["0"];
}

test("empty minefield", () => {
  expect(showMinefield(["."])).toEqual(["0"]);
});
