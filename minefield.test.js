import { test, expect } from "vitest";

function showMinefield(minefield) {
  let hints = [];
  for (const row of minefield) {
    let hintRow = "";
    for (let i = 0; i < row.length; i++) {
      hintRow += "0";
    }
    hints.push(hintRow);
  }
  return hints;
}

test("empty minefield", () => {
  expect(showMinefield(["."])).toEqual(["0"]);
});
test("multiple rows", () => {
  expect(showMinefield([".", ".", "."])).toEqual(["0", "0", "0"]);
});
test("multiple columns", () => {
  expect(showMinefield(["...."])).toEqual(["0000"]);
});
test("minefield with mines", () => {
  expect(showMinefield(["**", "**"])).toEqual(["**", "**"]);
});
