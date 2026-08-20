import { test, expect } from "vitest";

function showMinefield(minefield) {
  function hasMine(row, col) {
    return minefield[row][col] === "*";
  }

  let hints = [];
  for (let row = 0; row < minefield.length; row++) {
    let hintRow = "";
    for (let col = 0; col < minefield[row].length; col++) {
      hintRow += hasMine(row, col) ? "*" : "0";
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
