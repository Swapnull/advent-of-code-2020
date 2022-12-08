import fs from "fs";

const input = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((row) => row.split("").map(Number));

const res = [];

input.map((row, rowIndex) => {
  res.push([]);
  row.map((col, colIndex) => {
    res[rowIndex][colIndex] = false;
    if (
      rowIndex === 0 ||
      colIndex === 0 ||
      rowIndex === input.length - 1 ||
      colIndex === row.length - 1
    ) {
      res[rowIndex][colIndex] = true;
    } else {
      let left = 0;
      for (let c = 0; c < colIndex; c++) {
        if (input[rowIndex][c] < col) {
          left++;
        }
      }

      let right = 0;
      for (let c = colIndex; c < row.length; c++) {
        if (input[rowIndex][c] < col) {
          right++;
        }
      }

      let top = 0;
      for (let r = 0; r < rowIndex; r++) {
        if (input[r][colIndex] < col) {
          top++;
        }
      }

      let bottom = 0;
      for (let r = rowIndex; r < input.length; r++) {
        if (input[r][colIndex] < col) {
          bottom++;
        }
      }

      const visibleFromLeft = left >= colIndex;
      const visibleFromTop = top >= rowIndex;
      const visibleFromRight = right >= row.length - 1 - colIndex;
      const visibleFromBottom = bottom >= input.length - 1 - rowIndex;

      res[rowIndex][colIndex] =
        visibleFromLeft || visibleFromTop || visibleFromRight || visibleFromBottom;
    }
  });
});

// console.log(res);

console.log(res.flat().filter((item) => item).length);
