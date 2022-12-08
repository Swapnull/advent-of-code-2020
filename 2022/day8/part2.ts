import fs from "fs";
import { max } from "lodash";

const input = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((row) => row.split("").map(Number));

const res = [];

input.map((row, rowIndex) => {
  res.push([]);
  row.map((col, colIndex) => {
    res[rowIndex][colIndex] = 0;

    if (
      rowIndex === 0 ||
      colIndex === 0 ||
      rowIndex === input.length - 1 ||
      colIndex === row.length - 1
    ) {
      res[rowIndex][colIndex] = 0;
    } else {
      let top = 0;
      for (let r = rowIndex - 1; r >= 0; r--) {
        if (input[r][colIndex] < col) {
          top++;
        } else {
          top++;
          break;
        }
      }

      let right = 0;
      for (let c = colIndex + 1; c < row.length; c++) {
        if (input[rowIndex][c] < col) {
          right++;
          if (input[rowIndex][c] === col) break;
        } else {
          right++;
          break;
        }
      }

      let bottom = 0;
      for (let r = rowIndex + 1; r < input.length; r++) {
        if (input[r][colIndex] < col) {
          bottom++;
        } else {
          bottom++;
          break;
        }
      }

      let left = 0;
      for (let c = colIndex - 1; c >= 0; c--) {
        if (input[rowIndex][c] < col) {
          left++;
        } else {
          left++;
          break;
        }
      }

      res[rowIndex][colIndex] = top * right * bottom * left;
    }
  });
});

// console.log(res);

console.log(max(res.flat()));
