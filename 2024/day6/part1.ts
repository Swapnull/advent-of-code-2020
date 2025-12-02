import fs from "fs";
import { sum } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const rows = input.split("\n");
const grid = rows.map((row) => row.split(""));

const gridHeight = grid.length;
const gridWidth = grid[0].length;

let guard = { x: 0, y: 0 };

grid.forEach((row, rowIndex) =>
  row.forEach((cell, cellIndex) => {
    if (cell === "^") guard = { x: cellIndex, y: rowIndex };
  })
);

console.log(grid, gridHeight, gridWidth);

let stillInGrid = true;
let guardDirection = "N";
const hasVisited = [{ x: guard.x, y: guard.y }];
console.log(guard);

const moveGuard = () => {
  const newGuard = { ...guard };
  if (guardDirection === "N") newGuard.y -= 1;
  else if (guardDirection === "S") newGuard.y += 1;
  else if (guardDirection === "E") newGuard.x += 1;
  else if (guardDirection === "W") newGuard.x -= 1;

  if (newGuard.x < 0 || newGuard.x >= gridWidth || newGuard.y < 0 || newGuard.y >= gridHeight) {
    stillInGrid = false;
    return newGuard;
  }

  console.log("newGuard", newGuard);

  const isObstacle = grid[newGuard.y][newGuard.x] === "#";

  console.log("isObstacle", isObstacle);

  if (
    !hasVisited.find((visited) => visited.x === newGuard.x && visited.y === newGuard.y) &&
    !isObstacle
  ) {
    // console.log("pushing", newGuard);
    hasVisited.push(newGuard);
  }

  if (isObstacle) {
    let newDirection = guardDirection;
    if (guardDirection === "N") newDirection = "E";
    else if (guardDirection === "E") newDirection = "S";
    else if (guardDirection === "S") newDirection = "W";
    else if (guardDirection === "W") newDirection = "N";

    console.log("newDirection", newDirection);

    guardDirection = newDirection;

    return moveGuard();
  }

  return newGuard;
};

while (stillInGrid) {
  guard = moveGuard();
}

console.log(hasVisited);
console.log(hasVisited.length);
