import fs from "fs";

const input = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((row) => row.split(" "));

const posList = [
  [[0, 0]],
  [[0, 0]],
  [[0, 0]],
  [[0, 0]],
  [[0, 0]],
  [[0, 0]],
  [[0, 0]],
  [[0, 0]],
  [[0, 0]],
  [[0, 0]],
];

function moveHead(direction: string) {
  let headX = 0;
  let headY = 0;
  if (direction === "U") headY++;
  if (direction === "R") headX++;
  if (direction === "D") headY--;
  if (direction === "L") headX--;

  posList[0].push([headX, headY]);
}

function moveTail(knot: Array<Array<number>>, prevKnot: Array<Array<number>>) {
  let [headX, headY] = prevKnot[prevKnot.length - 1];
  let [tailX, tailY] = knot[knot.length - 1];

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

  knot.push([tailX, tailY]);
}

input.map(([direction, steps], index) => {
  for (let i = 0; i < Number(steps); i++) {
    moveHead(direction);
    posList.slice(1).map((knot, index) => {
      moveTail(knot, posList[index]);
    });
  }
});

const uniqueTailPos = posList[posList.length - 1].reduce((agg, pos) => {
  const [x, y] = pos;
  const alreadyExists = agg.find((a) => a.x === x && a.y === y);
  if (!alreadyExists) agg.push({ x, y });
  return agg;
}, [] as Array<{ x: number; y: number }>);

console.log(uniqueTailPos.length);
