import fs from "fs";
import { sum } from "lodash";

const input = fs.readFileSync("input.txt", "utf-8").split("\n");

let x = 1;
let cycles = [1];
input.map((cmd) => {
  if (cmd === "noop") {
    cycles.push(x);
  } else if (cmd.includes("addx")) {
    cycles.push(x);

    x += parseInt(cmd.split(" ")[1]);
    cycles.push(x);
  }
});

const screenWidth = 40;
const screenHeight = 6;

const screen = [[], [], [], [], [], []];

for (let row = 0; row < screenHeight; row++) {
  for (let col = 0; col < screenWidth; col++) {
    const pos = row * screenWidth + col;
    const currX = cycles[pos];
    if (currX >= col - 1 && currX <= col + 1) {
      screen[row][col] = "#";
    } else {
      screen[row][col] = ".";
    }
  }
}

console.log(screen);
