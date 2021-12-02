import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");
const directions = input
  .split("\n")
  .filter(Boolean)
  .map((d) => d.split(" "));

let x = 0;
let y = 0;

directions.forEach(([direction, amount]) => {
  if (direction === "forward") x = x + Number(amount);
  if (direction === "down") y = y + Number(amount);
  if (direction === "up") y = y - Number(amount);
});

console.log(x * y);
