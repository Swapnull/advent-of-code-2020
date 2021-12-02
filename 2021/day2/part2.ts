import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");
const directions = input
  .split("\n")
  .filter(Boolean)
  .map((d) => d.split(" "));

let x = 0;
let depth = 0;
let aim = 0;

directions.forEach(([direction, amount]) => {
  if (direction === "forward") {
    x = x + Number(amount);
    depth = depth + Number(amount) * aim;
  }
  if (direction === "down") aim = aim + Number(amount);
  if (direction === "up") aim = aim - Number(amount);
});

console.log(x);
console.log(depth);
console.log(x * depth);
