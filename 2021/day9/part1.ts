import fs from "fs";
import path from "path";

const file = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const input = file
  .split("\n")
  .filter(Boolean)
  .map((row) => row.split("").map(Number));

const lowPoints: Array<number> = [];

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    const curr = input[i][j];
    let top = true;
    let left = true;
    let right = true;
    let bottom = true;

    if (i > 0) {
      top = curr < input[i - 1][j];
    }
    if (i < input.length - 1) {
      bottom = curr < input[i + 1][j];
    }
    if (j > 0) {
      left = curr < input[i][j - 1];
    }
    if (j < input[i].length - 1) {
      right = curr < input[i][j + 1];
    }

    if (top && left && right && bottom) {
      lowPoints.push(input[i][j]);
    }
  }
}

const res = lowPoints.reduce((agg, point) => agg + 1 + point, 0);

console.log(res);
