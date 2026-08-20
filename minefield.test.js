import { test, expect } from "vitest";

function showMinefield(minefield) {
  let hints = [];
  for (let row = 0; row < minefield.length; row++) {
    let hintRow = "";
    for (let col = 0; col < minefield[row].length; col++) {
      if (minefield[row][col] === "*") {
        hintRow += "*";
      } else {
        hintRow += "0";
      }
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
