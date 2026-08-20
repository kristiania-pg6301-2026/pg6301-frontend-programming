import { test, expect } from "vitest";

function showMinefield(minefield) {
  function hasMine(row, col) {
    if (!minefield[row]) return false;
    return minefield[row][col] === "*";
  }
  function cellValue(row, col) {
    if (hasMine(row, col)) return "*";
    if (hasMine(row, col - 1)) return 1;
    if (hasMine(row - 1, col)) return 1;
    if (hasMine(row + 1, col)) return 1;
    if (hasMine(row, col + 1)) return 1;
    return 0;
  }

  let hints = [];
  for (let row = 0; row < minefield.length; row++) {
    let hintRow = "";
    for (let col = 0; col < minefield[row].length; col++) {
      hintRow += cellValue(row, col);
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
test("hints on same row", () => {
  expect(showMinefield([".*."])).toEqual(["1*1"]);
});
test("hints on same column", () => {
  expect(showMinefield([".", "*", "."])).toEqual(["1", "*", "1"]);
});
test("hints around mine", () => {
  expect(showMinefield(["...", ".*.", "..."])).toEqual(["111", "1*1", "111"]);
});
