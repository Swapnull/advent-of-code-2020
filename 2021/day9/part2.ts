import fs from "fs";
import path from "path";

const file = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const input = file
  .split("\n")
  .filter(Boolean)
  .map((row) => row.split("").map(Number));

interface Point {
  num: number;
  i: number;
  j: number;
}

const lowPoints: Array<Point> = [];

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
      lowPoints.push({ i, j, num: input[i][j] });
    }
  }
}

const processLowPoint = (lowPoint: Point) => {
  const output = [];

  const checkBasin = (i: number, j: number) => {
    const curr = input[i][j];
    output.push({ num: curr, i, j });

    if (i > 0) {
      const next = input[i - 1][j];
      if (curr < next && next < 9) checkBasin(i - 1, j);
    }
    if (i < input.length - 1) {
      const next = input[i + 1][j];
      if (curr < next && next < 9) checkBasin(i + 1, j);
    }
    if (j > 0) {
      const next = input[i][j - 1];
      if (curr < next && next < 9) checkBasin(i, j - 1);
    }
    if (j < input[i].length - 1) {
      const next = input[i][j + 1];
      if (curr < next && next < 9) checkBasin(i, j + 1);
    }
  };

  checkBasin(lowPoint.i, lowPoint.j);

  return output.reduce((agg, out) => {
    const found = agg.find(({ i, j }) => i === out.i && j === out.j);
    return found ? agg : [...agg, out];
  }, [] as Array<number>);
};

const final = lowPoints
  .map((lowPoint) => processLowPoint(lowPoint).length)
  .sort((a, b) => b - a)
  .splice(0, 3)
  .reduce((agg, count) => agg * count, 1);

console.log(final);
