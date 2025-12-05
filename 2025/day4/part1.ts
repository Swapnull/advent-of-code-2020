import fs from "fs";
import { chunk } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const rows = input.split("\n");
const columns = rows.map((row) => row.split(""));

const checkEightDirections = (x: number, y: number) => {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const coords = directions.map((direction) => {
    const newX = x + direction[0];
    const newY = y + direction[1];
    return [newX, newY];
  });

  let count = 0;

  // console.log("coords", coords);

  for (const coord of coords) {
    const [newX, newY] = coord;
    if (newX < 0 || newX >= columns.length || newY < 0 || newY >= columns[0].length) {
      continue;
    }
    if (columns[newX][newY] === "@") {
      count++;
    }
  }

  console.log("x", x, "y", y, "count", count);

  if (count >= 4) {
    return false;
  }
  return true;
};

let res = 0;

for (let x = 0; x < columns.length; x++) {
  for (let y = 0; y < columns[0].length; y++) {
    if (columns[x][y] === "@") {
      if (checkEightDirections(x, y)) {
        console.log(x, y);
        res++;
      }
    }
  }
}

console.log("res", res);
