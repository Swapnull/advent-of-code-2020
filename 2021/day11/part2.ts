import fs from "fs";
import path from "path";

const file = fs.readFileSync(path.join(__dirname, "testinput.txt"), "utf-8");
const input = file
  .split("\n")
  .filter(Boolean)
  .map((row) => row.split("").map(Number));

let grid = [...input];

console.log(grid);

const bumpBy1 = () => {
  grid = grid.map((row) => row.map((cell) => cell + 1));
};

const getReadyToFlash = () => {
  const ready = [];
  grid.forEach((row, rI) => {
    row.forEach((cell, cI) => {
      if (cell > 9) ready.push([rI, cI]);
    });
  });
  return ready;
};

const caughtInFlash = (x: number, y: number) => {
  if (grid[x][y] > 0) {
    grid[x][y] += 1;
  }
};

let flashCount = 0;

const flash = (x: number, y: number) => {
  flashCount += 1;
  grid[x][y] = 0;
  const maxX = grid.length - 1;
  const maxY = grid[0].length - 1;

  if (x > 0) caughtInFlash(x - 1, y); // top
  if (x > 0 && y < maxY) caughtInFlash(x - 1, y + 1); // top right
  if (y < maxY) caughtInFlash(x, y + 1); // right
  if (x < maxX && y < maxY) caughtInFlash(x + 1, y + 1); // bottom right
  if (x < maxX) caughtInFlash(x + 1, y); // bottom
  if (x < maxX && y > 0) caughtInFlash(x + 1, y - 1); //bottom left
  if (y > 0) caughtInFlash(x, y - 1); // left
  if (x > 0 && y > 0) caughtInFlash(x - 1, y - 1); // top left
};

const runFlash = () => {
  const ready = getReadyToFlash();
  if (ready.length) {
    ready.map(([x, y]) => flash(x, y));
    runFlash();
  }
};

const runStep = () => {
  bumpBy1();
  runFlash();
};

let inSync = false;
let i = 0;

while (!inSync) {
  const startFlashes = flashCount;
  runStep();
  const endFlashes = flashCount;

  if (endFlashes - startFlashes === grid[0].length * grid.length) {
    console.log("Sync after step: ", i + 1);
    inSync = true;
  } else {
    i++;
  }
}
