import fs from "fs";

const input = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((row) => row.split(" "));

let headX = 0;
let headY = 0;
let tailX = 0;
let tailY = 0;

const headPosList = [[0, 0]];
const tailPosList = [[0, 0]];

function moveHead(direction: string) {
  if (direction === "U") headY++;
  if (direction === "R") headX++;
  if (direction === "D") headY--;
  if (direction === "L") headX--;

  headPosList.push([headX, headY]);
}

function moveTail() {
  const hor = headX - tailX;
  const ver = headY - tailY;

  const up = ver > 1;
  const right = hor > 1;
  const down = ver < -1;
  const left = hor < -1;

  const upRight = (hor === 1 && ver > 1) || (ver === 1 && hor > 1);
  const upLeft = (hor === -1 && ver > 1) || (ver === 1 && hor < -1);
  const downRight = (hor === 1 && ver < -1) || (ver === -1 && hor > 1);
  const downLeft = (hor === -1 && ver < -1) || (ver === -1 && hor < -1);

  if (up || upRight || upLeft) tailY++;
  if (down || downRight || downLeft) tailY--;
  if (right || upRight || downRight) tailX++;
  if (left || upLeft || downLeft) tailX--;

  tailPosList.push([tailX, tailY]);
}

input.map(([direction, steps], index) => {
  for (let i = 0; i < Number(steps); i++) {
    moveHead(direction);
    moveTail();
  }
});

const uniqueTailPos = tailPosList.reduce((agg, pos) => {
  const [x, y] = pos;
  const alreadyExists = agg.find((a) => a.x === x && a.y === y);
  if (!alreadyExists) agg.push({ x, y });
  return agg;
}, [] as Array<{ x: number; y: number }>);

console.log(uniqueTailPos.length);
