import { test, expect } from "vitest";

function showMinefield(minefield: string[]) {
  function hasMine(row: number, col: number): boolean {
    if (!minefield[row]) return false;
    return minefield[row][col] === "*";
  }
  function cellValue(row: number, col: number): number | "*" {
    if (hasMine(row, col)) return "*";
    let neighbours = 0;
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (hasMine(r, c)) neighbours += 1;
      }
    }
    return neighbours;
  }

  let hints = [];
  for (let row = 0; row < minefield.length; row++) {
    let hintRow = "";
    for (let col = 0; col < (minefield[row]?.length || 0); col++) {
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
test("count mines cell", () => {
  expect(showMinefield(["***", "*.*", "***"])).toEqual(["***", "*8*", "***"]);
});
