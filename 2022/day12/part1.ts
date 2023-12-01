import fs from "fs";
import { chunk, sum } from "lodash";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const grid = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((row) => row.split(""));

let start = [0, 0];
let end = [0, 0];

grid.forEach((row, rIndex) => {
  const startFound = row.findIndex((cell) => cell === "S");
  if (startFound > -1) start = [rIndex, startFound];

  const endFound = row.findIndex((cell) => cell === "E");
  if (endFound > -1) end = [rIndex, endFound];
});

const visited = [];

const getNextStep = (curr) => {
  // console.log("--- curr ---", curr);

  const [x, y] = curr;

  if (grid[x][y] === "E") {
    console.log("PATH COMPLETE!");
  }
  let top = x > 0 ? grid[x - 1][y] : null;
  let right = y < grid[x].length - 1 ? grid[x][y + 1] : null;
  let bottom = x < grid.length - 1 ? grid[x + 1][y] : null;
  let left = y > 0 ? grid[x][y - 1] : null;

  const currVal = grid[x][y];
  let nextLetter = "";

  if (currVal === "S") nextLetter = "a";
  else if (currVal === "z") nextLetter = "E";
  else nextLetter = alphabet[alphabet.findIndex((letter) => letter === currVal) + 1];

  const topNext = top === nextLetter;
  const topSame = top === currVal;

  const rightNext = right === nextLetter;
  const rightSame = right === currVal;

  const bottomNext = bottom === nextLetter;
  const bottomSame = bottom === currVal;

  const leftNext = left === nextLetter;
  const leftSame = left === currVal;

  // console.log("t", topNext, topSame);
  // console.log("r", rightNext, rightSame);
  // console.log("b", bottomNext, bottomSame);
  // console.log("l", leftNext, leftSame);

  // console.log(visited);

  const possibleSteps = [];

  if (topNext || topSame) {
    possibleSteps.push([x - 1, y]);
  }
  if (rightNext || rightSame) {
    possibleSteps.push([x, y + 1]);
  }
  if (bottomNext || bottomSame) {
    possibleSteps.push([x + 1, y]);
  }
  if (leftNext || leftSame) {
    possibleSteps.push([x, y - 1]);
  }

  const filteredSteps = possibleSteps
    .filter(([x, y]) => !visited.find(([vx, vy]) => vx === x && vy === y))
    .sort(([x1, y1], [x2, y2]) => Math.abs(x - x1) - Math.abs(x - x2));

  // if (visited.length === 2) console.log(filteredSteps);

  // filteredSteps.sort(([x1, y1], [x2, y2]) => Math.abs(x - x1) - Math.abs(x - x2));
  if (filteredSteps.length === 0) console.log("ran out of steps", visited[visited.length - 1]);

  if (filteredSteps.length === 0) return newVisit.length;
  filteredSteps.forEach((nextStep) => {
    getNextStep(nextStep, newVisit);
    // if (res) return "COMPLETE";
  });
};

getNextStep(start, []);
