import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");
const rows = input
  .split("\n")
  .filter(Boolean)
  .map((row: string) => row.split(""));

const width = rows[0].length;
const height = rows.length;

const move = (posX: number, posY: number, goRight: number, goDown: number) => {
  posX = posX + goRight;
  posY = posY + goDown;

  if (posX >= width) posX -= width;

  const isTree = rows[posY][posX] === "#";

  return { posX, posY, isTree };
};

const toboggan = (goRight: number, goDown: number) => {
  let posX = 0;
  let posY = 0;
  let trees = 0;
  while (posY < height - 1) {
    const res = move(posX, posY, goRight, goDown);
    posX = res.posX;
    posY = res.posY;
    if (res.isTree) trees++;
  }
  return trees;
};

let total = 0;

total = toboggan(1, 1);
total *= toboggan(3, 1); //part 1 was just calculating this one.
total *= toboggan(5, 1);
total *= toboggan(7, 1);
total *= toboggan(1, 2);

console.log("part1 total", toboggan(3, 1));
console.log("part2 total", total);
