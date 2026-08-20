import { test, expect } from "vitest";

function showHints(mine) {
  let mineResult = [];

  function hasMine(row, col) {
    if (row < 0) return false;
    if (row >= mine.length) return false;
    return mine[row][col] === "*";
  }

  function cellValue(row, col) {
    if (hasMine(row, col)) return "*";
    let minesNearby = 0;
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (hasMine(r, c)) minesNearby += 1;
      }
    }
    return minesNearby;
  }

  for (let row = 0; row < mine.length; row++) {
    let rowResult = "";
    for (let col = 0; col < mine[row].length; col++) {
      rowResult += cellValue(row, col);
    }
    mineResult.push(rowResult);
  }

  return mineResult;
}

test("empty minefield", () => {
  expect(showHints(["."])).toEqual(["0"]);
});
test("minefield with several rows", () => {
  expect(showHints([".", "."])).toEqual(["0", "0"]);
});
test("minefield with several columns", () => {
  expect(showHints(["...."])).toEqual(["0000"]);
});
test("full minefield", () => {
  expect(showHints(["*"])).toEqual(["*"]);
});
test("SHOW HINTS to the right", () => {
  expect(showHints(["*."])).toEqual(["*1"]);
});
test("SHOW HINTS to the left", () => {
  expect(showHints([".*"])).toEqual(["1*"]);
});
test("SHOW HINTS on the same column", () => {
  expect(showHints([".", "*", "."])).toEqual(["1", "*", "1"]);
});
test("SHOW HINTS around mine", () => {
  expect(showHints(["...", ".*.", "..."])).toEqual(["111", "1*1", "111"]);
});
test("count mines around cell", () => {
  expect(showHints(["***", "*.*", "***"])).toEqual(["***", "*8*", "***"]);
});
