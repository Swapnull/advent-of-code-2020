import fs from "fs";
import { chunk } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const rows = input.split("\n");
const columns = rows.map((row) => row.split(""));

const checkEightDirections = (x: number, y: number, removed: Array<[number, number]>) => {
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

  for (const coord of coords) {
    const [newX, newY] = coord;
    if (newX < 0 || newX >= columns.length || newY < 0 || newY >= columns[0].length) {
      continue;
    }
    const hasBeenRemoved = removed.some(
      ([removedX, removedY]) => removedX === newX && removedY === newY
    );
    if (hasBeenRemoved) {
      continue;
    }
    if (columns[newX][newY] === "@") {
      count++;
    }
  }

  // console.log("x", x, "y", y, "count", count);

  if (count >= 4) {
    return false;
  }
  return true;
};

const removeRolls = (removed: Array<[number, number]>) => {
  let res = 0;

  const newRemoved = [];

  for (let x = 0; x < columns.length; x++) {
    for (let y = 0; y < columns[0].length; y++) {
      if (removed.some(([removedX, removedY]) => removedX === x && removedY === y)) {
        continue;
      }
      if (columns[x][y] === "@") {
        if (checkEightDirections(x, y, removed)) {
          // console.log(x, y);
          newRemoved.push([x, y]);
          res++;
        }
      }
    }
  }

  return [res, [...removed, ...newRemoved]];
};

let lastRes = 1;
let lastRemoved = [] as [number, number][];
let total = 0;
while (lastRes > 0) {
  const [res, removed] = removeRolls(lastRemoved);
  lastRes = res as number;
  lastRemoved = removed as [number, number][];
  total += res as number;
}

console.log("total", total);
